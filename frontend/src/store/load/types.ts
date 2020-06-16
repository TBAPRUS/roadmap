export type LoadType = boolean;

export const CHANGE_LOAD = 'CHANGE_LOAD';

export interface ChangeLoad {
  type: typeof CHANGE_LOAD;
}

export type LoadActionType = ChangeLoad;
