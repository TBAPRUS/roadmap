import {
  IRegisterType,
  IRegisterActionType,
  I_CHANGE_REGISTER_EMAIL,
  I_CHANGE_REGISTER_NAME,
  I_CHANGE_REGISTER_PASSWORD,
} from './types';

const initState: IRegisterType = {
  email: '',
  name: '',
  password: '',
};

export const register = (
  state = initState,
  action: IRegisterActionType
): IRegisterType => {
  switch (action.type) {
    case I_CHANGE_REGISTER_EMAIL:
      return { ...state, email: action.email };
    case I_CHANGE_REGISTER_NAME:
      return { ...state, name: action.name };
    case I_CHANGE_REGISTER_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
};
