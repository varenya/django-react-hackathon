import React,{Component} from 'react'
import Checkbox from 'material-ui/Checkbox';
import _ from 'underscore'
import { API_ROOT } from './App'
import { connect } from 'react-redux'
import { selectCheckBox } from '../actions/index'


class CheckBoxGroup extends Component {
	constructor(props){
		super(props);
		//this.getLanguages = this.getLanguages.bind(this);
		//this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.renderChoices = this.renderChoices.bind(this);
		//this.getCheckedValues = this.getCheckedValues.bind(this);
		this.handleOnCheck = this.handleOnCheck.bind(this);
	}



	handleOnCheck(event,isInputChecked){
		let checkboxValue = event.target.value;
		const { dispatch } = this.props;
		dispatch(selectCheckBox(checkboxValue,isInputChecked));

	}

	renderChoices(){

		const { selectedLanguages } = this.props.programming_languages;


		let checkboxes = _.map(selectedLanguages,function(checkedValue,label){
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
function mapStateToProps(state){
	const { programming_languages , selectedLanguages , searchResults } = state

	return {
		programming_languages,
		selectedLanguages,
		searchResults
	}
}

const ConnectedCheckBoxGroup = connect(mapStateToProps)(CheckBoxGroup)

export default ConnectedCheckBoxGroup
