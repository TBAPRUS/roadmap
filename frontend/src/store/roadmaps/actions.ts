import fetch from 'cross-fetch';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppType } from '../';

import {
  OptionalSectionType,
  ReduceRoadmapsTypeOptional,
  RoadmapType,
  SectionType,
  UpdateReduceRoadmaps,
  SetCurrentRoadmap,
  ChangeCurrentPrivateRoadmap,
  ChangeCurrentDescriptionRoadmap,
  ChangeCurrentTitleRoadmap,
  ChangeCreateTitleRoadmap,
  ChangeCreatePrivateRoadmap,
  ChangeCreateDescriptionRoadmap,
  SetListRoadmaps,
  SetCountRoadmaps,
  SetPaginationRoadmaps,
  ChangeSectionTitle,
  ChangeSectionText,
  ChangeSectionChange,
  UpdateSection,
  DeleteSection,
  UPDATE_REDUCE_ROADMAPS,
  SET_CURRENT_ROADMAP,
  CHANGE_CURRENT_PRIVATE_ROADMAP,
  CHANGE_CURRENT_DESCRIPTION_ROADMAP,
  CHANGE_CURRENT_TITLE_ROADMAP,
  CHANGE_CREATE_TITLE_ROADMAP,
  CHANGE_CREATE_PRIVATE_ROADMAP,
  CHANGE_CREATE_DESCRIPTION_ROADMAP,
  SET_LIST_ROADMAPS,
  SET_COUNT_ROADMAPS,
  SET_PAGINATION_ROADMAPS,
  CHANGE_SECTION_TITLE,
  CHANGE_SECTION_TEXT,
  CHANGE_SECTION_CHANGE,
  UPDATE_SECTION,
  DELETE_SECTION,
} from './types';

import { IPagination } from '../pagination/interfaces';

import { changeLoad } from '../load/actions';
import { changeError } from '../error/actions';
import { changeWindow } from '../window/actions';
import { Section } from '../../components/roadmaps/Section';

export function setCurrentRoadmap(
  current: RoadmapType<SectionType>
): SetCurrentRoadmap {
  return { type: SET_CURRENT_ROADMAP, current };
}

export function changeCurrentPrivateRoadmap(
  privateRM: 'private' | 'public'
): ChangeCurrentPrivateRoadmap {
  return { type: CHANGE_CURRENT_PRIVATE_ROADMAP, private: privateRM };
}

export function changeCurrentDescriptionRoadmap(
  description: string
): ChangeCurrentDescriptionRoadmap {
  return { type: CHANGE_CURRENT_DESCRIPTION_ROADMAP, description };
}

export function changeCurrentTitleRoadmap(
  title: string
): ChangeCurrentTitleRoadmap {
  return { type: CHANGE_CURRENT_TITLE_ROADMAP, title };
}

export function changeCreateTitleRoadmap(
  title: string
): ChangeCreateTitleRoadmap {
  return { type: CHANGE_CREATE_TITLE_ROADMAP, title };
}

export function changeCreatePrivateRoadmap(
  privateRM: 'private' | 'public'
): ChangeCreatePrivateRoadmap {
  return { type: CHANGE_CREATE_PRIVATE_ROADMAP, private: privateRM };
}

export function changeCreateDescriptionRoadmap(
  description: string
): ChangeCreateDescriptionRoadmap {
  return { type: CHANGE_CREATE_DESCRIPTION_ROADMAP, description };
}

export function setListRoadmaps(list: RoadmapType<string>[]): SetListRoadmaps {
  return { type: SET_LIST_ROADMAPS, list };
}

export function setCountRoadmaps(count: number): SetCountRoadmaps {
  return { type: SET_COUNT_ROADMAPS, count };
}

export function setPaginationRoadmaps(
  pagination: IPagination
): SetPaginationRoadmaps {
  return { type: SET_PAGINATION_ROADMAPS, pagination };
}

export function updateReduceRoadmaps(
  obj: ReduceRoadmapsTypeOptional
): UpdateReduceRoadmaps {
  return { type: UPDATE_REDUCE_ROADMAPS, obj };
}

export function updateSection(section: OptionalSectionType): UpdateSection {
  return { type: UPDATE_SECTION, section };
}

export function deleteSection(id: string): DeleteSection {
  return { type: DELETE_SECTION, id };
}

export function changeSectionTitle(
  id: string,
  title: string
): ChangeSectionTitle {
  return { type: CHANGE_SECTION_TITLE, id, title };
}

export function changeSectionText(id: string, text: string): ChangeSectionText {
  return { type: CHANGE_SECTION_TEXT, id, text };
}

export function changeSectionChange(id: string): ChangeSectionChange {
  return { type: CHANGE_SECTION_CHANGE, id };
}

interface IResult {
  success: boolean;
  error?: string;
}

interface IResultGetRoadmaps extends IResult {
  count: number;
  data: RoadmapType<string>[];
  pagination: IPagination;
}

interface IResultGetRoadmap extends IResult {
  data: RoadmapType<SectionType>;
}

interface IResultGetSection extends IResult {
  data: SectionType;
}

export const fetchRoadmaps = (
  query: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  let url = '/api/v1/roadmaps/';
  if (query) {
    url += query;
  }
  return fetch(url)
    .then((response: Response) => response.json())
    .then((result: IResultGetRoadmaps) => {
      if (result.success) {
        const toSave = {
          list: result.data,
          count: result.count,
          pagination: result.pagination,
        };
        dispatch(updateReduceRoadmaps(toSave));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchRoadmap = (
  slug: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/roadmaps/${slug}`)
    .then((response: Response) => response.json())
    .then((result: IResultGetRoadmap) => {
      if (result.success) {
        result.data.sections.forEach((section) => ({
          ...section,
          change: false,
        }));
        dispatch(setCurrentRoadmap(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchCreateRoapmaps = (obj: {
  title: string;
  description: string;
  private: string;
  sections?: SectionType[];
}): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/roadmaps`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result: IResultGetRoadmap) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        result.data.sections.forEach((section) => ({
          ...section,
          change: false,
        }));
        dispatch(setCurrentRoadmap(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchUpdateRoadmap = (
  id: string,
  obj: { title: string; description: string; private: string }
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/roadmaps/${id}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result: IResultGetRoadmap) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        result.data.sections.forEach((section) => ({
          ...section,
          change: false,
        }));
        dispatch(setCurrentRoadmap(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchDeleteRoadmap = (
  id: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/roadmaps/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((result: IResultGetRoadmap) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        dispatch(
          setCurrentRoadmap({
            private: 'public',
            sections: [],
            subscribers: [],
            _id: '',
            title: '',
            description: '',
            owner: '',
            slug: '',
          })
        );
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchSubscribeRoadmap = (
  id: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/roadmaps/${id}/subscribe`)
    .then((response) => response.json())
    .then((result: IResultGetRoadmap) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        result.data.sections.forEach((section) => ({
          ...section,
          change: false,
        }));
        dispatch(setCurrentRoadmap(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchCreateSection = (
  roadmapId: string,
  obj: { title: string; text: string }
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/roadmaps/${roadmapId}/sections`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result: IResultGetRoadmap) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        result.data.sections.forEach((section) => ({
          ...section,
          change: false,
        }));
        dispatch(setCurrentRoadmap(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchUpdateSection = (
  roadmapId: string,
  sectionId: string,
  obj: { title?: string; text?: string }
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/roadmaps/${roadmapId}/sections/${sectionId}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result: IResultGetSection) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        result.data.change = false;
        dispatch(updateSection(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchDeleteSection = (
  roadmapId: string,
  sectionId: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/roadmaps/${roadmapId}/sections/${sectionId}`)
    .then((response) => response.json())
    .then((result: IResultGetSection) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        dispatch(deleteSection(sectionId));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};
