import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  StarIcon,
  Toolbar,
  Typography,
  Link,
  // styles,
  Container,
  Box,
  Divider,
  Snackbar,
} from '@material-ui/core';
import ReferAFriend from '../components/ReferFriend/ReferFriend';
import { setSnackbar} from "../actions/authActions";
import MySnackbarContentWrapper from '../components/SharedComponents/SnackBar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(4, 0, 6, 3),
    // backgroundColor: "#1ce456"
  },
  cardHeader: {
    // backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    backgroundColor: "#1cacc7",
    color: "#fff",
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    margin: theme.spacing(4),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  cardWhole: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'baseline',
    // marginBottom: theme.spacing(2),
    backgroundColor: "#1cacc7",
  },
  MainContent:{
    maxWidth: 500,

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
  },
}));

export function ReferFriend() {
  // constructor(props) {
  //   super(props);
  //   this.state = { }
  // }

  // handleSnackbarClose = () => { 
  //   this.props.setSnackbar(false);
  // }

  // render() {
  //   const { classes, auth, modifyUserData } = this.props;
  //   const { open } = this.state;
  const classes = useStyles();

  return (
    <Container component="main" className={classes.MainContent}>
      <CssBaseline />
      <div className={classes.paper}>
          <div style={{ display: "flex" }}>
            <img src={require("../assets/images/text-logo.png")} alt="required" style={{width: "100%", maxWidth:"350px"}} />
          </div>

          <Typography style={{ paddingBottom: 20, paddingTop: 15 }} component="h1" variant="h5">
            Refer Thea Health to your friend
          </Typography>
          <Divider />

          <Typography style={{ paddingBottom: 0 }} component="h1" variant="subtitle1">
          Invite other providers to join and you both earn a month of free subscription!
          </Typography>

          <Divider />

          <Container maxWidth="md" component="main">
              <Grid container spacing={0} alignItems="flex-end">
                <ReferAFriend/>
              </Grid>
          </Container>

          <Grid container justify="center">
            <Grid item style={{ marginTop: 30 }}>
              <Link style={{ padding: 0 }} href="/login" variant="body2">
                <Typography>Skip to your account/LogIn</Typography>
              </Link>
            </Grid>
          </Grid> 



            {/* <Grid container justify="center" spacing={0} > */}
            {/* <Card style={{
                backgroundColor: "#ffffff",
                padding: 20,
                paddingBottom: 50,
                overflow: "auto",
                height: "100%",
                marginTop: 30,
                }}> */}
                    {/* <Grid   
                        style={{ paddingTop: 0, paddingLeft: 15, paddingRight: 15, paddingBottom: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start"}}>
                        <Typography
                            color="textSecondary"
                            variant="h4"
                        >
                            Refer a Friend
                        </Typography>
                    </Grid> */}

                    {/* <Divider /> */}

                    {/* <Container maxWidth="md" component="main" className={classes.heroContent}>
                        <Typography variant="h6" align="start" color="textSecondary" component="p">
                        Invite other physicians to join, and you’ll both earn a month of free subscription!
                        </Typography>
                    </Container> */}

                    {/* <Container maxWidth="md" component="main">
                        <Grid container spacing={0} alignItems="flex-end">
                          <ReferAFriend/>
                        </Grid>
                    </Container> */}

                    {/* <Button                                           //TODO: make sure that it works
                      fullWidth
                      variant="Outlined"
                      color="#00BCDB"
                      href="/login"
                      className={classes.submit}
                    >
                      Skip to your account/LogIn
                    </Button>    */}

                    {/* <Grid container justify="flex-end">
                      <Grid item style={{ marginTop: 30 }}>
                        <Link style={{ padding: 0 }} href="/login" variant="body2">
                          <Typography>Skip to your account/LogIn</Typography>
                        </Link>
                      </Grid>
                    </Grid>   */}

                {/* </Card> */}
                {/* </Grid> */}
            {/* Footer */}
            {/* <Container maxWidth="md" component="footer" className={classes.footer}> */}
                {/* <Grid container spacing={4} justify="space-evenly">
                {footers.map((footer) => (
                    <Grid item xs={6} sm={3} key={footer.title}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        {footer.title}
                    </Typography>
                    <ul>
                        {footer.description.map((item) => (
                        <li key={item}>
                            <Link href="#" variant="subtitle1" color="textSecondary">
                            {item}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </Grid>
                ))}
                </Grid> */}
                {/* <Box mt={5}>
                <Copyright />
                </Box> */}
            {/* </Container> */}
            {/* End footer */}
            {/* <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.props.showSnackbar}
            autoHideDuration={5000}
            onClose={this.handleSnackbarClose}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="success"
              message="Email has been sent. Please make sure your friend checks their spam folder in case they don't see the email."
            />
        </Snackbar>  */}
      </div>
    </Container>

  );
}

ReferFriend.propTypes = {
  auth: PropTypes.object.isRequired,
  modifyUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
  showSnackbar: state.auth.showSnackbar,
});


export default connect(
  mapStateToProps,
  { setSnackbar }
)(ReferFriend);
