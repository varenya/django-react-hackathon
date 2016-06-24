import { combineReducers } from 'redux'

import { SELECT_LANGUAGE, SEARCH_TEXT , RECIEVE_RESULTS , GET_LANGUAGES , RECIEVIE_LANGUAGES } from '../actions/index'


function selectLanguage(state={},action){

	switch(action.type){
		case SELECT_LANGUAGE:
			//console.log("reduce",action.language)
			return { ...state , [action.language] : action.checked }
		default:
			return state
	}
}


function searchResults( state = { isFetching : false, results : [] , count : 0 , next : '' , prev : '' } , action ){
	switch(action.type){
		case SEARCH_TEXT:
			return { ...state , isFetching : true }
		case RECIEVE_RESULTS:
			return { ...state, isFetching : false , results : action.results , count : action.totalCount , next : action.next , prev : action.prev }
		default:
			return state
	}
}

function getLanguages( state = { isFetching: false , languages : {} , selectedLanguages : {} } , action ) {
	switch(action.type){
		case GET_LANGUAGES:
			return { ...state, isFetching : true }
		case RECIEVIE_LANGUAGES:
			return { ...state , isFetching : false , languages : action.languages , selectedLanguages : action.selectedLanguages}
		case SELECT_LANGUAGE :
			return { ...state , selectedLanguages : selectLanguage(state.selectedLanguages,action) }
		default :
			return state
	}
}



const rootReducer = combineReducers({
	searchResults,
	programming_languages : getLanguages
})

export default rootReducer
