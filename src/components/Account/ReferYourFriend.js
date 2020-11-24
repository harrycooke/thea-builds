import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button,
  Fab,
  Card,
  Paper,
  Divider,
  TextField,
  MenuItem,
  FormControlLabel,
  FormControl,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardHeader,
  CardActions,
} from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import ReferAFriend from '../ReferFriend/ReferFriend';
import { registerUser, setSnackbar } from "../../actions/authActions";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { newAccountEmail } from "../../actions/authActions";        //newUserInviteEmail

const styles = theme => ({
  root: {
    // margin: theme.spacing(2.5),
    // padding: theme.spacing(2.5),
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500"
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
  },
  mainNewCaseWrapper: {
    width: "100%",
    height: "100%",
    // overflow: "auto",
    borderRadius: 0,
    backgroundColor: "#fff",
    paddingTop: theme.spacing(2.5),
    paddingRight: theme.spacing(3.5),
    paddingLeft: theme.spacing(2.5),
    paddingBottom: theme.spacing(4)
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
  /// Comment to get rid of yellow on sublime
});

export class ReferYourFriend extends React.Component {

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


// handleQuestionChange = e => {
//     e.preventDefault();
//     this.setState({
//     question: e.target.value,
//     })
//     //console.log(this.state);
// }

  render() {
    const { classes } = this.props;
    const { modalOpened } = this.state;
    
    return (
    <Card
      className={classes.root}>
      
      <CardHeader
        title="Invite your friend"
      />
        <Divider />
        <div style={{padding:"20px", paddingBottom: "60px" }}>
        <Typography style={{ paddingBottom: "15px" }}>
                Add your personalized message to the email box below or use the default for sending invites to your contacts.
        </Typography>
        <ReferAFriend/>
        </div>

    </Card>
    )
  }
};


ReferYourFriend.propTypes = {
  auth: PropTypes.object.isRequired,
  newAccountEmail: PropTypes.func.isRequired,     //newUserInviteEmail
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
});

export default connect(
  mapStateToProps,
  { newAccountEmail }           //newUserInviteEmail
)(withStyles(styles)(ReferYourFriend));
