import {
  CURRENT_CASE,
  SEND_CASE,
  FETCH_ALL_CASES,
  GET_NUM_NEW_MESSAGE,
  CASE_LOADER,
  SHOW_SNACKBAR,
  USER_PATIENTS
} from "../actions/types";
const initialState = {
  sendCases: [],
  currentCase: [],
  readAllCases: [],
  numberOfNewMessage: 0,
  caseLoader: false,
  showSnackbar: false,
  patientList: []
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_CASE:
      return {
        ...state,
        sendCases: action.payload
      };
    case CURRENT_CASE:
      return {
        ...state,
        currentCase: action.payload
      }
    case FETCH_ALL_CASES:
      return {
        ...state,
        readAllCases: action.payload
      }
    case CASE_LOADER:
      return {
        ...state,
        caseLoader: action.payload
      }
    case GET_NUM_NEW_MESSAGE:
      return {
        ...state,
        numberOfNewMessage: action.payload
      }
    case SHOW_SNACKBAR:
      return {
        ...state,
        showSnackbar: action.payload
      }
    case USER_PATIENTS:
      return {
        ...state,
        patientList: action.payload.data
      }
    default:
      return state;
  }
}