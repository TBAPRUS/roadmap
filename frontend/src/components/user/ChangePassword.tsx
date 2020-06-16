import React from 'react';
import { connect } from 'react-redux';

import { AppType } from '../../store';

import { PasswordType } from '../../store/password/types';

import {
  changeCurrentPassword,
  changeNewPassword,
} from '../../store/password/actions';
import { fetchUpdatePasswordUser } from '../../store/user/actions';
import { changeWindow } from '../../store/window/actions';

interface ChangePasswordProps extends PasswordType {
  changeCurrentPassword: typeof changeCurrentPassword;
  changeNewPassword: typeof changeNewPassword;
  fetchUpdatePasswordUser: typeof fetchUpdatePasswordUser;
  changeWindow: typeof changeWindow;
}

const ChangePassword: React.SFC<ChangePasswordProps> = ({
  currentPassword,
  newPassword,
  changeCurrentPassword,
  changeNewPassword,
  fetchUpdatePasswordUser,
  changeWindow,
}) => {
  function handleChangeCurrentPassword(e: React.ChangeEvent<HTMLInputElement>) {
    changeCurrentPassword(e.target.value.slice(0, 24));
  }

  function handleChangeNewPassword(e: React.ChangeEvent<HTMLInputElement>) {
    changeNewPassword(e.target.value.slice(0, 24));
  }

  return (
    <div className="changepassword">
      <input
        className="password"
        type="password"
        name="password"
        placeholder="Current password"
        value={currentPassword}
        autoComplete="off"
        onChange={handleChangeCurrentPassword}
      />
      <input
        className="password"
        type="password"
        name="password"
        placeholder="New password"
        value={newPassword}
        autoComplete="off"
        onChange={handleChangeNewPassword}
      />
      <button
        onClick={() => {
          changeWindow({
            title: 'Are you sure?',
            text: 'Change password',
            methods: [
              () => fetchUpdatePasswordUser({ currentPassword, newPassword }),
            ],
            answers: ['OK'],
          });
        }}
      >
        Change
      </button>
    </div>
  );
};

const mapStateToProps = (state: AppType) => {
  const { currentPassword, newPassword } = state.password;
  return { currentPassword, newPassword };
};

export default connect(mapStateToProps, {
  changeCurrentPassword,
  changeNewPassword,
  fetchUpdatePasswordUser,
  changeWindow,
})(ChangePassword);
