import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { error } from './error/reducer';
import { load } from './load/reducer';
import { user } from './user/reducer';
import { roadmaps } from './roadmaps/reducer';
import { users } from './users/reducer';
import { search } from './search/reducer';
import { window } from './window/reducer';
import { password } from './password/reducer';
import { i } from './interface/';

const rootReducer = combineReducers({
  error,
  load,
  user,
  roadmaps,
  users,
  search,
  window,
  password,
  i,
});

export type AppType = ReturnType<typeof rootReducer>;

export function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, createLogger)
  );

  return store;
}
