import {createStore} from 'redux';
import gameReducer from './reducers/guess';

const store = createStore(gameReducer);

export default store;