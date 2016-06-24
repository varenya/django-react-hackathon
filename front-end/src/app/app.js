import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/App'; // Our custom react component
import { Provider } from 'react-redux'
import store from './store/index'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


render( ( <Provider store={store}>
       		<Main />
	   </Provider>)	, document.getElementById('app'));
