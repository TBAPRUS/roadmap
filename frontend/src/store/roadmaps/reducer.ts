import {
  ReduceRoadmapsType,
  ReduceRoadmapsActionType,
  SET_CURRENT_ROADMAP,
  CHANGE_CURRENT_TITLE_ROADMAP,
  CHANGE_CURRENT_PRIVATE_ROADMAP,
  CHANGE_CURRENT_DESCRIPTION_ROADMAP,
  CHANGE_CREATE_TITLE_ROADMAP,
  CHANGE_CREATE_PRIVATE_ROADMAP,
  CHANGE_CREATE_DESCRIPTION_ROADMAP,
  SET_LIST_ROADMAPS,
  SET_COUNT_ROADMAPS,
  SET_PAGINATION_ROADMAPS,
  UPDATE_REDUCE_ROADMAPS,
  CHANGE_SECTION_TITLE,
  CHANGE_SECTION_TEXT,
  CHANGE_SECTION_CHANGE,
  DELETE_SECTION,
} from './types';

const initState: ReduceRoadmapsType = {
  list: [],
  current: {
    private: 'public',
    sections: [],
    subscribers: [],
    _id: '',
    title: '',
    description: '',
    owner: '',
    slug: '',
  },
  create: {
    private: 'public',
    sections: [],
    title: '',
    description: '',
  },
  count: 0,
  pagination: {},
};

export const roadmaps = (
  state = initState,
  action: ReduceRoadmapsActionType
): ReduceRoadmapsType => {
  switch (action.type) {
    case SET_CURRENT_ROADMAP:
      return { ...state, current: action.current };
    case CHANGE_CURRENT_TITLE_ROADMAP:
      return { ...state, current: { ...state.current, title: action.title } };
    case CHANGE_CURRENT_PRIVATE_ROADMAP:
      return {
        ...state,
        current: { ...state.current, private: action.private },
      };
    case CHANGE_CURRENT_DESCRIPTION_ROADMAP:
      return {
        ...state,
        current: { ...state.current, description: action.description },
      };
    case CHANGE_CREATE_TITLE_ROADMAP:
      return { ...state, create: { ...state.create, title: action.title } };
    case CHANGE_CREATE_PRIVATE_ROADMAP:
      return {
        ...state,
        create: { ...state.create, private: action.private },
      };
    case CHANGE_CREATE_DESCRIPTION_ROADMAP:
      return {
        ...state,
        create: { ...state.create, description: action.description },
      };
    case CHANGE_SECTION_TITLE:
      return {
        ...state,
        current: {
          ...state.current,
          sections: state.current.sections.map((section) =>
            section._id === action.id
              ? { ...section, title: action.title }
              : section
          ),
        },
      };
    case CHANGE_SECTION_TEXT:
      return {
        ...state,
        current: {
          ...state.current,
          sections: state.current.sections.map((section) =>
            section._id === action.id
              ? { ...section, text: action.text }
              : section
          ),
        },
      };
    case CHANGE_SECTION_CHANGE:
      return {
        ...state,
        current: {
          ...state.current,
          sections: state.current.sections.map((section) =>
            section._id === action.id ? { ...section, change: true } : section
          ),
        },
      };
    case DELETE_SECTION:
      return {
        ...state,
        current: {
          ...state.current,
          sections: state.current.sections.filter(
            (section) => section._id !== action.id
          ),
        },
      };
    case SET_LIST_ROADMAPS:
      return { ...state, list: action.list };
    case SET_COUNT_ROADMAPS:
      return { ...state, count: action.count };
    case SET_PAGINATION_ROADMAPS:
      return { ...state, pagination: action.pagination };
    case UPDATE_REDUCE_ROADMAPS:
      return { ...state, ...action.obj };
    default:
      return state;
  }
};
