import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {NoteReducer} from './Reducer/noteReducer';

const middleware=[thunk]
const store=createStore(NoteReducer,composeWithDevTools(applyMiddleware(...middleware)))

export default store;