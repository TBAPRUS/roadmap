import {
  I_CHANGE_LOGIN_EMAIL,
  I_CHANGE_LOGIN_PASSWORD,
  IChangeLoginEmail,
  IChangeLoginPassword,
} from './types';

export function IchangeLoginEmail(email: string): IChangeLoginEmail {
  return {
    type: I_CHANGE_LOGIN_EMAIL,
    email,
  };
}

export function IchangeLoginPassword(password: string): IChangeLoginPassword {
  return {
    type: I_CHANGE_LOGIN_PASSWORD,
    password,
  };
}
