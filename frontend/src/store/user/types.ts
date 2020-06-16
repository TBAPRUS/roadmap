import { RoadmapType } from '../roadmaps/types';

export const UPDATE_USER = 'SET_USER';
export const UPDATE_ROADMAPS_USER = 'UPDATE_ROADMAPS_USER';
export const UPDATE_IMAGE_USER = 'UPDATE_IMAGE_USER';
export const RESET_USER = 'RESET_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const SET_CHANGE = 'SET_CHANGE';
export const SET_NAME_USER = 'SET_NAME_USER';

export interface UpdateUser {
  type: typeof UPDATE_USER;
  user: UserType;
}

export interface UpdateRoadmapsUser {
  type: typeof UPDATE_ROADMAPS_USER;
  roadmaps: RoadmapType<string>[];
}

export interface UpdateImageUser {
  type: typeof UPDATE_IMAGE_USER;
  image: Image;
}

export interface ResetUser {
  type: typeof RESET_USER;
}

export interface ReceiveUser {
  type: typeof RECEIVE_USER;
}

export interface SetChange {
  type: typeof SET_CHANGE;
  change: boolean;
}

export interface SetNameUser {
  type: typeof SET_NAME_USER;
  name: string;
}

export type Image = string;

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  receive: boolean;
  change: boolean;
  roadmaps?: RoadmapType<string>[];
};

export type UserActionType =
  | UpdateUser
  | UpdateRoadmapsUser
  | ResetUser
  | UpdateImageUser
  | ReceiveUser
  | SetChange
  | SetNameUser;
