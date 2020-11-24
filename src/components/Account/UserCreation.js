import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
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
import { sendAmplitudeData } from "../../utils/amplitude";
import { newAccountEmail } from "../../actions/authActions";


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
}); //fixing sublime look 

class UserCreation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { id } = this.props.auth;
    console.log("submitting new user");
    this.props.newAccountEmail({
      userID: id,
      inviteName: this.state.name,
      inviteEmail: this.state.email
    });
    //TODO: add success snackbar and error handling here 
  }

  handleModalClose = () => {
    this.setState({ modalOpened: false });
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
    const { modalOpened } = this.state;
    
    return (
      <Card
        className={classes.root}>
        <form>
          <CardHeader
            title="Add users to your practice"
            // subheader="*You can only add the set maximum number of users to your practice."
          />
          <Divider />
          <div className={classes.details}>

            {/* <CardContent> */}
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              onChange={this.handleChange}
              style={{ marginTop: '0.5rem' }}
              type="name"
              variant="outlined"
            />

            <TextField
              fullWidth
              // width="40%"
              // margin="normal"
              // size="medium"
              label="Email address"
              name="email"
              onChange={this.handleChange}
              style={{ marginTop: '1rem'}}
              type="email"
              variant="outlined"
            />

            {/* </CardContent> */}
          </div>
          <p style={{marginLeft:"20px", color:"secondary"}}> *You can only add the set maximum number of users to your practice.</p>
          
          <CardActions style={{ marginLeft: '0.5rem', marginBottom: '1rem' }}>
            <Button
              className={classes.uploadButton}
              marginLeft="3"
              color="primary"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Add User
          </Button>
          </CardActions>
          <Divider />
        </form>
      
        <Dialog
          open={modalOpened}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleModalClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">User added successfully!</DialogTitle>
          <DialogContent style={{ display: "flex", justifyContent: "center" }}>
            <DialogContentText id="alert-dialog-slide-description">
              You have added a new user. They will be notified by an email.
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

UserCreation.propTypes = {
  auth: PropTypes.object.isRequired,
  newAccountEmail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
});

export default connect(
  mapStateToProps,
  { newAccountEmail }
)(withStyles(styles)(UserCreation));
