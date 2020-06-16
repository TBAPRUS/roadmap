import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppType } from '../../store';

import {
  IchangeLoginEmail,
  IchangeLoginPassword,
} from '../../store/interface/login/actions';

import { fetchLoginUser } from '../../store/user/actions';

interface ILogin {
  email: string;
  password: string;
  IchangeLoginEmail: typeof IchangeLoginEmail;
  IchangeLoginPassword: typeof IchangeLoginPassword;
  fetchLoginUser: typeof fetchLoginUser;
}

const Login: React.SFC<ILogin> = ({
  email,
  password,
  IchangeLoginEmail,
  IchangeLoginPassword,
  fetchLoginUser,
}) => {
  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    IchangeLoginEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    IchangeLoginPassword(e.target.value);
  }

  function fetchData(e: React.SyntheticEvent) {
    e.preventDefault();
    fetchLoginUser({ email, password });
  }

  const emailbool = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const passwordbool = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/.test(password);

  return (
    <div>
      <h1>Login</h1>
      <Link to="/register">Create a account</Link>
      <form>
        <input
          className={emailbool.toString()}
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          autoComplete="off"
          onChange={handleChangeEmail}
        />
        <input
          className={passwordbool.toString()}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          autoComplete="off"
          onChange={handleChangePassword}
        />
        <input
          className={(emailbool === passwordbool).toString() + 'Submit'}
          type="submit"
          value="Sing in"
          disabled={!(emailbool === true && passwordbool === true)}
          onClick={fetchData}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: AppType) => {
  const { email, password } = state.i.login;
  return { email, password };
};

export default connect(mapStateToProps, {
  IchangeLoginEmail,
  IchangeLoginPassword,
  fetchLoginUser,
})(Login);
