import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classnames from "classnames";

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
  } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { registerUser, setSnackbar2, newAccountEmail, newUserInviteEmail } from "../../actions/authActions";     //newUserInviteEmail
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
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


// export default function ReferAFriend() {
//     const classes = useStyles();

export class ReferAFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        name: '',
        email: '',
        text: '',
        errors: {}
        }
    }
    state = {
        open: false,
        questions: ['']
      };

    getInitialState = () => {
    const initialState = {
        errors: {},
    }
    return initialState;
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
        // this.setState({
        //     text: [this.state.name + "This is to create dynamic email message with Invitee name"]
        //   });
        console.log(this.state);
    };
    
    handleSubmit = () => {
        const { id } = this.props.auth;
        const { email, name, text } = this.state;
        console.log("submitting new user");
        if (name != '' && email != '' && text != '') {
            this.props.newUserInviteEmail({        
                userID: id,
                inviteName: this.state.name,
                inviteEmail: this.state.email,
                emailText: this.state.text,
            });
            console.log("Submit" + this.state);
        }

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
          } else if (text === '') {
            let errors = {
                text: "Email message should be updated."
            }
            this.setState({ errors })
          }
        if (name != '' && email != '' && text != '') {
            this.props.setSnackbar2(true);
        }
        // this.setState({ open: true });
    }

    addField = e => {
        e.preventDefault()
        let questions = this.state.questions.concat([''])
        this.setState({
        questions
        })
    }

    componentWillReceiveProps(nextProps) {
        const { errors } = nextProps;
    
        if (errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    
    }

    render() {
        const { classes } = this.props;
        const { modalOpened, open, errors, name, email, text } = this.state;
        
        return (                               //TODO : Refresh the component every time hit SEND (Or not?) -------------------
        <React.Fragment>    
            <div className={classes.root}>
                {/* {this.state.questions.map((question, index) => (
                <span key={index}> */}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField margin="normal" variant="outlined" required fullWidth id="name" name="name" type="name"
                            style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", width: "100%"}}
                            label="Provider Full Name"
                            onChange={this.handleChange}
                            className={classnames("", {
                                invalid: errors.name
                              })}
                            // value=""
                        />
                        <Typography
                            color="error"
                            className={classes.errorText}
                            >
                            {errors.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="normal" variant="outlined" required fullWidth id="email" name="email" type="email"
                            style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", width: "100%"}}
                            label="Email Address"
                            onChange={this.handleChange}
                            className={classnames("", {
                                invalid: errors.email
                              })}
                            // value=""
                        />
                        <Typography
                            color="error"
                            className={classes.errorText}
                            >
                            {errors.email}
                        </Typography>
                    </Grid>
                </Grid> 

                <TextField multiline fullWidth rows={5} required rowsMax="10" margin="normal" variant="outlined" id="text" name="text" type="text"
                    defaultValue={"(Edit message)" + 
                    // "\n\nHey " + name + "," + 
                    "\n\nHey friend," +                     
                    "\n\nI wanted to invite you to try TheaHealth." + 
                    "\n\nIt will allow me to securely send documents and images about patients who I would like to consult you on. Let me know if you choose to try it and I will send you a patient case!" +
                    "\n\nThank you and Happy eConsulting!" }
                    // defaultValue={this.state.name}       //dynamic message addressed w/ name 
                    label="Email message"
                    className={classnames("", {
                        invalid: errors.text
                      })}
                    // value=""
                    onChange={this.handleChange}
                    //className={classes.textField}
                />
                <Typography
                    color="error"
                    className={classes.errorText}
                    >
                    {errors.text}
                </Typography>

                {/* </span>
                ))} */}

                {/* <Button 
                    variant="contained" 
                    // className={`${classes.sendButtonRightAlign} ${classes.addButton}`} 
                    color="inherit" 
                    backgroundColor="primary" 
                    style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto"}} 
                    onClick={this.addField} 
                >
                    <Typography >
                        Add more
                    </Typography>
                </Button> */}

                <Button 
                    variant="contained" 
                    // className={`${classes.sendButtonRightAlign} ${classes.addButton}`} 
                    // disabled={!this.state.isLoading ? false : true} 
                    color="primary" 
                    backgroundColor="primary" 
                    style={{ marginLeft: 0, width:"15%", marginTop:"6px", flexDirection: "row", display: "flex", justifyContent: "auto", float: 'right'}} 
                    onClick={this.handleSubmit} 
                >
                    <Typography >
                        Send
                    </Typography>
                </Button>

                {/* <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Email</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", width: "50%"}}
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            id=""
                            label="Email"
                            name=""
                            value=""
                        />
                    </AccordionDetails>
                    <AccordionDetails>
                        <Button 
                            variant="contained" 
                            // className={`${classes.sendButtonRightAlign} ${classes.addButton}`} 
                            // disabled={!this.state.isLoading ? false : true} 
                            color="primary" 
                            backgroundColor="primary" 
                            style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto"}} 
                            // onClick={this.handleSubmit} 
                        >
                            <Typography >
                                Send
                            </Typography>
                        </Button>
                    </AccordionDetails>
                </Accordion> */}

                {/* <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography className={classes.heading}>Facebook</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            style={{ marginLeft: 0, flexDirection: "row", display: "flex", justifyContent: "auto", width: "50%"}}
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            id=""
                            label="facebook userId"
                            name=""
                            value=""
                        />
                        <Button 
                            variant="contained" 
                            // className={`${classes.sendButtonRightAlign} ${classes.addButton}`} 
                            // disabled={!this.state.isLoading ? false : true} 
                            color="primary" 
                            backgroundColor="primary" 
                            style={{ marginLeft: 20, flexDirection: "row", display: "flex", justifyContent: "auto"}} 
                            // onClick={this.handleSubmit} 
                        >
                            <Typography >
                                Send
                            </Typography>
                            </Button>
                    </AccordionDetails>
                </Accordion> */}
            </div>
        </React.Fragment>
        );
        
    }
};

ReferAFriend.propTypes = {
    auth: PropTypes.object.isRequired,
    newAccountEmail: PropTypes.func.isRequired,     
    newUserInviteEmail: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth.userdata,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { newAccountEmail, newUserInviteEmail, setSnackbar2 }  
  )(withStyles(styles)(ReferAFriend));
