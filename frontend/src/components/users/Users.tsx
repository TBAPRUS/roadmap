import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppType } from '../../store';

import { UsersType } from '../../store/users/types';
import { SearchType } from '../../store/search/types';

import { fetchUsers } from '../../store/users/actions';

import Search from '../layout/Search';
import { Pagintaion } from '../layout/Pagintaion';

interface UsersProps {
  users: UsersType;
  search: SearchType;
  fetchUsers: typeof fetchUsers;
}

class Users extends Component<UsersProps> {
  componentDidMount() {
    this.props.fetchUsers(
      `?limit=${this.props.search.limit}&sort=${this.props.search.sort}`
    );
  }

  render() {
    const { users, search } = this.props;
    const { count, pagination, list } = users;
    const { limit, sort: numSort, search: ssearch } = search;

    const strSort = 'email';

    let listUsers: JSX.Element[];

    if (list) {
      listUsers = list.map((user, index) => (
        <div className="user" key={index}>
          <img src={`/img/users/${user.image}`} />
          <h2>{user.email}</h2>
          <p>{user.name}</p>
          <p>createdAt: {user.createdAt}</p>
          <Link to={`/users/${user._id}`}>Go to user</Link>
        </div>
      ));
    }

    return (
      <React.Fragment>
        <Search
          strSort={strSort}
          numSort={numSort}
          limit={limit}
          search={{ email: ssearch }}
          fetchMethod={this.props.fetchUsers}
        />
        <Link to="/createuser">Create user</Link>
        <div className="roadmaps">
          <p>Count of users: {count}</p>
          <div className="list">{listUsers}</div>
          <Pagintaion
            pagination={pagination}
            limit={limit}
            strSort={strSort}
            numSort={numSort}
            search={{ email: ssearch }}
            fetchMethod={this.props.fetchUsers}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppType) => {
  const { users, search } = state;
  return { users, search };
};

export default connect(mapStateToProps, { fetchUsers })(Users);
