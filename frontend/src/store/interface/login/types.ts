export const I_CHANGE_LOGIN_EMAIL = 'I_CHANGE_LOGIN_EMAIL';
export const I_CHANGE_LOGIN_PASSWORD = 'I_CHANGE_LOGIN_PASSWORD';

export interface IChangeLoginEmail {
  type: typeof I_CHANGE_LOGIN_EMAIL;
  email: string;
}

export interface IChangeLoginPassword {
  type: typeof I_CHANGE_LOGIN_PASSWORD;
  password: string;
}

export type ILoginType = {
  email: string;
  password: string;
};

export type ILoginActionType = IChangeLoginPassword | IChangeLoginEmail;
