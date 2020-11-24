import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import {useStripe, useElements, CardElement, CardNumberElement, CardCvcElement, CardExpiryElement} from '@stripe/react-stripe-js';
import './CardSectionStyles.css' 

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { registerUser, setSnackbar } from "../../actions/authActions";
import MySnackbarContentWrapper from '../SharedComponents/SnackBar';
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
  buttonTest: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
    border: 0,
    outline: 0,
    color: '#fff',
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


const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};


function CardSetupForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const { name, secret, history, classes } = props;


  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      //todo add this to disable submission 
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmCardSetup(props.secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: props.name,
        },
      }
    });

    if (result.error) {
      console.log(result.error);
    } else {
      props.handler(result.setupIntent.payment_method);
      dispatch(setSnackbar(true));
      console.log("SnackBar set");

      props.history.push("/referFriend");                    //TODO: change link to referFriend OR atleast comment
      props.history.push("/account"); 
      // push("/referFriend");       /// referFriend

      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
    }
  };


  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/*<Grid item xs={12} sm={12}>
          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
        </Grid>*/}

        <Grid item xs={12} sm={12}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Grid>

        <Grid item xs={12} sm={12}>
        {/* <Link style={{ padding: 0 }} href="/referFriend"> */}
          {/* <Redirect to="/referFriend"> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.buttonTest}
            disabled={!stripe}
            // to="/referFriend"
            >
              Save Payment Method*
          </Button>
          {/* </Redirect> */}
          {/* </Link> */}
        </Grid>


      </Grid>
      <Typography>
          *By clicking "Save Payment Method" I authorize Thea Health Inc. to send instructions to the financial institution that issued my card to take payments from my card account in accordance with the terms of my agreement with you.
      </Typography>

    </form>
  );
}

CardSetupForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardSetupForm);

