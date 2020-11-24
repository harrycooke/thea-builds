import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/authActions";
import classnames from "classnames";
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import MySnackbarContentWrapper from '../../components/SharedComponents/SnackBar'
import {
  Button,
  CssBaseline,
  TextField,
  Container,
  IconButton,
  Snackbar
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '../../components/SharedComponents/CircularProgress';

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
  },
  backButtonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    fontSize: '16px',
    color: '#3f51b5'
  },
  dialogOverflow: {
    '& .MuiDialog-paper': {
      overflowY: 'visible'
    }
  }
});
class ForgotPassword extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      errors: {},
      open: false,
      setOpen: false,
      snackbarMessage: ''
    };
    this.goBack = this.goBack.bind(this)
    this.handleClose = this.handleClose.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  goBack = () => {
    this.props.history.push('/login')
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email
    };
    this.props.forgotPassword(userData);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.auth.forgotPasswordState && (nextProps.auth.forgotPasswordState !== this.props.auth.forgotPasswordState)) {
      this.handleClick()
      this.setState({ snackbarMessage: nextProps.auth.forgotPasswordState })
      setTimeout(() => {
        this.props.history.push('/login');
      }, 2000)
    }
  }

  handleClick = () => {
    this.setState({ setOpen: true })
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ setOpen: false })
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.setOpen}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              onClose={this.handleClose}
              variant="success"
              message={this.state.snackbarMessage}
            />
          </Snackbar>
          <CircularProgress isLoading={this.props.auth.loading} />
          <div style={{ display: "flex" }}>
            <img src={require("../../assets/images/text-logo.png")} alt="required" style={{width: "100%"}} />
          </div>
          <Typography component="h1" variant="h5">
            Reset Password
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
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <Typography
              color="error"
              className={classes.errorText}
            >
              {errors.email}
              {errors.emailnotfound}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
          </Button>
            <div className={classes.backButtonDiv} onClick={this.goBack}>
              <IconButton className={`${classes.button},${classes.backButton}`} aria-label="Go back">
                <ArrowIcon fontSize="small" /> Back
            </IconButton>
            </div>
          </form>
        </div>
      </Container >
    );
  }
}

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { forgotPassword }
)(withStyles(styles)(ForgotPassword));