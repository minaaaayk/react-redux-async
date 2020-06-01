import { combineReducers, createStore, applyMiddleware } from 'redux';
import { PostReducer } from './Posts/reducer';
import { apiMiddleware } from '../middleware-api';
export const rootReducer = combineReducers({
    Posts: PostReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(apiMiddleware));