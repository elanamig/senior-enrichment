import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import campuses from './campuses';
import campus from './campus';
import students from './students';
import student from './student';

const reducer = combineReducers ({
    campuses,
    campus,
    students,
    student
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware)));


export * from './campuses';
export * from './campus';
export * from './students';
export * from './student';