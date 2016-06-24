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
import Dialog from 'material-ui/Dialog';
import {deepOrange500,indigo900} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import ConnectedCheckBoxGroup from './CheckBoxGroup';
import Stats from './Stats';
import ConnectedSearch from './LeftSearch';


const styles = {
  container: {
    textAlign: 'center',
  },
};

export const API_ROOT = 'http://localhost:8181';


class RightSide extends Component {


	render(){
		const custom_style = {marginTop:50};
		return (
				<div className="col-lg-4" style={custom_style}>
					<AppBar title="Filter by Choice" />
					<ConnectedCheckBoxGroup />
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
				<ConnectedSearch />
				<RightSide />
			</div>
		      </MuiThemeProvider>
		    );
	  }
}

export default Main;
