import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppType } from '../';

export const CHANGE_WINDOW = 'CHANGE_WINDOW';
export const RESET_WINDOW = 'RESET_WINDOW';

export type WindowType = {
  title: string;
  text?: string;
  methods?: (() => Action)[] | ThunkAction<void, AppType, null, Action>[];
  answers?: string[];
};

export interface ChangeWindow {
  type: typeof CHANGE_WINDOW;
  window: WindowType;
}

export interface ResetWindow {
  type: typeof RESET_WINDOW;
}

export type WindowActionType = ChangeWindow | ResetWindow;
