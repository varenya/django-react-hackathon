import fetch from 'isomorphic-fetch';
import fetchJsonp from 'fetch-jsonp'
import _ from 'underscore'

export const SELECT_LANGUAGE = 'SELECT_LANGUAGE'

export const API_ROOT = 'http://localhost:8181';

export function selectCheckBox(language,checked){
	return {
		type:SELECT_LANGUAGE,
		language,
		checked
	}
}


export const SEARCH_TEXT = 'SEARCH_TEXT'

export function searchForText(text){
	return {
		type:SEARCH_TEXT,
		text
	}
}

export const RECIEVE_RESULTS = 'RECIEVE_RESULTS'

export function recieveResults(json){
	return {
		type:RECIEVE_RESULTS,
		results : json.results,
		totalCount : json.count,
		prev : json.prev,
		next : json.next
	}
}


export function fetchResults(url){

	return function(dispatch){

		dispatch(searchForText(url))


		return fetchJsonp(url) 
		       .then( response => response.json() )
		       .then( json => dispatch(recieveResults(json)) )
	}
}

export const GET_LANGUAGES = 'GET_LANGUAGES'

export function getLanguage() {
	return {

		type : GET_LANGUAGES
	}
}

export const RECIEVIE_LANGUAGES = 'RECIEVIE_LANGUAGES'

export function recieveLanguages(langs){
	return {
		type : RECIEVIE_LANGUAGES,
		languages : langs,
		selectedLanguages : _.mapObject(langs,function(val,key){
			return false;
		})
	}
}

export function fetchLanguages(){
	return function(dispatch){
		dispatch(getLanguage())

		let url = API_ROOT + '/langs/'

		return fetchJsonp(url)
		       .then( response => response.json() )
		       .then( json => dispatch(recieveLanguages(json)) )

	}
}

