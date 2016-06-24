import 'babel-polyfill'
import createLogger from 'redux-logger'
import { createStore,applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import thunkMiddleware from 'redux-thunk'
import { fetchResults, fetchLanguages , API_ROOT} from '../actions/index'

const loggerMiddleWare = createLogger()

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware,loggerMiddleWare) )

const url = API_ROOT + '/list/'

store.dispatch(fetchResults(url))
store.dispatch(fetchLanguages())

export default store
