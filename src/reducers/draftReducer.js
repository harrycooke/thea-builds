import {
  CURRENT_DRAFT,
  SAVE_DRAFT,
  FETCH_ALL_DRAFT,
  DRAFT_DELETED,
  DRAFT_LOADER
} from "../actions/types";
const initialState = {
  saveDraft: [],
  currentDraft: [],
  readAllDrafts: [],
  isDraftDeleted: false,
  draftLoader: false
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_DRAFT:
      return {
        ...state,
        saveDraft: action.payload
      };
    case CURRENT_DRAFT:
      return {
        ...state,
        currentDraft: action.payload
      }
    case FETCH_ALL_DRAFT:
      return {
        ...state,
        readAllDrafts: action.payload
      }
    case DRAFT_DELETED:
      return {
        ...state,
        isDraftDeleted: action.payload
      }
    case DRAFT_LOADER:
      return {
        ...state,
        draftLoader: action.payload
      }
    default:
      return state;
  }
}