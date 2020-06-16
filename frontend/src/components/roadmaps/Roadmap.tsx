import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppType } from '../../store';

import {
  RoadmapType,
  SectionType,
  OptionalSectionType,
} from '../../store/roadmaps/types';

import {
  fetchRoadmap,
  fetchUpdateRoadmap,
  fetchDeleteRoadmap,
  fetchSubscribeRoadmap,
  changeCurrentPrivateRoadmap,
  changeCurrentTitleRoadmap,
  changeCurrentDescriptionRoadmap,
  changeSectionTitle,
  changeSectionText,
  changeSectionChange,
  fetchCreateSection,
  fetchUpdateSection,
  fetchDeleteSection,
} from '../../store/roadmaps/actions';

import { changeWindow } from '../../store/window/actions';

import { Section } from './Section';

interface RoadmapProps extends RoadmapType<SectionType> {
  match: { params: { id: string } };
  _idUser: string;
  privateRM: string;
  role: string;
  fetchRoadmap: typeof fetchRoadmap;
  fetchUpdateRoadmap: typeof fetchUpdateRoadmap;
  fetchDeleteRoadmap: typeof fetchDeleteRoadmap;
  fetchSubscribeRoadmap: typeof fetchSubscribeRoadmap;
  changeCurrentPrivateRoadmap: typeof changeCurrentPrivateRoadmap;
  changeCurrentTitleRoadmap: typeof changeCurrentTitleRoadmap;
  changeCurrentDescriptionRoadmap: typeof changeCurrentDescriptionRoadmap;
  changeSectionTitle: typeof changeSectionTitle;
  changeSectionText: typeof changeSectionText;
  changeSectionChange: typeof changeSectionChange;
  fetchCreateSection: typeof fetchCreateSection;
  fetchUpdateSection: typeof fetchUpdateSection;
  fetchDeleteSection: typeof fetchDeleteSection;
  changeWindow: typeof changeWindow;
}

class Roadmap extends Component<RoadmapProps> {
  constructor(props: RoadmapProps) {
    super(props);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangePrivate = this.handleChangePrivate.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleCreateSection = this.handleCreateSection.bind(this);
    this.handleChangeSectionTitle = this.handleChangeSectionTitle.bind(this);
    this.handleChangeSectionText = this.handleChangeSectionText.bind(this);
    this.handleDeleteSection = this.handleDeleteSection.bind(this);
  }

  componentDidMount() {
    this.props.fetchRoadmap(this.props.match.params.id);
  }

  handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeCurrentTitleRoadmap(e.target.value.slice(0, 50));
  }

  handleChangePrivate(e: React.ChangeEvent<HTMLSelectElement>) {
    this.props.changeCurrentPrivateRoadmap(
      e.target.value as 'private' | 'public'
    );
  }

  handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeCurrentDescriptionRoadmap(e.target.value.slice(0, 1000));
  }

  handleCreateSection() {
    this.props.fetchCreateSection(this.props._id, {
      title: 'Empty',
      text: 'Empty',
    });
  }

  handleChangeSectionTitle(
    sectionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    this.props.changeSectionTitle(sectionId, e.target.value.slice(0, 250));
  }

  handleChangeSectionText(
    sectionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    this.props.changeSectionText(sectionId, e.target.value.slice(0, 5000));
  }

  handleUpdateSection(sectionId: string, obj: OptionalSectionType) {
    this.props.fetchUpdateSection(this.props._id, sectionId, obj);
  }

  handleDeleteSection(sectionId: string) {
    this.props.fetchDeleteSection(this.props._id, sectionId);
  }

  render() {
    const {
      privateRM,
      sections,
      subscribers,
      _id,
      title,
      description,
      owner,
      slug,
      _idUser,
      role,
    } = this.props;

    const listSections = sections.map(({ _id, title, text, change }, index) => (
      <Section
        auth={_idUser === owner || role === 'admin'}
        title={title}
        text={text}
        change={change}
        handleChangeSectionTitle={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!change) {
            this.props.changeSectionChange(_id);
          }
          this.handleChangeSectionTitle(_id, e);
        }}
        handleChangeSectionText={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!change) {
            this.props.changeSectionChange(_id);
          }
          this.handleChangeSectionText(_id, e);
        }}
        handleUpdateSection={() => {
          this.handleUpdateSection(_id, { title, text });
        }}
        handleDeleteSection={() =>
          this.props.changeWindow({
            title: 'Are you sure?',
            text: 'Delete section',
            methods: [() => this.handleDeleteSection(_id)],
            answers: ['OK'],
          })
        }
        key={index}
      />
    ));

    return (
      <div className="roadmap">
        {_idUser === owner || role === 'admin' ? (
          <input
            value={title}
            className="title"
            type="text"
            name="title"
            placeholder="Title"
            autoComplete="off"
            onChange={this.handleChangeTitle}
          />
        ) : (
          <h1>{title}</h1>
        )}
        {_idUser === owner ||
          (role === 'admin' && (
            <button
              onClick={() =>
                this.props.fetchUpdateRoadmap(_id, {
                  title,
                  description,
                  private: privateRM,
                })
              }
            >
              Save
            </button>
          ))}
        {(_idUser === owner || role === 'admin') && (
          <button
            onClick={() =>
              this.props.changeWindow({
                title: 'Are you sure?',
                text: 'Delete roadmap',
                methods: [() => this.props.fetchDeleteRoadmap(_id)],
                answers: ['OK'],
              })
            }
          >
            Delete
          </button>
        )}
        {_idUser === owner || role === 'admin' ? (
          <select onChange={this.handleChangePrivate} value={privateRM}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        ) : (
          <p>private: {privateRM}</p>
        )}
        {_idUser === owner || role === 'admin' ? (
          <input
            value={description}
            className="description"
            type="text"
            name="description"
            placeholder="Description"
            autoComplete="off"
            onChange={this.handleChangeDescription}
          />
        ) : (
          <p>{description}</p>
        )}
        <p>Owner: {owner}</p>
        <p>Count of subscribers: {subscribers.length}</p>
        {_idUser && _idUser !== owner && (
          <button onClick={() => this.props.fetchSubscribeRoadmap(_id)}>
            {subscribers.indexOf(_idUser) === -1 ? 'Subscribe' : 'Unsubscribe'}
          </button>
        )}
        <div className="sections">
          {sections.length < 20 && (_idUser === owner || role === 'admin') && (
            <button onClick={this.handleCreateSection}>New sections</button>
          )}
          {listSections}
        </div>
      </div>
    );
  }
}

const matStateToProps = (state: AppType) => {
  const {
    private: privateRM,
    sections,
    subscribers,
    _id,
    title,
    description,
    owner,
    slug,
  } = state.roadmaps.current;
  const { _id: _idUser, role } = state.user;
  return {
    privateRM,
    sections,
    subscribers,
    _id,
    title,
    description,
    owner,
    slug,
    _idUser,
    role,
  };
};

export default connect(matStateToProps, {
  fetchRoadmap,
  fetchUpdateRoadmap,
  fetchDeleteRoadmap,
  fetchSubscribeRoadmap,
  changeCurrentPrivateRoadmap,
  changeCurrentTitleRoadmap,
  changeCurrentDescriptionRoadmap,
  changeSectionTitle,
  changeSectionText,
  changeSectionChange,
  fetchCreateSection,
  fetchUpdateSection,
  fetchDeleteSection,
  changeWindow,
})(Roadmap);
