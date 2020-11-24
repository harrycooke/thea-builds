import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  registerUser,
  setSnackbar,
  fetchPracticeData,
  fetchStripeData,
  modifyPracticeData,
  getPublicStripeKey,
  getSetupIntent
} from "../../actions/authActions";
import {
  Avatar,
  Button,
  Radio,
  RadioGroup,
  CardActions,
  CardContent,
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
  Fab,
  Card,
  CardHeader,
  Divider,
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from "@material-ui/icons/Close";

import classnames from "classnames";
import { specialtyFullList } from "../../utils/constant";
import { getServerUrl } from "../../utils/functions";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardSetupForm from "../CardDetails/CardSetupForm";
import CircularProgress from '../SharedComponents/CircularProgress';





const styles = theme => ({
  root: {},
  details: {
    display: 'flex',
    flexDirection: "column",
    margin: "1.2em"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: "1.2em"

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
  },
});

class CardDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      secret: "",
      name: "",
      lastFour: "",
      brand: "",
      updateCard: false,
      errors: {},
      stripeKey: "",
      paymentMethod: "",
      stripePromise: ""
    };
    
    this.handler = this.handler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  async componentDidMount() {
    const response = await this.props.fetchStripeData(this.props.auth.userdata.practice_id);
    const response2 = await this.props.fetchPracticeData(this.props.auth.userdata.practice_id);

    const { classes, auth } = this.props;

    if(this.props.auth.userdata.is_admin == true && !this.props.auth.practiceData.stripe_id){
      let practiceData = {
        practiceId: this.props.auth.userdata.practice_id,
        stripeId: this.props.auth.practiceData.stripe_id
      }
      await this.props.modifyPracticeData(practiceData); //get new stripe id
      //todo: set loading on element until this resolves (or at least disable add card button redux state should be preset)
    } 

    let key = await this.props.getPublicStripeKey();    
    let stripePromise = await loadStripe(key);

    this.setState({
      stripeKey: key,
      stripePromise: stripePromise
    });
  }

  handler(paymentMethod) {
    try{
      this.props.fetchStripeData(this.props.auth.userdata.practice_id);
      this.setState({
        updateCard: false,
      })

    } catch (error){
      console.log(error);
    }

  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  UNSAFE_componentWillMount () {
    document.addEventListener('keydown', this.handleHitEnter, true)
    //this.setState({ updateCard: false });
    const { classes, auth } = this.props;
    this.props.fetchPracticeData(this.props.auth.userdata.practice_id);

    this.props.fetchStripeData(this.props.auth.userdata.practice_id);

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

  canDisplayCard() {
    //may be better to just update state here
    //also must be a cleaner way to do this 
    if (this.props.auth.stripeData){
      if (this.props.auth.stripeData.data){
        if (this.props.auth.stripeData.data[0]){
          const cardData = this.props.auth.stripeData.data[0]
          if (cardData.billing_details && cardData.card){
            if (cardData.billing_details.name && cardData.card.last4 && cardData.card.brand){
              return true;
            }
          }
        }
      }
    } else {
      return false;
    }
  }


  async handleSubmit() {
    this.setState({ updateCard: true });
    
    const setupIntent = await this.props.getSetupIntent(this.props.auth.practiceData);
    this.setState({secret: setupIntent.client_secret})
  }

  render(){
    const { classes, auth } = this.props;
    const { errors, stripePromise } = this.state;

    const secret = this.state.secret;
    return (
    <div>
    <Card className={classes.root}>
        <CardHeader
          title="Payment Information"
        />
        <Divider />
        <CircularProgress isLoading={this.props.auth.loading} />
        { (this.state.updateCard)  &&
        (<div className={classes.details}>
          <Typography style={{ marginBottom: 20 }}>
             Please add your card details below.
          </Typography>
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
          <Elements stripe={stripePromise}>
           <CardSetupForm handler={this.handler} name={this.state.name} secret={secret} history={this.props.history}/>
          </Elements>
        </div>
        )}
        { (this.props.auth.practiceData.stripe_id && this.props.auth.stripeData && !this.props.auth.loading && !this.state.updateCard) &&       
        (<div>
          {this.canDisplayCard() ? (
          <div style={{ marginTop: '1rem', marginLeft: '1rem', marginBottom: '1rem', paddingBottom: '0' }}>
            <Typography variant="h6" component="h2">
              Card Details:
            </Typography>
            <Typography color="textSecondary">
              {this.props.auth.stripeData.data[0].billing_details.name}'s {this.props.auth.stripeData.data[0].card.brand}
            </Typography>
            <Typography>
              Card Number: **** {this.props.auth.stripeData.data[0].card.last4} 
            </Typography>
          </div>         
          ) : (
          <div style={{ marginTop: '1rem', marginLeft: '1rem', marginBottom: '1rem', paddingBottom: '0' }}>
            <Typography variant="h6" component="h2">
              No card on file. 
            </Typography>
          </div>    
        )} 

          <CardActions style={{ marginTop: '0rem', marginLeft: '0.5rem', marginBottom: '1rem' }}>
              <Button
                //marginLeft="3"
                color="primary"
                variant="contained"
                onClick={this.handleSubmit}
              >
              {this.canDisplayCard() ? 'Update' : 'Add'} Card
            </Button>
            </CardActions>
        </div>
        )}
    </Card>

    </div>

    );
  }
}

CardDetails.propTypes = {
  registerUser: PropTypes.func.isRequired,
  fetchPracticeData: PropTypes.func.isRequired,
  modifyPracticeData: PropTypes.func.isRequired,
  fetchStripeData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
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
  { fetchPracticeData, modifyPracticeData, fetchStripeData, registerUser, setSnackbar, getPublicStripeKey, getSetupIntent }
)(withRouter(withStyles(styles)(CardDetails)));