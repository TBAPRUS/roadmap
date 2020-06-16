import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppType } from '../../store';

import {
  changeCreateRoleUser,
  changeCreateEmailUser,
  changeCreateNameUser,
  changeCreatePasswordUser,
  fetchCreateUser,
} from '../../store/users/actions';

interface CreateProps {
  role: string;
  name: string;
  email: string;
  password: string;
  changeCreateRoleUser: typeof changeCreateRoleUser;
  changeCreateEmailUser: typeof changeCreateEmailUser;
  changeCreateNameUser: typeof changeCreateNameUser;
  changeCreatePasswordUser: typeof changeCreatePasswordUser;
  fetchCreateUser: typeof fetchCreateUser;
}

const Create: React.FC<CreateProps> = ({
  role,
  name,
  email,
  password,
  changeCreateRoleUser,
  changeCreateEmailUser,
  changeCreateNameUser,
  changeCreatePasswordUser,
  fetchCreateUser,
}) => {
  function handleChangeRole(e: React.ChangeEvent<HTMLInputElement>) {
    changeCreateRoleUser(e.target.value);
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    changeCreateEmailUser(e.target.value);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    changeCreateNameUser(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    changeCreatePasswordUser(e.target.value);
  }

  function handleCreateUser() {
    fetchCreateUser({ role, name, email, password });
  }

  const rolebool: boolean = /(admin)|(user)/.test(role);
  const emailbool: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const namebool = /^.{4,26}$/.test(name);
  const passwordbool = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/.test(password);

  return (
    <div className="createuser">
      <input
        className={rolebool.toString()}
        type="text"
        name="role"
        placeholder="Role"
        value={role}
        autoComplete="off"
        onChange={handleChangeRole}
      />
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
      <button
        className={
          (
            rolebool === true &&
            emailbool === true &&
            namebool === true &&
            passwordbool === true
          ).toString() + 'Submit'
        }
        disabled={
          !(
            emailbool === true &&
            namebool === true &&
            passwordbool === true &&
            rolebool === true
          )
        }
        onClick={handleCreateUser}
      >
        Create
      </button>
    </div>
  );
};

const mapStateToProps = (state: AppType) => {
  const { role, name, email, password } = state.users.create;
  return { role, name, email, password };
};

export default connect(mapStateToProps, {
  changeCreateRoleUser,
  changeCreateEmailUser,
  changeCreateNameUser,
  changeCreatePasswordUser,
  fetchCreateUser,
})(Create);
