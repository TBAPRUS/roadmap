import {
  PasswordType,
  PasswordActionType,
  CHANGE_CURRENT_PASSWORD,
  CHANGE_NEW_PASSWORD,
} from './types';

const initState: PasswordType = {
  currentPassword: '',
  newPassword: '',
};

export const password = (
  state = initState,
  action: PasswordActionType
): PasswordType => {
  switch (action.type) {
    case CHANGE_CURRENT_PASSWORD:
      return { ...state, currentPassword: action.currentPassword };
    case CHANGE_NEW_PASSWORD:
      return { ...state, newPassword: action.newPassword };
    default:
      return state;
  }
};
