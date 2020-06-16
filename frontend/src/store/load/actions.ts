import { ChangeLoad, CHANGE_LOAD } from './types';

export function changeLoad(): ChangeLoad {
  return {
    type: CHANGE_LOAD,
  };
}
