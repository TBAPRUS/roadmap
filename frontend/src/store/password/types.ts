export const CHANGE_CURRENT_PASSWORD = 'CHANGE_CURRENT_PASSWORD';
export const CHANGE_NEW_PASSWORD = 'CHANGE_NEW_PASSWORD';

export type PasswordType = {
  currentPassword: string;
  newPassword: string;
};

export interface ChangeCurrentPassword {
  type: typeof CHANGE_CURRENT_PASSWORD;
  currentPassword: string;
}

export interface ChangeNewPassword {
  type: typeof CHANGE_NEW_PASSWORD;
  newPassword: string;
}

export type PasswordActionType = ChangeCurrentPassword | ChangeNewPassword;
