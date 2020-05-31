import { combineReducers, createStore } from 'redux';
import { PostReducer } from './Posts/reducer';
export const rootReducer = combineReducers({
    Posts: PostReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);