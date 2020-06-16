import {
  ILoginType,
  ILoginActionType,
  I_CHANGE_LOGIN_EMAIL,
  I_CHANGE_LOGIN_PASSWORD,
} from './types';

const initState: ILoginType = { email: '', password: '' };

export const login = (
  state = initState,
  action: ILoginActionType
): ILoginType => {
  switch (action.type) {
    case I_CHANGE_LOGIN_EMAIL:
      return { ...state, email: action.email };
    case I_CHANGE_LOGIN_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
};
