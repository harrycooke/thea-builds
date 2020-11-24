import {
  SET_CURRENT_USER,
  USER_LOADING,
  USER_DATA,
  CLIENT_DATA,
  PRACTICE_DATA,
  PRACTICE_DATA_REQUEST,
  STRIPE_DATA,
  STRIPE_DATA_REQUEST,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_REQUEST,
  SPECIALTY_DATA,
  NEW_ACCOUNT,
  NEW_ACCOUNT_REQUEST,
  SHOW_SNACKBAR,
  SHOW_SNACKBAR2,
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  userdata: {},
  clientdata: {},
  loading: false,
  forgotPasswordState: false,
  specialtyData: [],
  showSnackbar: false,
  showSnackbar2: false,
  practiceData: {},
  stripeData: {}
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        clientdata: {},
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case USER_DATA:
      return {
        ...state,
        userdata: action.payload
      }
    case PRACTICE_DATA:
      return {
        ...state,
        practiceData: action.payload,
        loading: false
      }
    case PRACTICE_DATA_REQUEST:
      return {
        ...state,
        loading: action.payload
      };
    case STRIPE_DATA:
      return {
        ...state,
        stripeData: action.payload,
        loading: false
      }
    case STRIPE_DATA_REQUEST:
      return {
        ...state,
        loading: action.payload
      };
    case CLIENT_DATA:
      return {
        ...state,
        clientdata: action.payload
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordState: action.payload,
        loading: false
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordState: false,
        loading: action.payload
      };
    case SPECIALTY_DATA:
      return {
        ...state,
        specialtyData: action.payload
      };
    case SHOW_SNACKBAR:
      return {
        ...state,
        showSnackbar: action.payload
      }
    case SHOW_SNACKBAR2:
      return {
        ...state,
        showSnackbar2: action.payload
      }
    case NEW_ACCOUNT:
      return {
        ...state,
        newAccountState: action.payload,
        loading: false
      };
    case NEW_ACCOUNT_REQUEST:
      return {
        ...state,
        newAccountState: false,
        loading: action.payload
      };
    default:
      return state;
  }
}