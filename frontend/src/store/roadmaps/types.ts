import { IPagination } from '../pagination/interfaces';

export const SET_CURRENT_ROADMAP = 'SET_CURRENT_ROADMAP';
export const CHANGE_CURRENT_TITLE_ROADMAP = 'CHANGE_CURRENT_TITLE_ROADMAP';
export const SET_LIST_ROADMAPS = 'SET_LIST_ROADMAPS';
export const SET_COUNT_ROADMAPS = 'SET_COUNT_ROADMAPS';
export const SET_PAGINATION_ROADMAPS = 'SET_PAGINATION_ROADMAPS';
export const UPDATE_REDUCE_ROADMAPS = 'UPDATE_REDUCE_ROADMAPS';
export const CHANGE_CURRENT_PRIVATE_ROADMAP = 'CHANGE_CURRENT_PRIVATE_ROADMAP';
export const CHANGE_CURRENT_DESCRIPTION_ROADMAP =
  'CHANGE_CURRENT_DESCRIPTION_ROADMAP';
export const CHANGE_CREATE_TITLE_ROADMAP = 'CHANGE_CREATE_TITLE_ROADMAP';
export const CHANGE_CREATE_PRIVATE_ROADMAP = 'CHANGE_CREATE_PRIVATE_ROADMAP';
export const CHANGE_CREATE_DESCRIPTION_ROADMAP =
  'CHANGE_CREATE_DESCRIPTION_ROADMAP';
export const CHANGE_SECTION_TITLE = 'CHANGE_SECTION_TITLE';
export const CHANGE_SECTION_TEXT = 'CHANGE_SECTION_TEXT';
export const CHANGE_SECTION_CHANGE = 'CHANGE_SECTION_CHANGE';
export const UPDATE_SECTION = 'UPDATE_SECTION';
export const DELETE_SECTION = 'DELETE_SECTION';

export type ReduceRoadmapsType = {
  list: RoadmapType<string>[];
  current: RoadmapType<SectionType>;
  create: {
    private: 'private' | 'public';
    sections: SectionType[];
    title: string;
    description: string;
  };
  count: number;
  pagination: IPagination;
};

export type ReduceRoadmapsTypeOptional = Partial<ReduceRoadmapsType>;

export type RoadmapType<T> = {
  private: 'private' | 'public';
  sections: T[];
  subscribers: string[];
  _id: string;
  title: string;
  description: string;
  owner: string;
  slug: string;
};

export type SectionType = {
  _id: string;
  title: string;
  text: string;
  owner: string;
  roadmap: string;
  change: boolean;
};

export type OptionalSectionType = Partial<SectionType>;

export interface SetCurrentRoadmap {
  type: typeof SET_CURRENT_ROADMAP;
  current: RoadmapType<SectionType>;
}

export interface ChangeCurrentTitleRoadmap {
  type: typeof CHANGE_CURRENT_TITLE_ROADMAP;
  title: string;
}

export interface ChangeCurrentPrivateRoadmap {
  type: typeof CHANGE_CURRENT_PRIVATE_ROADMAP;
  private: 'private' | 'public';
}

export interface ChangeCurrentDescriptionRoadmap {
  type: typeof CHANGE_CURRENT_DESCRIPTION_ROADMAP;
  description: string;
}

export interface ChangeCreateTitleRoadmap {
  type: typeof CHANGE_CREATE_TITLE_ROADMAP;
  title: string;
}

export interface ChangeCreatePrivateRoadmap {
  type: typeof CHANGE_CREATE_PRIVATE_ROADMAP;
  private: 'private' | 'public';
}

export interface ChangeCreateDescriptionRoadmap {
  type: typeof CHANGE_CREATE_DESCRIPTION_ROADMAP;
  description: string;
}

export interface SetListRoadmaps {
  type: typeof SET_LIST_ROADMAPS;
  list: RoadmapType<string>[];
}

export interface SetCountRoadmaps {
  type: typeof SET_COUNT_ROADMAPS;
  count: number;
}

export interface SetPaginationRoadmaps {
  type: typeof SET_PAGINATION_ROADMAPS;
  pagination: IPagination;
}

export interface UpdateReduceRoadmaps {
  type: typeof UPDATE_REDUCE_ROADMAPS;
  obj: ReduceRoadmapsTypeOptional;
}

export interface ChangeSectionTitle {
  type: typeof CHANGE_SECTION_TITLE;
  id: string;
  title: string;
}

export interface ChangeSectionText {
  type: typeof CHANGE_SECTION_TEXT;
  id: string;
  text: string;
}

export interface ChangeSectionChange {
  type: typeof CHANGE_SECTION_CHANGE;
  id: string;
}

export interface UpdateSection {
  type: typeof UPDATE_SECTION;
  section: OptionalSectionType;
}

export interface DeleteSection {
  type: typeof DELETE_SECTION;
  id: string;
}

export type ReduceRoadmapsActionType =
  | SetCurrentRoadmap
  | SetListRoadmaps
  | SetCountRoadmaps
  | SetPaginationRoadmaps
  | UpdateReduceRoadmaps
  | ChangeCurrentTitleRoadmap
  | ChangeCurrentPrivateRoadmap
  | ChangeCurrentDescriptionRoadmap
  | ChangeCreateTitleRoadmap
  | ChangeCreatePrivateRoadmap
  | ChangeCreateDescriptionRoadmap
  | ChangeSectionTitle
  | ChangeSectionText
  | ChangeSectionChange
  | DeleteSection;
