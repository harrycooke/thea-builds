import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { registerUser, fetchPracticeData, getPublicStripeKey } from "../../actions/authActions";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  MenuItem,
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import classnames from "classnames";
import { specialtyFullList, practiceList } from "../../utils/constant";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);


//const stripePromise = getPublicStripeKey().then(key => loadStripe(key));


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500"
  }
});

export class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      practice: "",
      practiceId: 0,
      role: "",
      specialty: "",
      email: "",
      password: "",
      password2: "",
      isAdmin: false,
      maxUser: 1,
      displayText: 0, 
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeUserRole = e => {
    if (e.target.value === 'PCP') {
      this.setState({ specialty: "none" })
    } 
    this.setState({ role: e.target.value})
  }

  onChangeSpecialty = e => {
    e.preventDefault();
    this.setState({ specialty: e.target.value})
  }

  onChangePractice = e => {
    e.preventDefault();
    this.setState({ practice: e.target.value})
  }

  onChangeIsAdmin = e => {
    e.preventDefault();
    this.setState({ isAdmin: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();
    console.log("submitting");
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.role,
      specialty: this.state.specialty,
      practiceId: this.state.practiceId,
      practice: this.state.practice,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      isAdmin: this.state.isAdmin,
      maxUser: this.state.maxUser
    };
    
    console.log("registering user")
    this.props.registerUser(newUser, this.props.history); 
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;

    if (errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

  }

  UNSAFE_componentWillMount () {
    document.addEventListener('keydown', this.handleHitEnter, true)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleHitEnter, true)
  }
  
  handleHitEnter(e) {
    const ENTER_KEY_CODE = 13
    if (e.target.name === 'my-input' &&
       (e.key === 'Enter' || e.keyCode === ENTER_KEY_CODE)) {
        e.stopPropagation()
    }
  }
  
  handleChangeInput(e) {
    this.setState({ myInput: e.target.value })
  }

  
  async componentDidMount() {                                             

    const { max_user, practice_id, is_admin } = this.props.match.params;


    if(is_admin == 'true'){
      this.setState({ isAdmin: true});
    } else{
      this.setState({ isAdmin: false});
    }
    //console.log("practice is: " + practice);

    if (practice_id) {
      const practiceId = parseInt(practice_id, 10);
      this.props.fetchPracticeData(practiceId);
      console.log(practice_id);
      this.setState({ practiceId: practiceId});
      //const practice = "CHANGE THIS";//getPracticeWithId(practiceId);
      console.log("setting practice");
      //console.log(this.props.auth);

      if(this.props.auth && this.props.auth.practiceData && this.props.auth.practiceData.id && this.props.auth.practiceData.practice_name){
        this.setState({ practice: this.props.auth.practiceData.practice_name});
        this.setState({ displayText: true});
      }
    }

    if (max_user) {
      const maxUser = parseInt(max_user, 10);
      this.setState({ maxUser: maxUser});
    }

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/inbox/cases");              
    }

  }

  render(){
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
            {this.state.practice} {"Sign Up"}
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.onChange}
                  className={classnames("", {
                    invalid: errors.firstName
                  })}
                />
                <Typography
                  color="error"
                  className={classes.errorText}
                >
                  {errors.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={this.onChange}
                  className={classnames("", {
                    invalid: errors.lastName
                  })}
                />
                <Typography
                  color="error"
                  className={classes.errorText}
                >
                  {errors.lastName}
                </Typography>
              </Grid>
              {
                (this.state.displayText == 0 && this.state.isAdmin) && (
                <Grid item xs={12}>
                  <TextField                       
                    variant="outlined"
                    required
                    fullWidth
                    id="practice"
                    label="Practice Name"
                    name="practice"
                    autoComplete="practice"
                    value={this.state.practice}
                    onChange={this.onChange}
                    className={classnames("", {
                      invalid: errors.practice
                    })}
                  />
                  <Typography
                    color="error"
                    className={classes.errorText}
                  >
                    {errors.practice}
                  </Typography>
                  {/* TODO: Hide it for a new user to register but right now considering we will send out all URLs */}
                  {/* TODO: Style the text below 
                  <p> If you have a different practice name, contact TheaHealth!</p>    */}          
                </Grid>
                  )
              }
              <Grid item xs={12}>
                <TextField
                  select
                  variant="outlined"
                  // required
                  fullWidth
                  id="role"
                  label="Select Occupation"
                  name="role"
                  autoComplete="role"
                  value={this.state.role}
                  onChange={this.onChangeUserRole}
                  className={classnames("", {
                    invalid: errors.role
                  })}
                >
                  <MenuItem value={'PCP'}>Primary Care Physician</MenuItem>
                  <MenuItem value={'Specialty'}>Specialist</MenuItem>

                </TextField>
                <Typography
                  color="error"
                  className={classes.errorText}
                >
                  {errors.role}
                </Typography>
              </Grid>
              {
                this.state.role === 'Specialty' && (
                  <Grid item xs={12}>
                    <TextField
                      select
                      variant="outlined"
                      required
                      fullWidth
                      id="specialty"
                      label="Select your specialty"
                      name="specialty"
                      autoComplete="specialty"
                      value={this.state.specialty}
                      onChange={this.onChangeSpecialty}
                      className={classnames("", {
                        invalid: errors.specialty
                      })}
                    >
                      {specialtyFullList.map( specialty => (
                        <MenuItem key={specialty.value} value={specialty.value}>{specialty.label}</MenuItem>
                      ))}
                    </TextField>
                    <Typography
                      color="error"
                      className={classes.errorText}
                    >
                      {errors.specialty}
                    </Typography>
                  </Grid>
                )
              }
           
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.onChange}
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <Typography
                  color="error"
                  className={classes.errorText}
                >
                  {errors.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.onChange}
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <Typography
                  color="error"
                  className={classes.errorText}
                >
                  {errors.password}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  onChange={this.onChange}
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <Typography
                  color="error"
                  className={classes.errorText}
                >
                  {errors.password2}
                </Typography>
              </Grid>

              <Grid item xs={12}>

                <Typography                                       //Not removing them for now
                  color="error"
                  className={classes.errorText}
                >
                  {errors.isAdmin}
                </Typography>
              </Grid>
              {
                this.state.isAdmin === true && (
                  <div>
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Proceed to payment information
                </Button> 
                <Typography variant="p" style={{ width:"100%", marginLeft: "46%", marginBottom: "5px"}}>Or</Typography>
                </div>
                )
              }
              {                                                      //TODO: Make sure this button registers before redirecting to SignIn page
                this.state.isAdmin === true && (
                  <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                >
                  Register and skip to your account/LogIn
                </Button> 
                )
              }

            </Grid>

            {this.state.isAdmin !== true && (
            <Button                                                   //Has to be hidden for Admin or by Default
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            )}
            <Grid container justify="flex-end">
              <Grid item style={{ marginTop: 30 }}>
                <Link style={{ padding: 0 }} href="/login" variant="body2">
                  <Typography>Already have an account? Sign in</Typography>
                </Link>
              </Grid>
            </Grid>
          </form> 
        </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  fetchPracticeData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchPracticeData, registerUser }
)(withRouter(withStyles(styles)(SignUp)));