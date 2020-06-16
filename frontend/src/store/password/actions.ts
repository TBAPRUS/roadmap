import {
  CHANGE_CURRENT_PASSWORD,
  CHANGE_NEW_PASSWORD,
  ChangeCurrentPassword,
  ChangeNewPassword,
} from './types';

export function changeCurrentPassword(
  currentPassword: string
): ChangeCurrentPassword {
  return {
    type: CHANGE_CURRENT_PASSWORD,
    currentPassword,
  };
}

export function changeNewPassword(newPassword: string): ChangeNewPassword {
  return {
    type: CHANGE_NEW_PASSWORD,
    newPassword,
  };
}
