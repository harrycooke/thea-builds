import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide
} from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import { modifyUserData, confirmPassword, logoutUser } from "../../actions/authActions";
import { sendAmplitudeData } from "../../utils/amplitude";

const styles = theme => ({
  root: {},
  details: {
    display: 'flex',
    flexDirection: "column",
    margin: "1.2em"
  },
  uploadButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 12  
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 15
    },
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500"
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
  /// Comment to get rid of yellow on sublime
});

class Password extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      modalOpened: false,
      checkedA: this.props.auth.notification
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { id } = this.props.auth;
    const confirmOldPassword = this.props.confirmPassword({ userID: id, oldPassword });
    let error = {}
    Promise.resolve(confirmOldPassword)
      .then(value => {
        if (value) {
          if (newPassword === confirmPassword) {
            this.props.modifyUserData({
              userID: id,
              password: newPassword
            });
            sendAmplitudeData('Reset password')
            this.setState({ modalOpened: true });
          } else {
            error.newPassword = "Your new passwords do not match."
          }
        } else {
          error.oldPassword = "Your existing password was incorrect."
        }
        this.setState({ error })
      })
  }

  handleModalClose = () => {
    this.setState({ modalOpened: false });
    this.props.logoutUser();
  }
  /*

  handleChangeSwitch = name => event => {
    this.setState({[name]: event.target.checked });
    this.props.modifyUserData({
      userID: this.props.auth.id,
      notification: event.target.checked
    });
  };*/

  render() {
    const { classes } = this.props;
    //const { oldPassword, newPassword, confirmPassword, error, modalOpened, checkedA } = this.state;
    const { oldPassword, newPassword, confirmPassword, error, modalOpened } = this.state;
    
    return (
      <Card
        className={classes.root}>
        <form>
          <CardHeader
            title="Update Password"
          />
          <Divider />
          <div className={classes.details}>

          {/* <CardContent> */}
            <TextField
              fullWidth
              label="Old Password"
              name="oldPassword"
              onChange={this.handleChange}
              style={{ marginTop: '0.5rem' }}
              type="password"
              value={oldPassword}
              variant="outlined"
            />
            {error && error.oldPassword &&
              <Typography
                color="error"
                className={classes.errorText}
              >
                {error.oldPassword}
              </Typography>
            }
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              onChange={this.handleChange}
              style={{ marginTop: '1rem' }}
              type="password"
              value={newPassword}
              variant="outlined"
            />
            <TextField
              fullWidth
              // width="40%"
              // margin="normal"
              // size="medium"
              label="Re-type New password"
              name="confirmPassword"
              onChange={this.handleChange}
              style={{ marginTop: '1rem'}}
              type="password"
              value={confirmPassword}
              variant="outlined"
            />
            {error && error.newPassword &&
              <Typography
                color="error"
                className={classes.errorText}
              >
                {error.newPassword}
              </Typography>
            }
          {/* </CardContent> */}
          </div>
          
          <CardActions style={{ marginLeft: '0.5rem', marginBottom: '1rem' }}>
            <Button
              className={classes.uploadButton}
              //marginLeft="3"
              color="primary"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Update Password
          </Button>
          </CardActions>
          <Divider />
        </form>

      {/*
        <CardHeader
            title="Notification Settings"
          />
          <Divider />
          
          <FormControlLabel
            checked={checkedA}
            onChange={this.handleChangeSwitch('checkedA')}
            control={<Switch color="primary" />}
            label="Allow Thea Health to send me emails when there is activity on one of my cases"
            labelPlacement="start"
          />
        */}
      
        <Dialog
          open={modalOpened}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleModalClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Password Updated Successfully!</DialogTitle>
          <DialogContent style={{ display: "flex", justifyContent: "center" }}>
            <DialogContentText id="alert-dialog-slide-description">
              You will now be logged out.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleModalClose}
              color="primary"
              variant="contained"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    )
  }
};

Password.propTypes = {
  auth: PropTypes.object.isRequired,
  modifyUserData: PropTypes.func.isRequired,
  confirmPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
});

export default connect(
  mapStateToProps,
  { modifyUserData, confirmPassword, logoutUser }
)(withStyles(styles)(Password));
