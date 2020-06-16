import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppType } from '../../store';

import { UserType } from '../../store/user/types';

import {
  setChange,
  setNameUser,
  fetchRoadmapsMeUser,
  fetchUpdateImageUser,
  fetchUpdateDetailsUser,
} from '../../store/user/actions';
import { changeError } from '../../store/error/actions';

interface MeProps extends UserType {
  setChange: typeof setChange;
  setNameUser: typeof setNameUser;
  changeError: typeof changeError;
  fetchRoadmapsMeUser: typeof fetchRoadmapsMeUser;
  fetchUpdateImageUser: typeof fetchUpdateImageUser;
  fetchUpdateDetailsUser: typeof fetchUpdateDetailsUser;
}

class Me extends Component<MeProps> {
  private imgRef: React.RefObject<HTMLInputElement> = React.createRef<
    HTMLInputElement
  >();
  constructor(props: MeProps) {
    super(props);

    this.handleChangeImg = this.handleChangeImg.bind(this);
    this.handleClickChangeImg = this.handleClickChangeImg.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  componentDidMount() {
    if (!this.props.roadmaps.length) {
      this.props.fetchRoadmapsMeUser(this.props._id);
    }
  }

  handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];
    const data = new FormData();
    if (file && file.size < 1000000) {
      data.append('file', e.target.files[0]);
      this.props.fetchUpdateImageUser(data);
    } else {
      this.props.changeError('Please upload an image less than 1000000');
    }
  }

  handleClickChangeImg() {
    this.imgRef.current.click();
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.setNameUser(e.target.value.slice(0, 26));
    if (!this.props.change) {
      this.props.setChange(true);
    }
  }

  render() {
    const { email, image, name, role, _id, roadmaps, change } = this.props;

    const listRoadmaps: JSX.Element[] = roadmaps.map((roadmap, index) => (
      <div key={index} className="roadmap">
        <h3>{roadmap.title}</h3>
        <p>{roadmap.description}</p>
        <Link to={`/roadmaps/${roadmap.slug}`}>Go to roadmap</Link>
      </div>
    ));

    return (
      <div className="me">
        <input
          accept="image/*"
          className="img"
          style={{ display: 'none' }}
          type="file"
          ref={this.imgRef}
          onChange={this.handleChangeImg}
        />
        <img onClick={this.handleClickChangeImg} src={`/img/users/${image}`} />
        <p className="email">{email}</p>
        <input
          className={`name ${/^.{4,26}$/.test(name).toString()}`}
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          autoComplete="off"
          onChange={this.handleChangeName}
        />
        {change && (
          <button
            disabled={!/^.{4,26}$/.test(name)}
            onClick={() => this.props.fetchUpdateDetailsUser({ name })}
          >
            Save
          </button>
        )}
        <div className="roadmaps">{listRoadmaps}</div>
        <Link className="changepasswordlink" to="/changepassword">
          Change password
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: AppType) => {
  const { email, image, name, role, _id, roadmaps, change } = state.user;
  return { email, image, name, role, _id, roadmaps, change };
};

export default connect(mapStateToProps, {
  setChange,
  setNameUser,
  changeError,
  fetchRoadmapsMeUser,
  fetchUpdateImageUser,
  fetchUpdateDetailsUser,
})(Me);
