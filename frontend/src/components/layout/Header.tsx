import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppType } from '../../store';

import { fetchLogoutUser } from '../../store/user/actions';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { role, image } = useSelector((state: AppType) => state.user);

  return (
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
          <Link
            className="link"
            to="logout"
            onClick={() => dispatch(fetchLogoutUser())}
          >
            Logout
          </Link>
          <Link className="link" to="/me">
            <img
              id="ava"
              style={{ width: '30px' }}
              src={`/img/users/${image}`}
            />
          </Link>
        </React.Fragment>
      )}
    </header>
  );
};
