import {
  UsersType,
  UsersActionType,
  SET_USERS,
  SET_CURRENT_USER,
  SET_CURRENT_IMAGE_USER,
  SET_COUNT_USERS,
  SET_PAGINATION_USERS,
  UPDATE_USERS,
  CHANGE_CURRENT_ROLE_USER,
  CHANGE_CURRENT_EMAIL_USER,
  CHANGE_CURRENT_NAME_USER,
  CHANGE_CURRENT_PASSWORD_USER,
  CHANGE_CREATE_ROLE_USER,
  CHANGE_CREATE_EMAIL_USER,
  CHANGE_CREATE_NAME_USER,
  CHANGE_CREATE_PASSWORD_USER,
} from './types';

const initState: UsersType = {
  list: [],
  current: {
    _id: '',
    role: '',
    image: '',
    name: '',
    email: '',
    password: '',
    createdAt: new Date(),
  },
  create: {
    role: '',
    name: '',
    email: '',
    password: '',
  },
  count: 0,
  pagination: {},
};

export const users = (
  state = initState,
  action: UsersActionType
): UsersType => {
  switch (action.type) {
    case UPDATE_USERS:
      return { ...state, ...action.obj };
    case SET_USERS:
      return { ...state, list: action.users };
    case SET_CURRENT_USER:
      return { ...state, current: action.user };
    case SET_CURRENT_IMAGE_USER:
      return {
        ...state,
        current: { ...state.current, image: action.image + `?${Date.now()}` },
      };
    case SET_COUNT_USERS:
      return { ...state, count: action.count };
    case SET_PAGINATION_USERS:
      return { ...state, pagination: action.pagination };
    case CHANGE_CURRENT_ROLE_USER:
      return { ...state, current: { ...state.current, role: action.role } };
    case CHANGE_CURRENT_EMAIL_USER:
      return { ...state, current: { ...state.current, email: action.email } };
    case CHANGE_CURRENT_NAME_USER:
      return { ...state, current: { ...state.current, name: action.name } };
    case CHANGE_CURRENT_PASSWORD_USER:
      return {
        ...state,
        current: { ...state.current, password: action.password },
      };
    case CHANGE_CREATE_ROLE_USER:
      return { ...state, create: { ...state.create, role: action.role } };
    case CHANGE_CREATE_EMAIL_USER:
      return { ...state, create: { ...state.create, email: action.email } };
    case CHANGE_CREATE_NAME_USER:
      return { ...state, create: { ...state.create, name: action.name } };
    case CHANGE_CREATE_PASSWORD_USER:
      return {
        ...state,
        create: { ...state.create, password: action.password },
      };
    default:
      return state;
  }
};
