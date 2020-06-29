import {combineReducers} from 'redux';
import isrunning from "./isrunning";
import currentAlgorithm from "./currentAlgorithm";

import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
    isrunning,
    currentAlgorithm,
   
    loadingBar: loadingBarReducer
})