import fetch from 'cross-fetch';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppType } from '../';

import {
  UsersType,
  UsersTypeOptional,
  UserType,
  UPDATE_USERS,
  UpdateUsers,
  SET_USERS,
  SetUsers,
  SET_CURRENT_USER,
  SetCurrentUser,
  SET_CURRENT_IMAGE_USER,
  SetCurrentImageUser,
  SET_COUNT_USERS,
  SetCountUsers,
  SET_PAGINATION_USERS,
  SetPaginationUsers,
  CHANGE_CURRENT_EMAIL_USER,
  ChangeCurrentEmailUser,
  CHANGE_CURRENT_NAME_USER,
  ChangeCurrentNameUser,
  CHANGE_CURRENT_PASSWORD_USER,
  ChangeCurrentPasswordUser,
  CHANGE_CURRENT_ROLE_USER,
  ChangeCurrentRoleUser,
  CHANGE_CREATE_EMAIL_USER,
  ChangeCreateEmailUser,
  CHANGE_CREATE_NAME_USER,
  ChangeCreateNameUser,
  CHANGE_CREATE_PASSWORD_USER,
  ChangeCreatePasswordUser,
  CHANGE_CREATE_ROLE_USER,
  ChangeCreateRoleUser,
} from './types';

import { changeLoad } from '../load/actions';
import { changeError } from '../error/actions';
import { changeWindow } from '../window/actions';

import { IPagination } from '../pagination/interfaces';

export function updateUsers(obj: UsersTypeOptional): UpdateUsers {
  return { type: UPDATE_USERS, obj };
}

export function setUsers(users: UserType[]): SetUsers {
  return { type: SET_USERS, users };
}

export function setCurrentUser(user: UserType): SetCurrentUser {
  return { type: SET_CURRENT_USER, user };
}

export function setCurrentImageUser(image: string): SetCurrentImageUser {
  return { type: SET_CURRENT_IMAGE_USER, image };
}

export function setCountUsers(count: number): SetCountUsers {
  return { type: SET_COUNT_USERS, count };
}

export function changeCurrentRoleUser(role: string): ChangeCurrentRoleUser {
  return { type: CHANGE_CURRENT_ROLE_USER, role };
}

export function changeCurrentEmailUser(email: string): ChangeCurrentEmailUser {
  return { type: CHANGE_CURRENT_EMAIL_USER, email };
}

export function changeCurrentNameUser(name: string): ChangeCurrentNameUser {
  return { type: CHANGE_CURRENT_NAME_USER, name };
}

export function changeCurrentPasswordUser(
  password: string
): ChangeCurrentPasswordUser {
  return { type: CHANGE_CURRENT_PASSWORD_USER, password };
}

export function changeCreateRoleUser(role: string): ChangeCreateRoleUser {
  return { type: CHANGE_CREATE_ROLE_USER, role };
}

export function changeCreateEmailUser(email: string): ChangeCreateEmailUser {
  return { type: CHANGE_CREATE_EMAIL_USER, email };
}

export function changeCreateNameUser(name: string): ChangeCreateNameUser {
  return { type: CHANGE_CREATE_NAME_USER, name };
}

export function changeCreatePasswordUser(
  password: string
): ChangeCreatePasswordUser {
  return { type: CHANGE_CREATE_PASSWORD_USER, password };
}

export function setPaginationUsers(
  pagination: IPagination
): SetPaginationUsers {
  return { type: SET_PAGINATION_USERS, pagination };
}

interface IResult<T> {
  success: boolean;
  error?: string;
  data?: T;
}

interface IResultGetUsers extends IResult<UserType[] & { __v: number }> {
  count: number;
  pagination: IPagination;
}

interface IResultGetUser extends IResult<UserType & { __v: number }> {}

interface IResultChangeImageUser extends IResult<string> {}

export const fetchUsers = (
  query: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  let url = '/api/v1/users/';
  if (query) {
    url += query;
  }
  return fetch(url)
    .then((response: Response) => response.json())
    .then((result: IResultGetUsers) => {
      if (result.success) {
        delete result.data.__v;
        const toSave = {
          list: result.data,
          count: result.count,
          pagination: result.pagination,
        };
        dispatch(updateUsers(toSave));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchUser = (
  id: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/users/${id}`)
    .then((response: Response) => response.json())
    .then((result: IResultGetUser) => {
      if (result.success) {
        delete result.data.__v;
        result.data.password = '';
        dispatch(setCurrentUser(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchDeleteUser = (
  id: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/users/${id}`, { method: 'DELETE' })
    .then((response: Response) => response.json())
    .then((result: IResult<{}>) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        dispatch(
          setCurrentUser({
            _id: '',
            role: '',
            image: '',
            name: '',
            email: '',
            password: '',
            createdAt: new Date(),
          })
        );
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchUpdateImageUser = (
  id: string,
  obj: FormData
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/users/${id}/auth/updateimage`, {
    method: 'PUT',
    body: obj,
  })
    .then((response: Response) => response.json())
    .then((result: IResultChangeImageUser) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        dispatch(setCurrentImageUser(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchUdpateUser = (
  id: string,
  obj: { email?: string; name?: string; password?: string }
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response: Response) => response.json())
    .then((result: IResultGetUser) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        delete result.data.__v;
        result.data.password = '';
        dispatch(setCurrentUser(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchCreateUser = (obj: {
  role: string;
  email: string;
  name: string;
  password: string;
}): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/users`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response: Response) => response.json())
    .then((result: IResultGetUser) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
        delete result.data.__v;
        dispatch(setCurrentUser(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};
