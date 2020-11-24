import axios from "axios";
import {
  GET_ERRORS,
  SEND_CASE,
  CURRENT_CASE,
  FETCH_ALL_CASES,
  GET_NUM_NEW_MESSAGE,
  CASE_LOADER,
  SHOW_SNACKBAR,
  USER_PATIENTS
} from "./types";
import { getServerUrl } from "../utils/functions";
import { sendAmplitudeData } from '../utils/amplitude';
import { Mixpanel } from '../utils/mixpanel';


// Send new case to specialty
export const sendCase = (caseData) => dispatch => {
  sendAmplitudeData('Create a case', caseData)
  axios
    .post(getServerUrl() + "/api/v1/case/saveCase", caseData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        console.log("got to post case in caseAction")
        dispatch({
          type: SEND_CASE,
          payload: res.data.data
        })
        Mixpanel.track('Sent Case', {
          patient_id: res.data.data.patient_id,
          created_at: res.data.data.created_at,
          specialty: res.data.data.specialty,
          });
        
  
      } else {
        Mixpanel.track('Unsuccessful send');

        dispatch({
          type: GET_ERRORS,
          payload: res.data.errors
        })
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
    );
};

//Read messages with channel data
export const setCurrentCase = request => dispatch => {
  dispatch({
    type: CURRENT_CASE,
    payload: []
  })
  axios
    .post(getServerUrl() + "/api/v1/case/fetchCase", request)
    .then(function (res) {
      const { status } = res.data;
      if (status === "1") {
        const { data } = res.data;

        dispatch({
          type: CURRENT_CASE,
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

//Get all cases from database
export const fetchAllCases = currentUserData => dispatch => {
  dispatch({
    type: CASE_LOADER,
    payload: true
  })
  dispatch({
    type: FETCH_ALL_CASES,
    payload: []
  })
  axios
    .post(getServerUrl() + "/api/v1/case/fetchAllCases", currentUserData)
    .then(res => {
      const { status } = res.data;
                  console.log("here is the data");
                  //console.log(res.data);
      dispatch({
        type: CASE_LOADER,
        payload: false
      })
      if (status === "1") {
        const { data } = res.data;
        //console.log("sergerg " + data.length);
        dispatch({
          type: FETCH_ALL_CASES,
          payload: data,
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
        type: CASE_LOADER,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: errors
      })
    })
}

export const modifyCase = caseData => dispatch => {
  axios
    .post(getServerUrl() + "/api/v1/case/modifyCaseDataById", caseData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        return;
        // const { data } = res.data;
        // dispatch({
        //   type: CURRENT_CASE,
        //   payload: data
        // });
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

export const getNumOfNewMessage = userData => dispatch => {
  dispatch({
    type: GET_NUM_NEW_MESSAGE,
    payload: 0
  })
  console.log(userData);
  axios
    .post(getServerUrl() + "/api/v1/case/getNumberOfNewMessage", userData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        console.log(res.data);
        dispatch({
          type: GET_NUM_NEW_MESSAGE,
          payload: res.data.data
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

export const setSnackbar = snackbarValue => dispatch => {
  dispatch({
    type: SHOW_SNACKBAR,
    payload: snackbarValue
  })
}


export const getUserPatients = currentUserData => dispatch => {
  dispatch({
    type: USER_PATIENTS,
    payload: true
  })

  axios
    .post(getServerUrl() + "/api/v1/case/getUserPatients", currentUserData)
    .then(res => {
      //console.log(res.data);

      const { status } = res.data;
      if (status === "1") {
        //console.log(res.data);
        dispatch({
          type: USER_PATIENTS,
          payload: res.data
        })
      }
    })
    .catch(errors => {
      console.log("errors");

      dispatch({
        type: USER_PATIENTS,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: errors
      })
    })
}