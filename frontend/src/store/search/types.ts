export const CHANGE_LIMIT = 'CHANGE_LIMIT';
export const CHANGE_SORT = 'CHANGE_SORT';
export const CHANGE_SEARCH = 'CHANGE_SEARCH';

export type SearchType = {
  limit: string;
  sort: number;
  search: string;
};

export interface ChangeLimit {
  type: typeof CHANGE_LIMIT;
  limit: string;
}

export interface ChangeSort {
  type: typeof CHANGE_SORT;
  sort: number;
}

export interface ChangeSearch {
  type: typeof CHANGE_SEARCH;
  search: string;
}

export type SearchActionType = ChangeLimit | ChangeSort | ChangeSearch;
