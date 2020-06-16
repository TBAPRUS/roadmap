import fetch from 'cross-fetch';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppType } from '../index';

import {
  UserType,
  UpdateUser,
  UPDATE_USER,
  UpdateRoadmapsUser,
  UPDATE_ROADMAPS_USER,
  Image,
  UpdateImageUser,
  UPDATE_IMAGE_USER,
  ResetUser,
  RESET_USER,
  ReceiveUser,
  RECEIVE_USER,
  SetChange,
  SET_CHANGE,
  SetNameUser,
  SET_NAME_USER,
} from './types';

import { RoadmapType } from '../roadmaps/types';
import { PasswordType } from '../password/types';

import { changeLoad } from '../load/actions';
import { changeError } from '../error/actions';
import { changeWindow } from '../window/actions';

export function updateUser(user: UserType): UpdateUser {
  return { type: UPDATE_USER, user };
}

export function updateRoadmapsUser(
  roadmaps: RoadmapType<string>[]
): UpdateRoadmapsUser {
  return { type: UPDATE_ROADMAPS_USER, roadmaps };
}

export function updateImageUser(image: Image): UpdateImageUser {
  return { type: UPDATE_IMAGE_USER, image };
}

export function setNameUser(name: string): SetNameUser {
  return { type: SET_NAME_USER, name };
}

export function resetUser(): ResetUser {
  return { type: RESET_USER };
}

export function receiveUser(): ReceiveUser {
  return { type: RECEIVE_USER };
}

export function setChange(change: boolean): SetChange {
  return { type: SET_CHANGE, change };
}

interface IResult<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export const fetchRegisterUser = (obj: {
  email: string;
  name: string;
  password: string;
}): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response: Response) => response.json())
    .then((result: IResult<UserType>) => {
      if (result.success) {
        dispatch(fetchMeUser());
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchLoginUser = (obj: {
  email: string;
  password: string;
}): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response: Response) => response.json())
    .then((result: IResult<UserType>) => {
      if (result.success) {
        dispatch(fetchMeUser());
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchLogoutUser = (): ThunkAction<void, AppType, null, Action> => (
  dispatch
) => {
  dispatch(changeLoad());
  return fetch('/api/v1/auth/logout')
    .then((response: Response) => response.json())
    .then((result: IResult<UserType>) => {
      if (result.success) {
        dispatch(resetUser());
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchMeUser = (): ThunkAction<void, AppType, null, Action> => (
  dispatch
) => {
  dispatch(changeLoad());
  return fetch('/api/v1/auth/me')
    .then((response: Response) => response.json())
    .then((result: IResult<UserType>) => {
      if (result.success) {
        dispatch(updateUser(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(receiveUser());
      dispatch(changeLoad());
    });
};

export const fetchRoadmapsMeUser = (
  id: string
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/users/${id}/roadmaps`)
    .then((response: Response) => response.json())
    .then((result: IResult<RoadmapType<string>[]>) => {
      if (result.success) {
        dispatch(updateRoadmapsUser(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(receiveUser());
      dispatch(changeLoad());
    });
};

export const fetchUpdateDetailsUser = (obj: {
  name: string;
}): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/auth/updatedetails', {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response: Response) => response.json())
    .then((result: IResult<UserType>) => {
      if (result.success) {
        dispatch(updateUser(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchUpdatePasswordUser = (
  obj: PasswordType
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/auth/updatepassword', {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response: Response) => response.json())
    .then((result: IResult<null>) => {
      if (result.success) {
        dispatch(changeWindow({ title: 'Success' }));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};

export const fetchUpdateImageUser = (
  obj: FormData
): ThunkAction<void, AppType, null, Action> => (dispatch) => {
  dispatch(changeLoad());

  return fetch('/api/v1/auth/updateimage', {
    method: 'PUT',
    body: obj,
  })
    .then((response: Response) => response.json())
    .then((result: IResult<Image>) => {
      if (result.success) {
        dispatch(updateImageUser(result.data));
      } else {
        dispatch(changeError(result.error));
      }
      dispatch(changeLoad());
    });
};
