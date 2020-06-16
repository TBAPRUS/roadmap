import {
  CHANGE_LIMIT,
  CHANGE_SORT,
  CHANGE_SEARCH,
  ChangeSearch,
  ChangeLimit,
  ChangeSort,
} from './types';

export function changeLimit(limit: string): ChangeLimit {
  return {
    type: CHANGE_LIMIT,
    limit,
  };
}

export function changeSort(sort: number): ChangeSort {
  return { type: CHANGE_SORT, sort };
}

export function changeSearch(search: string): ChangeSearch {
  return { type: CHANGE_SEARCH, search };
}
