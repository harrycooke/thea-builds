import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { setAmplitudeUserId, setAmplitudeUserDevice } from "./utils/amplitude";

import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { setCurrentUser, logoutUser, getPublicStripeKey } from "./actions/authActions";

import AdminRoute from "./routes/AdminRoute";
import DashboardRoute from "./routes/DashboardRoute";
import InboxRoute from "./routes/InboxRoute";
import InsideMessageRoute from "./routes/InsideMessageRoute";
import NewCaseRoute from "./routes/NewCaseRoute";
import EmptyRoute from "./routes/EmptyRoute";
import AssignConsultRoute from "./routes/AssignConsultRoute";

import ForgotPassword from "./containers/Signin/ForgotPassword";
import Pricing from "./containers/Pricing";
import ReferAFriend from "./containers/ReferFriend";
import Checkout from "./containers/Checkout/Checkout";
import AssignConsult from "./containers/Inbox/AssignConsult";
import SignIn from "./containers/Signin";
import SignUp from "./containers/Signup";
import PaymentInfo from "./containers/Signup/PaymentInfo";
import Dashboard from "./containers/Dashboard";
import Inbox from "./containers/Inbox";
import ClosedCases from "./containers/Inbox/ClosedCases";
import Drafts from "./containers/Inbox/Drafts";
import InsideMessage from "./containers/Inbox/InsideMessage";
import NewCase from "./containers/NewCase";
import Account from "./containers/Account";
import Import from "./containers/Import";
import PDF from "./containers/PDF";
import IdleTimer from 'react-idle-timer'

import { channels } from './shared/constants';
const { ipcRenderer } = window; 

//This is a new testing comment
// random comment here 
//const stripePromise = getPublicStripeKey().then(key => loadStripe(key));



const NotFound = () => {
  return <div>NotFound</div>;
};//

const THEME = createMuiTheme({
  typography: {
    //  "fontFamily": "\"Open Sans\", Semibold",
    "fontFamily": "Open Sans",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#13c1cf',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#ffffff' // could also remove and will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#004866',
    },
    background: {
      default: '#004866',
    },
   }, 
});

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  setAmplitudeUserDevice(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user id for Amplitude
  setAmplitudeUserId(decoded);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.onIdle = this._onIdle.bind(this)
  }

  _onIdle(e) {
    console.log('user is idle', e)
    console.log('last active', this.idleTimer.getLastActiveTime())
    // Logout user
    store.dispatch(logoutUser());
  }
  render() {

    return (
      <MuiThemeProvider theme={THEME}>
        <CssBaseline />
        <div style={{ minHeight: "100vh" }}>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            onIdle={this.onIdle}
            timeout={1000 * 60 * 30} />
          <Router>
            <Switch>
              <AdminRoute path="/pdf_:channel_id" component={PDF} />
              <AdminRoute path="/login" component={SignIn} />
              <AdminRoute path="/forgotpassword" component={ForgotPassword} />
              

              <AdminRoute path="/register/identification=HatboroMedical" component={SignUp} />
              <AdminRoute path="/register/identification=Sellersville" component={SignUp} />
              <AdminRoute path="/register/identification=consultants" component={SignUp} />
              <AdminRoute path="/register/identification=Atanda" component={SignUp} />
              <AdminRoute path="/register/identification=DeveloperAccountCreator" component={SignUp} />
              <AdminRoute path="/register/identification=Beda" component={SignUp} />
              
              
              <AdminRoute path="/register/identification/practice_id_:practice_id/is_admin_:is_admin" component={SignUp} />
              <AdminRoute path="/register/identification/sign_up_key_:max_user/is_admin_:is_admin" component={SignUp} />
              <AdminRoute path="/register/identification/sign_up_key_:max_user/practice_id_:practice_id/is_admin_:is_admin" component={SignUp} />


              <AdminRoute path="/payment-info" component={PaymentInfo} />
              <AdminRoute path="/referFriend" component={ReferAFriend} />
              <DashboardRoute path="/checkout" component={Checkout} />
              <DashboardRoute path="/pricing" component={Pricing} />

              <DashboardRoute path="/dashboard" component={Dashboard} />
              <DashboardRoute path="/account" component={Account} />
              <DashboardRoute path="/import" component={Import} />
              <DashboardRoute path="/dashboard/utilization" component={Dashboard} />
              <DashboardRoute path="/dashboard/savings-reimbursements" component={Dashboard} />
              <DashboardRoute path="/dashboard/consult-efficiency" component={Dashboard} />
              <InboxRoute exact path="/" component={Inbox} />
              <InboxRoute exact path="/inbox" component={Inbox} />
              <InboxRoute path="/inbox/cases" component={Inbox} />
              <InboxRoute path="/inbox/closed_cases" component={ClosedCases} />
              <InboxRoute path="/inbox/drafts" component={Drafts} />
              <AssignConsultRoute path="/assign-consult/case_:case_id/specialty_:type" component={AssignConsult} />
              <InsideMessageRoute path="/insidemessage/room_:channel_id" component={InsideMessage} />
              <NewCaseRoute path="/create-new-case" component={NewCase} />
              <NewCaseRoute path="/edit-new-case-:id" component={NewCase} />
              {/* <NewCaseRoute path="/refer-a-friend" component={ReferFriend} /> */}
              <EmptyRoute component={NotFound} />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
