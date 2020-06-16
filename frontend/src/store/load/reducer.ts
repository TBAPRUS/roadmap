import { LoadType, LoadActionType, CHANGE_LOAD } from './types';

export const load = (state = false, action: LoadActionType): LoadType => {
  switch (action.type) {
    case CHANGE_LOAD:
      return !state;
    default:
      return state;
  }
};
