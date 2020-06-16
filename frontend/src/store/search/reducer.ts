import {
  SearchType,
  SearchActionType,
  CHANGE_LIMIT,
  CHANGE_SORT,
  CHANGE_SEARCH,
} from './types';

const initState: SearchType = {
  limit: '5',
  sort: 0, // 0 = off; 1 = +; 2 = -;
  search: '',
};

export const search = (state = initState, action: SearchActionType) => {
  switch (action.type) {
    case CHANGE_LIMIT:
      return { ...state, limit: action.limit };
    case CHANGE_SORT:
      return { ...state, sort: action.sort };
    case CHANGE_SEARCH:
      return { ...state, search: action.search };
    default:
      return state;
  }
};
