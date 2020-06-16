import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppType } from '../../store';

import { RoadmapType, SectionType } from '../../store/roadmaps/types';

import { fetchRoadmapsMeUser } from '../../store/user/actions';
import {
  fetchCreateRoapmaps,
  changeCreateTitleRoadmap,
  changeCreatePrivateRoadmap,
  changeCreateDescriptionRoadmap,
} from '../../store/roadmaps/actions';
import { changeWindow } from '../../store/window/actions';

interface CreateProps {
  _id: string;
  create: RoadmapType<SectionType>;
  roadmaps: RoadmapType<string>[];
  fetchRoadmapsMeUser: typeof fetchRoadmapsMeUser;
  fetchCreateRoapmaps: typeof fetchCreateRoapmaps;
  changeCreateTitleRoadmap: typeof changeCreateTitleRoadmap;
  changeCreatePrivateRoadmap: typeof changeCreatePrivateRoadmap;
  changeCreateDescriptionRoadmap: typeof changeCreateDescriptionRoadmap;
  changeWindow: typeof changeWindow;
}

class Create extends Component<CreateProps> {
  componentDidMount() {
    this.props.fetchRoadmapsMeUser(this.props._id);
  }

  render() {
    if (this.props.roadmaps.length === 3) {
      return <h1>Roadmap limit 3</h1>;
    }

    const {
      private: privateRM,
      sections,
      title,
      description,
    } = this.props.create;

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.props.changeCreateTitleRoadmap(e.target.value.slice(0, 50));
    };

    const handleChangePrivate = (e: React.ChangeEvent<HTMLSelectElement>) => {
      this.props.changeCreatePrivateRoadmap(
        e.target.value as 'private' | 'public'
      );
    };

    const handleChangeDescription = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      this.props.changeCreateDescriptionRoadmap(e.target.value.slice(0, 1000));
    };

    return (
      <div className="roadmap">
        <input
          value={title}
          className="title"
          type="text"
          name="title"
          placeholder="Title"
          autoComplete="off"
          onChange={handleChangeTitle}
        />

        <select onChange={handleChangePrivate} value={privateRM}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <input
          value={description}
          className="description"
          type="text"
          name="description"
          placeholder="Description"
          autoComplete="off"
          onChange={handleChangeDescription}
        />

        <button
          onClick={() =>
            this.props.changeWindow({
              title: 'Are you sure?',
              text: 'Create roadmap',
              methods: [
                () =>
                  this.props.fetchCreateRoapmaps({
                    title,
                    description,
                    private: privateRM,
                    sections,
                  }),
              ],
              answers: ['Yes'],
            })
          }
        >
          Create
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppType) => {
  const { create } = state.roadmaps;
  const { _id, roadmaps } = state.user;
  return { create, _id, roadmaps };
};

export default connect(mapStateToProps, {
  fetchRoadmapsMeUser,
  fetchCreateRoapmaps,
  changeCreateTitleRoadmap,
  changeCreatePrivateRoadmap,
  changeCreateDescriptionRoadmap,
  changeWindow,
})(Create);
