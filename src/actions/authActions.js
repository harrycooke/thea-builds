import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  USER_DATA,
  CLIENT_DATA,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_REQUEST,
  USER_LOGOUT,
  SPECIALTY_DATA,
  PRACTICE_DATA,
  PRACTICE_DATA_REQUEST,
  STRIPE_DATA,
  STRIPE_DATA_REQUEST,
  SPECIALTY_LOADER,
  NEW_ACCOUNT_REQUEST,
  NEW_ACCOUNT,
  SHOW_SNACKBAR,
  SHOW_SNACKBAR2
} from "./types";
import { getServerUrl } from "../utils/functions";

import { sendAmplitudeData, setAmplitudeUserProperties } from "../utils/amplitude";
import { Mixpanel } from '../utils/mixpanel';


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(getServerUrl() + "/api/v1/auth/register", userData)
    .then(res => {
      const { status } = res.data;
      //const admin = true;
      if (status === "1") {
          console.log("outside if case")

        if (userData.isAdmin === true){
          console.log("history push")

          history.push({
            pathname: '/payment-info',
            // pathname: '/referFriend',
            data: res.data // your data array of objects
          })
          console.log("history push")
        } else {
          history.push("/login")
        }
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
        payload: "err.response.data"
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post(getServerUrl() + "/api/v1/auth/login", userData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        const { data, practiceData } = res.data.data;
        dispatch({
          type: USER_DATA,
          payload: data
        })
        dispatch({
          type: PRACTICE_DATA,
          payload: practiceData
        })

        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));

        setAmplitudeUserProperties(data)

        Mixpanel.identify(data.id);
        Mixpanel.track('Login');
        Mixpanel.people.set({
          $first_name: data.firstName,
          $last_name: data.lastName,
          $email: data.email,
          user_type: data.user_type,
          $avatar: data.avatar,
          is_admin: data.is_admin,
          $created: data.created,
          practice_id: data.practice_id,
          specialty: data.specialty,
        });
      } else {
        Mixpanel.track('Unsuccessful login');
        dispatch({
          type: GET_ERRORS,
          payload: res.data.errors
          // payload: ""
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




// Get User data by id from database
export const fetchUserData = userID => dispatch => {
  const request = {
    userID: userID
  }
  dispatch({
    type: CLIENT_DATA,
    payload: {}
  })
  axios
    .post(getServerUrl() + "/api/v1/auth/fetchUserDataById", request)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        dispatch({
          type: CLIENT_DATA,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: "err.response.data"
      })
    )
};


// Get stripe info
// we could break this into two calls and handle async on front end but I think this is easier for now
export const fetchStripeData = practiceId => dispatch => {
  //dispatch(fetchPracticeData(practiceId));
  const request = {
    practiceId: practiceId
  }
  dispatch({
    type: STRIPE_DATA_REQUEST,
    payload: true
  })
  axios
    .post(getServerUrl() + "/api/v1/auth/fetchStripeDataById", request)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        dispatch({
          type: STRIPE_DATA,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: STRIPE_DATA_REQUEST,
          payload: false
        })
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })
      }
    })
    .catch(err => {
      dispatch({
        type: STRIPE_DATA_REQUEST,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: "err.response.data"
      })

    })
};


export const fetchPracticeData = practiceId => dispatch => {
  const request = {
    practiceId: practiceId
  }
  dispatch({
    type: PRACTICE_DATA_REQUEST,
    payload: true
  })
  axios
    .post(getServerUrl() + "/api/v1/auth/fetchPracticeDataById", request)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        dispatch({
          type: PRACTICE_DATA,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })
        dispatch({
          type: PRACTICE_DATA_REQUEST,
          payload: false
        })
      }
    })
    .catch(err => {
      dispatch({
        type: PRACTICE_DATA_REQUEST,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: "err.response.data"
      })
      }
    )
};


// Modify a specific user data
export const modifyUserData = userData => dispatch => {
  axios
    .post(getServerUrl() + "/api/v1/auth/modifyUserDataById", userData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        dispatch({
          type: USER_DATA,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: "err.response.data"
      })
    })
};


// Modify a specific practice's data
export const modifyPracticeData = practiceData => dispatch => {
  dispatch({
    type: PRACTICE_DATA_REQUEST,
    payload: true
  })
  axios
    .post(getServerUrl() + "/api/v1/auth/modifyPracticeDataById", practiceData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        dispatch({
          type: PRACTICE_DATA,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: PRACTICE_DATA_REQUEST,
          payload: false
        })
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })
      }
    })
    .catch(err => {
      dispatch({
        type: PRACTICE_DATA_REQUEST,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: "err.response.data"
      })
    })
}

// export const confirmPassword = userData => dispatch => {
export const confirmPassword = userData => async dispatch => {        // WARNING!!!!!!!!!!!: changed the data here
  try {
    const res = await axios
      .post(getServerUrl() + "/api/v1/auth/confirmPassword", userData);
    const { status } = res.data;
    if (status === "1") {
      return true;
    }
    else {
      return false;
    }
  }
  catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: "err.response.data"
    });
  }
}
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  dispatch({
    type: USER_LOGOUT
  })
  localStorage.removeItem("jwtToken");
  sendAmplitudeData('Logout');
  Mixpanel.track('Logout');

  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  // dispatch(setCurrentUser({}));
};


//Forgot Password 
export const forgotPassword = userData => dispatch => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
    payload: true
  })
  axios
    .post(getServerUrl() + "/api/v1/auth/forgotPassword", userData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {
        dispatch({
          type: FORGOT_PASSWORD,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.errors
        })
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
          payload: false
        })
      }
    })
    .catch(err => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
    )
}

// Fetch all users with specific specialty
export const fetchSpecificUsers = specialtyType => dispatch => {
  dispatch({
    type: SPECIALTY_LOADER,
    payload: true
  })
  dispatch({
    type: SPECIALTY_DATA,
    payload: []
  })
  axios
    .get(`${getServerUrl()}/api/v1/auth/usersWithSpecialty/${specialtyType}`)
    .then(res => {
      const { status } = res.data;
      dispatch({
        type: SPECIALTY_LOADER,
        payload: false
      });

      if (status === "1") {
        const { data } = res.data;
        dispatch({
          type: SPECIALTY_DATA,
          payload: data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })
      }
    })
    .catch(err => {
      dispatch({
        type: SPECIALTY_LOADER,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    })
}


//Email New User
export const newAccountEmail = newUserData => dispatch => {
  dispatch({
    type: NEW_ACCOUNT_REQUEST,
    payload: true
  })
  axios
    .post(getServerUrl() + "/api/v1/auth/newAccountEmail", newUserData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {

        dispatch({
          type: NEW_ACCOUNT,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.errors
        })
        dispatch({
          type: NEW_ACCOUNT_REQUEST,
          payload: false
        })
      }
    })
    .catch(err => {
      dispatch({
        type: NEW_ACCOUNT_REQUEST,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
    )
}

//Invite New User
export const newUserInviteEmail = newUserData => dispatch => {
  dispatch({
    type: NEW_ACCOUNT_REQUEST,
    payload: true
  })
  axios
    .post(getServerUrl() + "/api/v1/auth/newUserInviteEmail", newUserData)
    .then(res => {
      const { status } = res.data;
      if (status === "1") {

        dispatch({
          type: NEW_ACCOUNT,
          payload: res.data.data
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.errors
        })
        dispatch({
          type: NEW_ACCOUNT_REQUEST,
          payload: false
        })
      }
    })
    .catch(err => {
      dispatch({
        type: NEW_ACCOUNT_REQUEST,
        payload: false
      })
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
    )
}

export const getSetupIntent = data => dispatch => {    
    return axios
      .post(getServerUrl() + `/api/v1/auth/createSetupIntent`, data)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: "err.response.data"
        })
      })
};

export const getPublicStripeKey = options => dispatch => {
    return axios
      .get(getServerUrl() + `/api/v1/auth/public-key`)
      .then(res => {
          return res.data.publicKey;
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: "err.response.data"
        })
    })
};

export const setSnackbar = snackbarValue => dispatch => {
  dispatch({
    type: SHOW_SNACKBAR,
    payload: snackbarValue
  })
}

export const setSnackbar2 = snackbarValue => dispatch => {
  dispatch({
    type: SHOW_SNACKBAR2,
    payload: snackbarValue
  })
}