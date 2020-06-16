import { IPagination } from '../pagination/interfaces';

export const SET_USERS = 'SET_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_IMAGE_USER = 'SET_CURRENT_IMAGE_USER';
export const SET_COUNT_USERS = 'SET_COUNT_USERS';
export const SET_PAGINATION_USERS = 'SET_PAGINATION_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';
export const CHANGE_CURRENT_ROLE_USER = 'CHANGE_CURRENT_ROLE_USER';
export const CHANGE_CURRENT_EMAIL_USER = 'CHANGE_CURRENT_EMAIL_USER';
export const CHANGE_CURRENT_NAME_USER = 'CHANGE_CURRENT_NAME_USER';
export const CHANGE_CURRENT_PASSWORD_USER = 'CHANGE_CURRENT_PASSWORD_USER';
export const CHANGE_CREATE_ROLE_USER = 'CHANGE_CREATE_ROLE_USER';
export const CHANGE_CREATE_EMAIL_USER = 'CHANGE_CREATE_EMAIL_USER';
export const CHANGE_CREATE_NAME_USER = 'CHANGE_CREATE_NAME_USER';
export const CHANGE_CREATE_PASSWORD_USER = 'CHANGE_CREATE_PASSWORD_USER';

export type UsersType = {
  create: { role: string; name: string; email: string; password: string };
  list: UserType[];
  current: UserType;
  count: number;
  pagination: IPagination;
};

export type UsersTypeOptional = Partial<UsersType>;

export type UserType = {
  _id: string;
  role: string;
  image: string;
  name: string;
  email: string;
  createdAt: Date;
  password: string;
};

export interface UpdateUsers {
  type: typeof UPDATE_USERS;
  obj: UsersTypeOptional;
}

export interface SetUsers {
  type: typeof SET_USERS;
  users: UserType[];
}

export interface SetCurrentUser {
  type: typeof SET_CURRENT_USER;
  user: UserType;
}

export interface SetCurrentImageUser {
  type: typeof SET_CURRENT_IMAGE_USER;
  image: string;
}

export interface SetCountUsers {
  type: typeof SET_COUNT_USERS;
  count: number;
}

export interface SetPaginationUsers {
  type: typeof SET_PAGINATION_USERS;
  pagination: IPagination;
}

export interface ChangeCurrentRoleUser {
  type: typeof CHANGE_CURRENT_ROLE_USER;
  role: string;
}

export interface ChangeCurrentEmailUser {
  type: typeof CHANGE_CURRENT_EMAIL_USER;
  email: string;
}

export interface ChangeCurrentNameUser {
  type: typeof CHANGE_CURRENT_NAME_USER;
  name: string;
}

export interface ChangeCurrentPasswordUser {
  type: typeof CHANGE_CURRENT_PASSWORD_USER;
  password: string;
}

export interface ChangeCreateRoleUser {
  type: typeof CHANGE_CREATE_ROLE_USER;
  role: string;
}

export interface ChangeCreateEmailUser {
  type: typeof CHANGE_CREATE_EMAIL_USER;
  email: string;
}

export interface ChangeCreateNameUser {
  type: typeof CHANGE_CREATE_NAME_USER;
  name: string;
}

export interface ChangeCreatePasswordUser {
  type: typeof CHANGE_CREATE_PASSWORD_USER;
  password: string;
}

export type UsersActionType =
  | SetUsers
  | SetCountUsers
  | SetPaginationUsers
  | UpdateUsers
  | SetCurrentUser
  | SetCurrentImageUser
  | ChangeCurrentRoleUser
  | ChangeCurrentEmailUser
  | ChangeCurrentNameUser
  | ChangeCurrentPasswordUser
  | ChangeCreateRoleUser
  | ChangeCreateEmailUser
  | ChangeCreateNameUser
  | ChangeCreatePasswordUser;
