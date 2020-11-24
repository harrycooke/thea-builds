import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, setSnackbar } from "../../actions/authActions";
import classnames from "classnames";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container, 
  Snackbar,
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import MySnackbarContentWrapper from '../../components/SharedComponents/SnackBar';
//import { setSnackbar } from "../../actions/caseAction";

import { withStyles } from '@material-ui/core/styles';
import { encodeString, decodeString } from '../../utils/functions';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500"
  }
});

export class SignIn extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      remember: false
    };
    this.forgotPassword = this.forgotPassword.bind(this)
  }

  forgotPassword = () => {
    this.props.history.push("/forgotpassword");
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    if(this.state.remember){
      let password = encodeString(this.state.password)
      cookies.set('email', this.state.email, { path: '/' });
      cookies.set('password', password, { path: '/' });
    } else {
      cookies.remove('email', { path: '/' });
      cookies.remove('password', { path: '/' });
    }
    this.props.loginUser(userData);
  };

  handleCheck = () => {
    this.setState({remember: !this.state.remember});
  }

  handleSnackbarClose = () => { 
    this.props.setSnackbar(false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/inbox/cases"); // push user to inbox when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/inbox/cases");
    }

    let email = cookies.get('email');
    if(email){
      let password = decodeString(cookies.get('password'));
      this.setState({email: email, password: password, remember: true})
    }
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <div style={{ display: "flex" }}>
            <img src={require("../../assets/images/text-logo.png")} alt="required" style={{width: "100%"}} />
          </div>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          {/* Added the error message for Email and Password fields here */}
          <Typography
              color="error"
              className={classes.errorText}
            >
              {errors.email}
              {errors.emailnotfound}
              {errors.password}
              {errors.passwordincorrect}
            </Typography>

          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              value={this.state.email}
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            {/* <Typography
              color="error"
              className={classes.errorText}
            >
              {errors.email}
              {errors.emailnotfound}
            </Typography> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={this.state.password}
              autoComplete="off"
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
            {/* <Typography
              color="error"
              className={classes.errorText}
            >
              {errors.password}
              {errors.passwordincorrect}
            </Typography> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              checked={this.state.remember}
              onChange={this.handleCheck}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs style={{ display: "flex", justifyContent: "center" }}>
                <Link style={{ cursor: 'pointer' }} onClick={this.forgotPassword} variant="body2" >
                  Forgot password?
                </Link>
                {/*
                </Grid>
                <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                */}
              </Grid>
            </Grid>
          </form>
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
              message="Account created successfully."
            />
    </Snackbar>
      </Container>
      
    );
  }
}

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  showSnackbar: state.auth.showSnackbar,
});

export default connect(
  mapStateToProps,
  { loginUser, setSnackbar }
)(withStyles(styles)(SignIn));