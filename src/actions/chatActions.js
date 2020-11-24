import axios from "axios";
import {
  GET_ERRORS,
  SEND_MESSAGES,
  READ_MESSAGES
} from "./types";
import { getServerUrl } from "../utils/functions";

import { sendAmplitudeData } from "../utils/amplitude";

// Send messages to client
export const sendMessages = (messageData) => dispatch => {
  sendAmplitudeData('Respond to a case message', messageData);
  axios
    .post(getServerUrl() + "/api/v1/inbox/saveNewInbox", messageData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        dispatch({
          type: SEND_MESSAGES,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })
      }     
    }) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: "err.response.data"
      })
    );
};

//Read messages with channel data
export const readMessages = channelData => dispatch => {
  axios
    .post(getServerUrl() + "/api/v1/inbox/readInbox", channelData)
    .then(res => {     
      const { status } = res.data;
      if (status === "1") {
        const { data } = res.data;
        dispatch({
          type: READ_MESSAGES,
          payload: data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })
      }
    })
    .catch(errors => {
      dispatch({
        type: GET_ERRORS,
        payload: errors
      })
    })
};
