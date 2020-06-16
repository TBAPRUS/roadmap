import React from 'react';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { AppType } from '../../store';

import { IPagination } from '../../store/pagination/interfaces';

interface ISearch {
  [a: string]: string;
}

interface PaginationProps {
  pagination: IPagination;
  limit: string;
  strSort: string;
  numSort: number;
  search: ISearch;
  fetchMethod: (str: string) => ThunkAction<void, AppType, void, Action>;
}

export const Pagintaion: React.SFC<PaginationProps> = ({
  pagination,
  limit,
  strSort,
  numSort,
  search,
  fetchMethod,
}) => {
  const { prev, next } = pagination;

  if (!prev && !next) {
    return null;
  }

  strSort = numSort === 1 ? strSort : numSort === 2 ? `-${strSort}` : null;

  let query: string = `?limit=${limit}`;

  if (strSort) {
    query += `&sort=${strSort}`;
  }

  for (let param in search) {
    query += `&${param}=${search[param]}`;
  }

  return (
    <div className="pagination">
      {prev && (
        <button onClick={() => fetchMethod(`${query}&page=${prev.page}`)}>
          {prev.page}
        </button>
      )}

      <button>{prev ? prev.page + 1 : next ? next.page - 1 : 1}</button>

      {next && (
        <button onClick={() => fetchMethod(`${query}&page=${next.page}`)}>
          {next.page}
        </button>
      )}
    </div>
  );
};
