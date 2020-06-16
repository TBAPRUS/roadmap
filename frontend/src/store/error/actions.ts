import { ErrorType, ChangeError, CHANGE_ERROR } from './types';

export function changeError(error: ErrorType): ChangeError {
  return {
    type: CHANGE_ERROR,
    error,
  };
}
