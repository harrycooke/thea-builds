import axios from "axios";
import {
  GET_ERRORS,
  SAVE_DRAFT,
  CURRENT_DRAFT,
  FETCH_ALL_DRAFT,
  DRAFT_LOADER,
  DRAFT_DELETED
} from "./types";
import { getServerUrl } from "../utils/functions";
import { sendAmplitudeData } from "../utils/amplitude";

// Send new case to specialty
export const saveDraft = (draftData) => dispatch => {
  sendAmplitudeData('Save a draft case', draftData);
  axios
    .post(getServerUrl() + "/api/v1/drafts/saveDraft", draftData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        dispatch({
          type: SAVE_DRAFT,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.errors
        })
      }
    }) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

//Read messages with channel data
export const setCurrentDraft = request => dispatch => {
  dispatch({
    type: CURRENT_DRAFT,
    payload: []
  })
  axios
    .post(getServerUrl() + "/api/v1/drafts/fetchDraft", request)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        const { data } = res.data;
        dispatch({
          type: CURRENT_DRAFT,
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

//Get all drafts from database
export const fetchAllDrafts = currentUserData => dispatch => {
  dispatch({
    type: FETCH_ALL_DRAFT,
    payload: []
  })
  axios
    .post(getServerUrl() + "/api/v1/drafts/fetchAllDrafts", currentUserData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        const { data } = res.data;
        dispatch({
          type: FETCH_ALL_DRAFT,
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
}

export const modifyDraft = draftData => dispatch => {
  sendAmplitudeData('Modify draft case', draftData)
  axios
    .post(getServerUrl() + "/api/v1/drafts/modifyDraftDataById", draftData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        return
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
}

//Read messages with channel data
export const removeDraft = request => dispatch => {
  dispatch({
    type: DRAFT_LOADER,
    payload: true
  })
  dispatch({
    type: DRAFT_DELETED,
    payload: false
  })
  axios
    .post(getServerUrl() + "/api/v1/drafts/removeDraft", request)
    .then(function (res) {
      const { status } = res.data;
      setTimeout(() => {
        dispatch({
          type: DRAFT_LOADER,
          payload: false
        })
        if (status === "1") {
          dispatch({
            type: DRAFT_DELETED,
            payload: true
          })
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: res.data.message
          })
        }
      }, 1000)

    })
    .catch(errors => {
      dispatch({
        type: DRAFT_LOADER,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: errors
      })
    })
};
