import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { 
  Grid,
  Button,
  CardActions,
  Snackbar,
  Card,
 } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

//import AccountDetails from '../../components/Account/AccountDetails';
import AccountProfile from '../../components/Account/AccountProfile';
import NotificationSettings from '../../components/Account/NotificationSettings';
import ListOfQuestions from '../../components/Account/ListOfQuestions';
import ReferYourFriend from '../../components/Account/ReferYourFriend';
import Password from '../../components/Account/Password';
import UserCreation from '../../components/Account/UserCreation';
import CardDetails from '../../components/Account/CardDetails';
import FriendInviteTable from '../../components/Account/FriendInviteTable';
import MemberInviteTable from '../../components/Account/MemberInviteTable';

import { sendAmplitudeData } from '../../utils/amplitude';
import { modifyUserData, setSnackbar, setSnackbar2} from "../../actions/authActions";
import MySnackbarContentWrapper from '../../components/SharedComponents/SnackBar';
import MySnackbarContentWrapper2 from '../../components/SharedComponents/SnackBar2';

/*******
TODO:
- set number of invites in an account through practice db
*******/

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const styles = theme => ({
  root: {
    height: "60%",
    display: "flex",
    marginRight: 0,
    marginLeft: 0,
    justifyContent: "center",        //flex-start, center, flex-end
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),    
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),   
    },
  },
  uploadButton: {
    // width: "100%",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 12  
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 15
    },
  },
});

/*
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
//    logErrorToMyService(error, errorInfo);
    console.log(error);
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}*/

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvatarLoader: false
    }
  }
  state = {
    open: true,
  };

  componentDidMount() {
    sendAmplitudeData('Open account setting page');
    
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.auth.avatar && this.props.auth.avatar && nextProps.auth.avatar.name !== this.props.auth.avatar.name){
      this.setState({isAvatarLoader: false});
    }else if(nextProps.auth.avatar && this.props.auth.avatar == null && nextProps.auth.avatar.name){
      this.setState({isAvatarLoader: false});
    }
  }

  handleSnackbarClose = () => { 
    this.props.setSnackbar(false);
    // this.props.setSnackbar2(false);
  }
  handleEmailSnackbarClose = () => { 
    this.props.setSnackbar2(false);
  }


  setLoader = (value) => {
    this.setState({isAvatarLoader: value});
  }

  render() {
    const { classes, auth, modifyUserData } = this.props;
    const { open } = this.state;
    let props = {
      setLoader: this.setLoader,
      auth: auth,
      isAvatarLoader: this.state.isAvatarLoader,
      modifyUserData: modifyUserData
    };
    // console.log("authfsa");
    // console.log(auth);
    
    return (
      <div className={classes.root}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              style={{ display: "flex", justifyContent: "center" }}
            >{/*
              <Grid
                item
                lg={8}
                md={7}
                xl={9}
                xs={12}
              >
                <ReferYourFriend />
              </Grid>*/}
              {/* </Card> */}

              {/* <Grid
                item
                lg={8}
                md={7}
                xl={9}
                xs={12}
              >
                <ListOfQuestions />
              </Grid> */}

              {/* <Grid
                item
                lg={8}
                md={7}
                xl={9}
                xs={12}
              >
                <FriendInviteTable />
              </Grid> */}

              {/* <Grid
                item
                lg={8}
                md={7}
                xl={9}
                xs={12}
              >
                <MemberInviteTable />
              </Grid> */}

              <Grid
                item
                lg={8}
                md={7}
                xl={9}
                xs={12}
              >
                <NotificationSettings />
              </Grid>

              <Grid
                item
                lg={8}
                md={7}
                xl={9}
                xs={12}
              >
                <Password />
              </Grid>

              { auth.is_admin && ( 
                <Grid
                  item
                  lg={8}
                  md={7}
                  xl={9}
                  xs={12}
                >
                  
                  <CardDetails {...props}/>
                  
                </Grid>
                )
              }

              <Grid
                item
                lg={8}
                md={7}
                xl={9}
                xs={12}
              >
                <AccountProfile {...props}/>
              </Grid>
              
              {/* <Grid
                item
                lg={8}
                md={7}
                xl={9}
                xs={12}
              >
                <Button
                  className={classes.uploadButton}
                  fullWidth
                  color="primary"
                  variant="contained"
                  component={AdapterLink}
                  to="/pricing"
                >
                  Pricing - Change plan
                </Button>
              </Grid> */}

              { /*auth.is_admin && ( 
                <Grid
                  item
                  lg={8}
                  md={7}
                  xl={9}
                  xs={12}
                >
                  <UserCreation {...props}/>
                </Grid>               
                )
              */} 

            </Grid>
        </div>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.props.showSnackbar}
            autoHideDuration={3000}
            onClose={this.handleSnackbarClose}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="success"
              message="Payment method added."
            />
        </Snackbar>      
        <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.props.showSnackbar2}
            autoHideDuration={5000}
            onClose={this.handleEmailSnackbarClose}
          >
            <MySnackbarContentWrapper2
              onClose={this.handleEmailSnackbarClose}
              variant="success"
              message="Email has been sent. Please make sure your friend checks their spam folder in case they don't see the email."
            />
        </Snackbar>        
      </div>
    );
  }
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  modifyUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
  showSnackbar: state.auth.showSnackbar,
  showSnackbar2: state.auth.showSnackbar2,
});


export default connect(
  mapStateToProps,
  { modifyUserData, setSnackbar, setSnackbar2 }
)(withStyles(styles)(Account));
