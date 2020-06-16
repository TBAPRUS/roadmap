import {
  I_CHANGE_REGISTER_EMAIL,
  I_CHANGE_REGISTER_NAME,
  I_CHANGE_REGISTER_PASSWORD,
  IChangeRegisterEmail,
  IChangeRegisterName,
  IChangeRegisterPassword,
} from './types';

export function IchangeRegisterEmail(email: string): IChangeRegisterEmail {
  return { type: I_CHANGE_REGISTER_EMAIL, email };
}

export function IchangeRegisterName(name: string): IChangeRegisterName {
  return { type: I_CHANGE_REGISTER_NAME, name };
}

export function IchangeRegisterPassword(
  password: string
): IChangeRegisterPassword {
  return { type: I_CHANGE_REGISTER_PASSWORD, password };
}
