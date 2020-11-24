import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import caseReducer from "./caseReducer";
import draftReducer from "./draftReducer";
import errorReducer from "./errorReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  case: caseReducer,
  draft: draftReducer,
  errors: errorReducer
});

export default (state, action) => (
  action.type === 'USER_LOGOUT'
    ? rootReducer(undefined, action)
    : rootReducer(state, action)
)
