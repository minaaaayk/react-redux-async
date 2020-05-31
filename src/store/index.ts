import { createStore } from 'redux';
import { PostReducer } from './Posts/reducer';

const store = createStore(PostReducer);

export default store;