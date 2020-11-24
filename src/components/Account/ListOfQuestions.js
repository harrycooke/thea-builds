import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from "classnames";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Slide,
  FormControlLabel,
  Switch,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import { modifyUserData, confirmPassword, logoutUser } from "../../actions/authActions";
import { sendAmplitudeData } from "../../utils/amplitude";
import { newAccountEmail, registerUser, setSnackbar } from "../../actions/authActions";        //newUserInviteEmail

const styles = theme => ({
  root: {},
  errorText: {
    fontSize: 12,
    fontWeight: "500"
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
  /// Comment to get rid of yellow on sublime
});

export class ListOfQuestions extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     name: '',
//     email: '',
//     text: '',
//     errors: {}
//     }
// }

  state = {
    name: '',
    email: '',
    text: '',
    errors: {},
    open: false,
    persons: []
  }

  handleText = i => e => {
    let persons = [...this.state.persons]
    persons[i] = e.target.value
    this.setState({
      persons
    })
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
};

  handleSubmit = () => {
    const { id } = this.props.auth;
    const { email, name } = this.state;
    console.log("submitting new user");
    this.props.newAccountEmail({        //newUserInviteEmail
        userID: id,
        inviteName: this.state.name,
        inviteEmail: this.state.email
    });

    if (name === '') {
        let errors = {
            name: "Name field is required."
        }
        this.setState({ errors })
      } else if (email === '') {
        let errors = {
            email: "Email field is required."
        }
        this.setState({ errors })
      }

    this.props.setSnackbar(true);
    this.setState({ open: true });
    //TODO: add success snackbar and error handling here 
}

  handleDelete = i => e => {
    e.preventDefault()
    let persons = [
      ...this.state.persons.slice(0, i),
      ...this.state.persons.slice(i + 1)
    ]
    this.setState({
      persons
    })
  }

  addQuestion = e => {
    e.preventDefault()
    let persons = this.state.persons.concat([''])
    this.setState({
      persons
    })
  }

  render() {
    const { classes } = this.props;
    const { modalOpened, open, errors, name, email } = this.state;

    return (
      <React.Fragment>
        <div className={classes.root}>
          {this.state.persons.map((person, index) => (
            <span key={index}>
              <Grid container spacing={3}>
                {/* <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    type="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name" name="name"
                    style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", width: "100%"}}
                    label="Provider Full Name"
                    onChange={this.handleText(index)}
                    value={person}
                  />
                  <TextField margin="normal" variant="outlined" required fullWidth id="name" name="name" type="name"
                    style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", width: "100%"}}
                    label="Provider Full Name"
                    onChange={this.handleChange}
                    // className={classnames("", {
                    //     invalid: errors.name
                    //   })}
                    // value=""
                  />
                </Grid> */}

                <Grid item xs={6}>
                <TextField
                  margin="normal"
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email" name="email"
                  style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", width: "100%"}}
                  label="Email Address"
                  onChange={this.handleText(index)}
                  // onChange={this.handleChange}
                  value={person}
                />
                {/* <TextField margin="normal" variant="outlined" required fullWidth id="email" name="email" type="email"
                  style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", width: "100%"}}
                  label="Email Address"
                  onChange={this.handleChange}
                  // className={classnames("", {
                  //     invalid: errors.email
                  //   })}
                  // value=""
                /> */}
                </Grid>

                {/* <form >
                  <label>
                    Name:
                    <input type="text" value="" onChange={} />
                  </label>
                  <input type="submit" value="Submit" />
                </form> */}
              </Grid>
              
              <button onClick={this.handleDelete(index)}>X</button>
            </span>
          ))}


            <TextField multiline fullWidth rows={5} required rowsMax="10" margin="normal" variant="outlined" 
                defaultValue={"Hey friend, I wanted to invite you to try TheaHealth. It will allow me to securely send documents and images about patients who I would like to consult you on. Let me know if you choose to try it and I will send you a patient case!"}
                label="Email message"
                // value=""
                //onChange={this.handleQuestionChange}
                //className={classes.textField}
            />

          <Button 
            variant="contained" 
            color="inherit" backgroundColor="primary" 
            onClick={this.addQuestion}
            style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto"}}
            >
              <Typography >
                Add more
              </Typography>
          </Button>

          <Button 
            variant="contained" 
            // className={`${classes.sendButtonRightAlign} ${classes.addButton}`} 
            // disabled={!this.state.isLoading ? false : true} 
            color="primary" 
            backgroundColor="primary" 
            style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", float: 'right'}} 
            onClick={this.handleSubmit} 
          >
            <Typography >
              Send
            </Typography>
          </Button>

        </div>
      </React.Fragment>
    )
  }
}

ListOfQuestions.propTypes = {
  auth: PropTypes.object.isRequired,
  newAccountEmail: PropTypes.func.isRequired,
  modifyUserData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
});

export default connect(
  mapStateToProps,
  { newAccountEmail, modifyUserData, setSnackbar}
)(withStyles(styles)(ListOfQuestions));
