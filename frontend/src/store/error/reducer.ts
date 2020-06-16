import { ErrorType, ErrorActionType, CHANGE_ERROR } from './types';

export const error = (state = '', action: ErrorActionType): ErrorType => {
  switch (action.type) {
    case CHANGE_ERROR:
      return action.error;
    default:
      return state;
  }
};
