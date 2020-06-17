import React, { Component, ReactType } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { AppType } from '../store';
import { ErrorType } from '../store/error/types';
import { LoadType } from '../store/load/types';
import { UserType } from '../store/user/types';
import { WindowType } from '../store/window/types';

import { fetchMeUser, receiveUser } from '../store/user/actions';

import { CustomError } from './layout/Error';
import { Load } from './layout/Load';
import { Header } from './layout/Header';
import { Window } from './layout/Window';

import Login from './login/Login';
import Register from './login/Register';
import Roadmaps from './roadmaps/Roadmaps';
import Users from './users/Users';
import Roadmap from './roadmaps/Roadmap';
import User from './users/User';
import CreateRoadmap from './roadmaps/CreateRoadmap';
import CreateUser from './users/CreateUser';
import Me from './user/Me';
import ChangePassword from './user/ChangePassword';

interface AppProps {
  error: ErrorType;
  load: LoadType;
  user: UserType;
  window: WindowType;
  fetchMeUser: typeof fetchMeUser;
  receiveUser: typeof receiveUser;
}

class App extends Component<AppProps> {
  componentDidMount() {
    if (/; token=.*?/g.test(document.cookie)) {
      this.props.fetchMeUser();
    } else {
      this.props.receiveUser();
    }
  }

  render() {
    const { error, load, window } = this.props;
    const { receive, role } = this.props.user;

    if (!receive) {
      return <Load />;
    }

    return (
      <Router>
        <div id="app">
          <Header />
          {error && <CustomError />}
          {load && <Load />}
          {window.title && <Window />}
          <Switch>
            <Route exact path="/roadmaps" component={Roadmaps} />
            <PrivateRoute
              exact={true}
              auth={role === 'admin'}
              path="/users"
              redirect="/"
              component={Users}
            />
            <Route path="/roadmaps/:id" component={Roadmap} />
            <PrivateRoute
              exact={false}
              auth={role === 'admin'}
              path="/users/:id"
              redirect="/"
              component={User}
            />
            <PrivateRoute
              exact={false}
              component={CreateRoadmap}
              auth={role !== ''}
              redirect="/"
              path="/createroadmap"
            />
            <PrivateRoute
              exact={false}
              component={CreateUser}
              auth={role === 'admin'}
              redirect="/"
              path="/createuser"
            />
            <PrivateRoute
              exact={false}
              component={Me}
              auth={role !== ''}
              redirect="/"
              path="/me"
            />
            <PrivateRoute
              exact={false}
              component={ChangePassword}
              auth={role !== ''}
              redirect="/"
              path="/changepassword"
            />
            <PrivateRoute
              exact={false}
              component={Login}
              auth={role === ''}
              redirect="/"
              path="/login"
            />
            <PrivateRoute
              exact={false}
              component={Register}
              auth={role === ''}
              redirect="/"
              path="/register"
            />
            <Route path="*">
              <Redirect to="/roadmaps" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

interface IPrivateRoute {
  component: ReactType;
  auth: boolean;
  redirect: string;
  path: string;
  exact: boolean;
}

const PrivateRoute = ({
  exact,
  component: Component,
  auth,
  redirect,
  ...rest
}: IPrivateRoute): JSX.Element => {
  return (
    <Route
      {...rest}
      exact={exact}
      render={(props) =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: AppType) => {
  const { user, error, load, window } = state;
  return { user, error, load, window };
};

export default connect(mapStateToProps, {
  fetchMeUser,
  receiveUser,
})(App);
