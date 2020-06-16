export const I_CHANGE_REGISTER_EMAIL = 'I_CHANGE_REGISTER_EMAIL';
export const I_CHANGE_REGISTER_NAME = 'I_CHANGE_REGISTER_NAME';
export const I_CHANGE_REGISTER_PASSWORD = 'I_CHANGE_REGISTER_PASSWORD';

export type IRegisterType = {
  email: string;
  name: string;
  password: string;
};

export interface IChangeRegisterEmail {
  type: typeof I_CHANGE_REGISTER_EMAIL;
  email: string;
}

export interface IChangeRegisterName {
  type: typeof I_CHANGE_REGISTER_NAME;
  name: string;
}

export interface IChangeRegisterPassword {
  type: typeof I_CHANGE_REGISTER_PASSWORD;
  password: string;
}

export type IRegisterActionType =
  | IChangeRegisterEmail
  | IChangeRegisterName
  | IChangeRegisterPassword;
