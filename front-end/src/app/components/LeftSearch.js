import Divider from 'material-ui/Divider'
import React,{ Component } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {findDOMNode} from 'react-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress';
import { API_ROOT } from './App'
import { fetchResults } from '../actions/index'

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

	render() {

		const { languages }  = this.props.programming_languages;

		var search_items = this.props.search_props.map(function(result){
			return (<SearchItem {...result} imgData = {languages}/>);
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
		    this.state = { search_text : '' };
	}

	handleEnter(e){
		if(e.keyCode == 13){
			var text = this.state.search_text.trim();
			if(!text){
				return;
			}
			const { dispatch  } = this.props;

			let url = API_ROOT + '/list/?search=' + text;
			dispatch(fetchResults(url));
		
		}

	}



	handleTextChange(e){
		this.setState({search_text:e.target.value});
	}

	handleNavigation(input){
		const { next , prev } = this.props.searchResults;
		let url = API_ROOT + '/list/' 
		console.log( "prev",prev);
		console.log( "next", next);
		if( input === "next" ){
			this.props.dispatch(fetchResults(next));
		}
		else{
			if ( prev != undefined)
				this.props.dispatch(fetchResults(prev));
			else
				this.props.dispatch(fetchResults(url));
		}
	}


	render() {
		const style = {
			  margin: 12,
		};

		const { results, next , prev , count , isFetching } = this.props.searchResults
		const { selectedLanguages } = this.props.programming_languages;

		let grouped =	_.groupBy(results,function(result){
					return result['language'];
				});
		let select_langs = _.filter(_.keys(selectedLanguages) , function(each_lang){
			return selectedLanguages[each_lang];
		});

		let selected_results = _.chain(select_langs).map(function(lang) {
			return grouped[lang] || [];
		}).flatten().value();


		const isSelected = select_langs.length !== 0


		selected_results = isSelected ? selected_results : results;

		const isEmpty = selected_results.length === 0

		var searchResults;
		if(isFetching ){
			searchResults = ( <CircularProgress size={2} /> );
		}
		else if ( isEmpty && !isFetching ) {
			searchResults = ( <h1> No results! </h1> );
		}
		else {

			searchResults = (
				<div>
					<SearchResults search_props={selected_results} total_count={count} {...this.props} />
					<RaisedButton label="Prev" style={style} primary={true} className="left" onMouseDown={this.handleNavigation.bind(this,"prev")}/>
					<RaisedButton label="Next" style={style} primary={true} className="right" onMouseDown={this.handleNavigation.bind(this,"next")}/>
				</div>
			);
		}



		return (
				<div className="col-lg-8">
					<TextField hintText="Enter search text.." fullWidth={true} onKeyDown={this.handleEnter} value={this.state.search_text} onChange={this.handleTextChange} />
					
					{searchResults}
				</div>
		);
	}
}

function mapStateToProps(state){
	const { programming_languages , selectedLanguages , searchResults } = state

	return {
		programming_languages,
		selectedLanguages,
		searchResults
	}
}

const ConnectedSearch = connect(mapStateToProps)(LeftSearch)


export default ConnectedSearch
