import { combineReducers } from 'redux';
import listReducer from './listing';

const reducer = combineReducers({
    listStore: listReducer,
});

export default reducer;
