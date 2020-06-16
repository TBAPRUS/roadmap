import React from 'react';
import { connect } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { AppType } from '../../store';

import {
  changeLimit,
  changeSort,
  changeSearch,
} from '../../store/search/actions';

import arrow from '../roadmaps/arrow';

interface ISearch {
  [a: string]: string;
}

interface SearchProps {
  limit: string;
  search: ISearch;
  strSort: string;
  numSort: number;
  changeLimit: typeof changeLimit;
  changeSort: typeof changeSort;
  changeSearch: typeof changeSearch;
  fetchMethod: (str: string) => ThunkAction<void, AppType, void, Action>;
}

const Search: React.FC<SearchProps> = ({
  limit,
  strSort,
  numSort,
  search,
  changeLimit,
  changeSort,
  changeSearch,
  fetchMethod,
}) => {
  function handleChangeLimit(e: React.ChangeEvent<HTMLInputElement>) {
    changeLimit(e.target.value);
  }

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    changeSearch(e.target.value);
  }

  let query = `?limit=${limit}&sort=${
    numSort === 1 ? strSort : numSort === 2 ? `-${strSort}` : null
  }`;

  for (let param in search) {
    query += `&${param}=${search[param]}`;
  }

  return (
    <div className="search">
      <input
        className="searchinput"
        type="text"
        name="search"
        placeholder="Search"
        value={search[0]}
        autoComplete="off"
        onChange={handleChangeSearch}
      />
      <input
        className="limit"
        type="text"
        name="limit"
        placeholder="Limit"
        value={limit}
        autoComplete="off"
        onChange={handleChangeLimit}
      />
      <div className="sort">
        <button onClick={() => changeSort(numSort === 2 ? 0 : ++numSort)}>
          Sort by {strSort}
        </button>
        {numSort === 1 ? arrow.up : numSort === 2 ? arrow.down : null}
      </div>
      <button onClick={() => fetchMethod(query)}>Search</button>
    </div>
  );
};

export default connect(null, {
  changeLimit,
  changeSort,
  changeSearch,
})(Search);
