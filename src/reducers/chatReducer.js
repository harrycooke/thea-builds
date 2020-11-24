import {
  READ_MESSAGES,
  SEND_MESSAGES
} from "../actions/types";
const initialState = {
  sendMessages: [],
  readMessages: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGES:
      return {
        ...state,
        sendMessages: action.payload
      };
    case READ_MESSAGES:
      return {
        ...state,
        readMessages: action.payload
      }
    default:
      return state;
  }
}