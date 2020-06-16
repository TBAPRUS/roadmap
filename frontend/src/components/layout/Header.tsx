import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppType } from '../../store';

import { fetchLogoutUser } from '../../store/user/actions';

interface HeaderProps {
  role: string;
  image: string;
  fetchLogoutUser: typeof fetchLogoutUser;
}

const Header: React.SFC<HeaderProps> = ({ role, image, fetchLogoutUser }) => (
  <header id="menu">
    <Link className="link" to="/roadmaps">
      Roadmaps
    </Link>
    {role === 'admin' && (
      <Link className="link" to="/users">
        Users
      </Link>
    )}
    {role === '' && (
      <Link className="link" to="/login">
        Login
      </Link>
    )}
    {role !== '' && (
      <React.Fragment>
        <Link className="link" to="logout" onClick={fetchLogoutUser}>
          Logout
        </Link>
        <Link className="link" to="/me">
          <img id="ava" style={{ width: '30px' }} src={`/img/users/${image}`} />
        </Link>
      </React.Fragment>
    )}
  </header>
);

const mapStateToProps = (state: AppType) => {
  const { role, image } = state.user;
  return { role, image };
};

export default connect(mapStateToProps, { fetchLogoutUser })(Header);
