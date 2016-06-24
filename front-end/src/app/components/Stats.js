import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import _ from 'underscore';
import React,{ Component } from 'react';
import { API_ROOT } from './App';


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

export default Stats
