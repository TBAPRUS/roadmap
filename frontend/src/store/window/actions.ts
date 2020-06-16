import {
  WindowType,
  CHANGE_WINDOW,
  RESET_WINDOW,
  ChangeWindow,
  ResetWindow,
} from './types';

export function changeWindow(window: WindowType): ChangeWindow {
  return {
    type: CHANGE_WINDOW,
    window,
  };
}

export function resetWindow(): ResetWindow {
  return {
    type: RESET_WINDOW,
  };
}
