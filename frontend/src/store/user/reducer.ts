import {
  UserType,
  UserActionType,
  UPDATE_USER,
  UPDATE_ROADMAPS_USER,
  RESET_USER,
  RECEIVE_USER,
  UPDATE_IMAGE_USER,
  SET_CHANGE,
  SET_NAME_USER,
} from './types';

const initState: UserType = {
  _id: '',
  name: '',
  email: '',
  role: '',
  roadmaps: [],
  image: '',
  receive: false,
  change: false,
};

export const user = (state = initState, action: UserActionType): UserType => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.user };
    case UPDATE_ROADMAPS_USER:
      return { ...state, roadmaps: action.roadmaps };
    case UPDATE_IMAGE_USER:
      return { ...state, image: action.image + `?${Date.now()}` };
    case RESET_USER:
      return {
        ...state,
        ...initState,
      };
    case RECEIVE_USER:
      return { ...state, receive: true };
    case SET_NAME_USER:
      return { ...state, name: action.name };
    case SET_CHANGE:
      return { ...state, change: action.change };
    default:
      return state;
  }
};
