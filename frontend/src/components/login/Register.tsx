import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppType } from '../../store';

import {
  IchangeRegisterEmail,
  IchangeRegisterName,
  IchangeRegisterPassword,
} from '../../store/interface/register/actions';

import { fetchRegisterUser } from '../../store/user/actions';

interface IRegister {
  email: string;
  name: string;
  password: string;
  IchangeRegisterEmail: typeof IchangeRegisterEmail;
  IchangeRegisterName: typeof IchangeRegisterName;
  IchangeRegisterPassword: typeof IchangeRegisterPassword;
  fetchRegisterUser: typeof fetchRegisterUser;
}

const Register: React.SFC<IRegister> = ({
  email,
  name,
  password,
  IchangeRegisterEmail,
  IchangeRegisterName,
  IchangeRegisterPassword,
  fetchRegisterUser,
}) => {
  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    IchangeRegisterEmail(e.target.value);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    IchangeRegisterName(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    IchangeRegisterPassword(e.target.value);
  }

  function fetchData(e: React.SyntheticEvent) {
    e.preventDefault();
    fetchRegisterUser({ email, name, password });
  }

  const emailbool = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const namebool = /^.{4,26}$/.test(name);
  const passwordbool = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/.test(password);

  return (
    <div>
      <h1>Register</h1>
      <Link to="/login">I already have an account</Link>
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
          className={namebool.toString()}
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          autoComplete="off"
          onChange={handleChangeName}
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
          className={
            (
              emailbool === true &&
              namebool === true &&
              passwordbool === true
            ).toString() + 'Submit'
          }
          type="submit"
          value="Sing in"
          disabled={
            !(emailbool === true && namebool === true && passwordbool === true)
          }
          onClick={fetchData}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: AppType) => {
  const { email, name, password } = state.i.register;
  return { email, name, password };
};

export default connect(mapStateToProps, {
  IchangeRegisterEmail,
  IchangeRegisterName,
  IchangeRegisterPassword,
  fetchRegisterUser,
})(Register);
