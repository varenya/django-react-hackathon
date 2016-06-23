/**
 *
 * This is varenya's piece of work!
 *
 */
import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import _ from 'underscore';
import {List, ListItem} from 'material-ui/List';
import {findDOMNode} from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {deepOrange500,indigo900} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';


const styles = {
  container: {
    textAlign: 'center',
  },
};

const API_ROOT = 'http://localhost:8181';


class SearchItem extends Component {
	componentDidMount(){
		var current = findDOMNode(this);
	        hljs.highlightBlock(current);
	}

	componentDidUpdate(){
		var current = findDOMNode(this);
	        hljs.highlightBlock(current);
	}


	render(){

		var search_prop = this.props;
		let imgURL = search_prop.imgData[search_prop.language];
		var sub = search_prop.language + " : " + search_prop.status;
		var custom_style = {backgroundColor:'#90CAF9'}
		return	(		
				<Card key={search_prop.submission_id}>
					<CardHeader title={search_prop.title} subtitle={sub} avatar={imgURL} style={custom_style}/>
				        <CardText> <pre><code>{search_prop.source}</code></pre> </CardText>
				</Card>

			);
	}
}

class SearchResults extends Component {
	constructor(props){
		super(props);
		this.state = {imgMap:[]};
	}

	componentDidMount(){
		$.ajax({
		url: API_ROOT+'/langs/',
		dataType: "jsonp",
		type: 'GET',
		callback:'callback',
		success: function(data) {
			this.setState({imgMap:data});
		}.bind(this),

		error: function(xhr,err){
			console.error("Error occured file fetching!");
			console.error("Error occured ",err);
			console.error(xhr.responseText);

		}

	     });
	}

	render() {

		var search_items = this.props.search_props.map(function(result){
			return (<SearchItem {...result} imgData = {this.state.imgMap}/>);
		}.bind(this));

		var customStyle = {paddingTop : 200}
		return (
				<div styles = {customStyle}>
					{search_items}
					<Divider inset={true} />
				</div>

		       );
	}
}


class LeftSearch extends Component {

	constructor(props,context){
		    super(props, context);
		    this.handleTextChange = this.handleTextChange.bind(this);
		    this.handleEnter = this.handleEnter.bind(this);
		    this.handleNavigation = this.handleNavigation.bind(this);
		    this.getSearchResults = this.getSearchResults.bind(this);
		    this.getAllResults.bind(this);
		    this.state = {results:[],total_count:0,search_text:"",prev:"",next:""};
		    this.getAllResults();
	}

	handleEnter(e){
		if(e.keyCode == 13){
			var text = this.state.search_text.trim();
			if(!text){
				return;
			}
			this.getSearchResults(text);
		}

	}

	getSearchResults(text){
		var new_url = API_ROOT+"/list/?search="+text;
		$.ajax({
		url: new_url,
		dataType: "jsonp",
		type: 'GET',
		callback:'callback',
		success: function(data) {
			//console.log("search results",data.results);
			//console.log(_.indexBy(data.results,'language'));
			console.log(_.groupBy(data.results,function(result){
				return result['language'];
			}));
			this.setState({results:data.results,total_count:data.count,prev:data.previous,next:data.next});
		}.bind(this),

		error: function(xhr,err){
			console.error("Error occured file fetching!");
			console.error("Error occured ",err);
			console.error(xhr.responseText);

		}

	     });
	}

	getAllResults(url){
		var new_url = url || API_ROOT+"/list/";
		$.ajax({
		url: new_url,
		dataType: "jsonp",
		type: 'GET',
		callback:'callback',
		success: function(data) {
			this.setState({results:data.results,total_count:data.count,prev:data.previous,next:data.next});
		}.bind(this),

		error: function(xhr,err){
			console.error("Error occured file fetching!");
			console.error("Error occured ",err);
			console.error(xhr.responseText);

		}

	     });
	}

	handleTextChange(e){
		this.setState({search_text:e.target.value});
	}

	handleNavigation(input){
		if( input === "next" ){
			this.getAllResults(this.state.next);
		}
		else{
			this.getAllResults(this.state.prev);
		}
	}


	render() {
		const style = {
			  margin: 12,
		};

		return (
				<div className="col-lg-8">
					<TextField hintText="Enter search text.." fullWidth={true} onKeyDown={this.handleEnter} value={this.state.search_text} onChange={this.handleTextChange} />
					<SearchResults search_props={this.state.results} total_count={this.state.count}/>
					<RaisedButton label="Prev" style={style} primary={true} className="left" onMouseDown={this.handleNavigation.bind(this,"prev")}/>
					<RaisedButton label="Next" style={style} primary={true} className="right" onMouseDown={this.handleNavigation.bind(this,"next")}/>
				</div>
		);
	}
}

class Stats extends Component {

	constructor(props){
		super(props);
		this.getStats = this.getStats.bind(this);
		this.getTop5 = this.getTop5.bind(this);
		this.getTop2 = this.getTop2.bind(this);
		this.state = {stats:[]}
	}

	componentDidMount(){
		this.getStats();
	}

	getStats(){
		var new_url = API_ROOT+"/stats/"
		$.ajax({
		url: new_url,
		dataType: "jsonp",
		type: 'GET',
		callback:'callback',
		success: function(data) {
			this.setState({stats:data});
		}.bind(this),

		error: function(xhr,err){
			console.error("Error occured file fetching!");
			console.error("Error occured ",err);
			console.error(xhr.responseText);

		}

	     });
	}

	getTop5(){
		var top5_list = this.state.stats['top-5-languages-used'] || [];
	        
	        var top5_list_items = _.map(top5_list,function(each_top){
			let text = `${each_top.language} : ${each_top.num_submissions}`;
			return (<ListItem primaryText={text} />);
		});

		return top5_list_items;
	}

	getTop2(){
		var top2_object = this.state.stats['top-2-submissions'] || {};

		var top2_list = _.map(top2_object,function(submission_count,submission_title){
			let text = `${submission_title} : ${submission_count}`;
			return (<ListItem primaryText={text} />);
		});

		return top2_list;
	}

	filterbyLevel(){
		var level_object = this.state.stats['submissions_per_level'] || {};

		var list_items = _.map(level_object,function(count,level){
			let text = `${level} : ${count}`;
			return  (<ListItem primaryText={text} />);

		});


		return list_items;
	}

	render(){

		const custom_styles = {marginTop:48};

		var count = this.state.stats.total_submissions || 0;

		return (
				<Paper zDepth={1} style={custom_styles} >
					<List>
						<AppBar title="Statistics " />
						<Subheader>Top Five Languages Used:</Subheader>
						{this.getTop5()}
						<Divider />
						<Subheader>Top Two Submissions :</Subheader>
						{this.getTop2()}
						<Divider />
						<Subheader>Number of Submissions per level :</Subheader>
						{this.filterbyLevel()}
						<Divider />
						<Subheader>Total Submissions : {count} </Subheader>
					</List>
				</Paper>
		       );

		
	}
}

/*
const default = {
	name : "languages",
	checkboxes : {
		item1 : {
			label: "C"
		}
	}
}
*/

class CheckBoxGroup extends Component {
	constructor(props){
		super(props);
		this.getLanguages = this.getLanguages.bind(this);
		//this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.renderChoices = this.renderChoices.bind(this);
		this.getCheckedValues = this.getCheckedValues.bind(this);
		this.handleOnCheck = this.handleOnCheck.bind(this);
		this.state = {choices:{}}
	}

	componentDidUpdate() {
		console.log("component updated!");
		this.getCheckedValues();
	}

	componentWillUpdate(){
		console.log("component will update!");
		//this.getCheckedValues();

	}

	getLanguages(){
		$.ajax({
		url: API_ROOT+'/langs/',
		dataType: "jsonp",
		type: 'GET',
		callback:'callback',
		success: function(data) {
			let options = _.mapObject(data,function(val,key){
				return false;
			});

			console.log(options);
			this.setState({choices:options});
		}.bind(this),

		error: function(xhr,err){
			console.error("Error occured file fetching!");
			console.error("Error occured ",err);
			console.error(xhr.responseText);

		}

	     });
	}

	componentDidMount(){
		this.getLanguages();
	}

	componentWillReceiveProps (nextProps){
		console.log("componentRecievedProps!!!!!!!!");
	}

	getCheckedValues() {
		var checkedObjArray = [];
		let { choices } =  this.state;

		let checkedArray = _.filter(_.keys(choices),function(label){
			return choices[label];
		});


		//this.props.updateCount(checkedArray);
		console.log("CheckboxFieldGroup.getCheckedValues() = " + checkedArray);
	}


	handleOnCheck(event,isInputChecked){
		let checkboxValue = event.target.value;
		let newState = { ...this.state.choices , [checkboxValue] : isInputChecked  }; 
		this.setState({choices:newState});
	}

	renderChoices(){
		let checkboxes = _.map(this.state.choices,function(checkedValue,label){
			return (<Checkbox label={label} value={label} onCheck={this.handleOnCheck} checked={checkedValue}/>);
		}.bind(this));

		return checkboxes;
	}

	render() {
		const checkbox_style = {marginTop:10};
		return (
			<div style={checkbox_style}>
				{this.renderChoices()}
			</div>
		);
	}

}




class RightSide extends Component {


	render(){
		const custom_style = {marginTop:50};
		return (
				<div className="col-lg-4" style={custom_style}>
					<AppBar title="Filter by Choice" />
					<CheckBoxGroup />
					<Stats />
				</div>
			);
	}

}

const muiTheme = getMuiTheme({

	  palette: {
	    accent1Color: deepOrange500,
	  },

});

class Main extends Component {

  render() {
		    return (
		      <MuiThemeProvider muiTheme={muiTheme}>
			<div className="row">
				<AppBar title="JDA Code Search" />
				<LeftSearch />
				<RightSide />
			</div>
		      </MuiThemeProvider>
		    );
	  }
}

export default Main;
