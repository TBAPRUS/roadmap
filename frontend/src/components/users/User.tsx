import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppType } from '../../store';

import { UserType } from '../../store/users/types';

import {
  changeCurrentRoleUser,
  changeCurrentEmailUser,
  changeCurrentNameUser,
  changeCurrentPasswordUser,
  fetchUser,
  fetchDeleteUser,
  fetchUdpateUser,
  fetchUpdateImageUser,
} from '../../store/users/actions';
import { changeWindow } from '../../store/window/actions';
import { changeError } from '../../store/error/actions';

interface UserProps extends UserType {
  match: { params: { id: string } };
  changeCurrentRoleUser: typeof changeCurrentRoleUser;
  changeCurrentEmailUser: typeof changeCurrentEmailUser;
  changeCurrentNameUser: typeof changeCurrentNameUser;
  changeCurrentPasswordUser: typeof changeCurrentPasswordUser;
  fetchUser: typeof fetchUser;
  fetchDeleteUser: typeof fetchDeleteUser;
  fetchUdpateUser: typeof fetchUdpateUser;
  fetchUpdateImageUser: typeof fetchUpdateImageUser;
  changeError: typeof changeError;
  changeWindow: typeof changeWindow;
}

class User extends Component<UserProps> {
  private imgRef: React.RefObject<HTMLInputElement> = React.createRef<
    HTMLInputElement
  >();
  constructor(props: UserProps) {
    super(props);

    this.handleChangeImg = this.handleChangeImg.bind(this);
    this.handleClickChangeImg = this.handleClickChangeImg.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];
    const data = new FormData();
    if (file && file.size < 1000000) {
      data.append('file', e.target.files[0]);
      this.props.fetchUpdateImageUser(this.props._id, data);
    } else {
      this.props.changeError('Please upload an image less than 1000000');
    }
  }

  handleClickChangeImg() {
    this.imgRef.current.click();
  }

  handleChangeRole(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeCurrentRoleUser(e.target.value);
  }

  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeCurrentEmailUser(e.target.value);
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeCurrentNameUser(e.target.value);
  }

  handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeCurrentPasswordUser(e.target.value);
  }

  handleUpdateUser() {
    const { _id, email, name, password } = this.props;

    let obj: { email?: string; name?: string; password?: string } = {};
    if (email) {
      obj.email = email;
    }
    if (name) {
      obj.name = name;
    }
    if (password) {
      obj.password = password;
    }

    this.props.fetchUdpateUser(_id, obj);
  }

  render() {
    const { _id, image, role, email, name, password } = this.props;

    const rolebool: boolean = /(admin)|(user)/.test(role) || role === '';
    const emailbool: boolean =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
      email === '';
    const namebool = /^.{4,26}$/.test(name) || name === '';
    const passwordbool =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/.test(password) ||
      password === '';

    return (
      <div className="user">
        <button
          onClick={() =>
            this.props.changeWindow({
              title: 'Are you sure?',
              text: 'Delete user',
              methods: [() => this.props.fetchDeleteUser(_id)],
              answers: ['YES'],
            })
          }
        >
          Delete
        </button>
        <input
          accept="image/*"
          className="img"
          style={{ display: 'none' }}
          type="file"
          ref={this.imgRef}
          onChange={this.handleChangeImg}
        />
        <img onClick={this.handleClickChangeImg} src={`/img/users/${image}`} />
        <p>ID: {_id}</p>
        <p>Leave the field blank to not change it</p>
        <input
          className={rolebool.toString()}
          type="text"
          name="role"
          placeholder="Role"
          value={role}
          autoComplete="off"
          onChange={this.handleChangeRole}
        />
        <input
          className={emailbool.toString()}
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          autoComplete="off"
          onChange={this.handleChangeEmail}
        />
        <input
          className={namebool.toString()}
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          autoComplete="off"
          onChange={this.handleChangeName}
        />
        <input
          className={passwordbool.toString()}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          autoComplete="off"
          onChange={this.handleChangePassword}
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
          onClick={this.handleUpdateUser}
        >
          Update
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppType) => {
  return { ...state.users.current };
};

export default connect(mapStateToProps, {
  changeCurrentRoleUser,
  changeCurrentEmailUser,
  changeCurrentNameUser,
  changeCurrentPasswordUser,
  fetchUser,
  fetchDeleteUser,
  fetchUdpateUser,
  fetchUpdateImageUser,
  changeError,
  changeWindow,
})(User);
