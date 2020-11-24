import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser, setSnackbar, fetchStripeData, fetchPracticeData, getPublicStripeKey, getSetupIntent } from "../../actions/authActions";
import {
  Avatar,
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
import { specialtyFullList } from "../../utils/constant";
import { getServerUrl } from "../../utils/functions";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardSetupForm from "../../components/CardDetails/CardSetupForm";

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
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500"
  }
});

class PaymentInfo extends React.Component {

  constructor() {
    super();
    this.state = {
      secret: "",
      name: "",
      lastName: "",
      errors: {},
      stripePromise: "",
    };  
    this.handler = this.handler.bind(this)
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  async componentDidMount() {

    let key = await this.props.getPublicStripeKey();    
    let stripePromise = await loadStripe(key);

    this.setState({
      stripePromise: stripePromise
    });

    if(this.props.location.data){
      const setupIntent = await this.props.getSetupIntent(this.props.location.data.data);
      this.setState({secret: setupIntent.client_secret})
    }    
    if (this.props.auth.isAuthenticated || !this.props.location.data) {
      // If logged in and user navigates to Register page, should redirect them 
      this.props.history.push("/");
    }    
  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  UNSAFE_componentWillMount () {
    document.addEventListener('keydown', this.handleHitEnter, true)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleHitEnter, true)
  }


  handler() {
    this.setState({
      updateCard: false
    })
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


  render(){
    const { classes } = this.props;
    const { errors, stripePromise } = this.state;    
    const secret = this.state.secret;
    
    let stripeElement = '';
    if(stripePromise){
      stripeElement = <Elements stripe={stripePromise}>
        <CardSetupForm handler={this.handler} name={this.state.name} secret={secret} history={this.props.history}/>
      </Elements>;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div style={{ display: "flex" }}>
            <img src={require("../../assets/images/text-logo.png")} alt="required" style={{width: "100%"}} />
          </div>

          <Typography style={{ paddingBottom: 20 }} component="h1" variant="h5">
            Enter Payment Information
          </Typography>

          <form className={classes.form} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name on card"
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

            </Grid>
          </form>
          
          {stripeElement}

          
          <Grid container justify="flex-end">
            <Grid item style={{ marginTop: 30 }}>
              <Link style={{ padding: 0 }} href="/login" variant="body2">
                <Typography>Skip to your account/LogIn</Typography>
              </Link>
            </Grid>
          </Grid>         
        </div>
      </Container>
    );
  }
}

PaymentInfo.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  fetchStripeData: PropTypes.func.isRequired,
  fetchPracticeData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getPublicStripeKey: PropTypes.func.isRequired,
  getSetupIntent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, setSnackbar, fetchStripeData, fetchPracticeData, getPublicStripeKey, getSetupIntent }
)(withRouter(withStyles(styles)(PaymentInfo)));