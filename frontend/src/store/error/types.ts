export type ErrorType = string;

export const CHANGE_ERROR = 'CHANGE_ERROR';

export interface ChangeError {
  type: typeof CHANGE_ERROR;
  error: string;
}

export type ErrorActionType = ChangeError;
