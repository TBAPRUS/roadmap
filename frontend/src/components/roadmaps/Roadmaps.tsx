import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppType } from '../../store';

import { RoadmapType } from '../../store/roadmaps/types';
import { SearchType } from '../../store/search/types';

import { IPagination } from '../../store/pagination/interfaces';

import { fetchRoadmaps } from '../../store/roadmaps/actions';

import { Pagintaion } from '../layout/Pagintaion';

import Search from '../layout/Search';

interface IRoadmaps {
  list: RoadmapType<string>[];
  count: number;
  pagination: IPagination;
  search: SearchType;
  fetchRoadmaps: typeof fetchRoadmaps;
}

class Roadmaps extends Component<IRoadmaps> {
  componentDidMount() {
    this.props.fetchRoadmaps(
      `?limit=${this.props.search.limit}&sort=${this.props.search.sort}`
    );
  }
  render() {
    const { list, count, pagination, search } = this.props;
    const { limit, sort: numSort, search: ssearch } = search;

    const strSort = 'title';

    let listRoadmaps: JSX.Element[];

    if (list) {
      listRoadmaps = list.map((roadmap, index) => (
        <div className="roadmap" key={index}>
          <h2>{roadmap.title}</h2>
          <p>{roadmap.description}</p>
          <Link to={`/roadmaps/${roadmap.slug}`}>Go to roadmap</Link>
        </div>
      ));
    }

    return (
      <React.Fragment>
        <Search
          strSort={strSort}
          numSort={numSort}
          limit={limit}
          search={{ title: ssearch }}
          fetchMethod={this.props.fetchRoadmaps}
        />
        <Link to="/createroadmap">Create roadmap</Link>
        <div className="roadmaps">
          <p>Count of roadmaps: {count}</p>
          <div className="list">{listRoadmaps}</div>
          <Pagintaion
            pagination={pagination}
            limit={limit}
            strSort={strSort}
            numSort={numSort}
            search={{ title: ssearch }}
            fetchMethod={this.props.fetchRoadmaps}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppType) => {
  const { list, count, pagination } = state.roadmaps;
  const { search } = state;
  return { list, count, pagination, search };
};

export default connect(mapStateToProps, { fetchRoadmaps })(Roadmaps);
