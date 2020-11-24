import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import clsx from 'clsx';
import { readMessages, sendMessages } from "../../actions/chatActions";
import { modifyCase } from "../../actions/caseAction";
import { isEmpty, encodeString, decodeString } from "../../utils/functions";
import { withStyles } from '@material-ui/styles';
import _ from "../../@lodash";
import {
  Grid,
  Button,
  Typography,
  Paper,
  TextField,
  IconButton,
  Hidden,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Avatar
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import PersonIcon from "@material-ui/icons/Person";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    padding: 10,
    marginBottom: 0
  },
  chattingBox: {
    width: "100%",
    height: "37vh",
    boxShadow: "none",
    overflow: 'auto',
  },
  chatSpecialist: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 17,
      // fontWeight: 500,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 25,
    },
     paddingTop: 0, 
     paddingLeft: 10
  },
  chatPatient: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
      // fontWeight: 900,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 22,
    },
  },
  inputWrapper: {
    borderRadius: 24,
    height: "100%",
    backgroundColor: "#F1F1F1",
    boxShadow: "none",
    padding: theme.spacing(1, 2, 1, 2)
  },
  bottom: {
    width: "100%",
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    backgroundColor: "#fff"
  },
  sendMessageItemWrapper: {
    display: "flex",
    float: "right",
    backgroundColor: "#EBF2FB",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    maxWidth: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    },
  },
  receiveMessageItemWrapper: {
    display: "flex",
    float: "left",
    backgroundColor: "#F4F4F4",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    maxWidth: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    },
  },
  buttonCenter:{
    margin: 'auto'
  }
})

export class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      chatList: [],
      channel_id: '',
      currentCase: '',
      clientdata: '',
      openAlert: false,
    };
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { channel_id, currentCase } = this.props;
    this.setState({ channel_id, currentCase });
  }

  componentDidMount() {
    const { channel_id } = this.state;
    this.props.joinToRoom(channel_id);
    this.props.registerHandler(this.onMessageReceived);
    this.readMessage();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentCase) {
      const currentCase = nextProps.currentCase;
      this.setState({ currentCase });
    }
  }

  scrollToBottom = () => {
    this.panel.scrollTo(0, this.panel.scrollHeight);
  }

  readMessage = () => {
    const { channel_id } = this.state;
    const channelData = {
      channel_id: channel_id,
      type: "message"
    };
    this.props.readMessages(channelData);
  }

  onInputChange = (ev) => {
    this.setState({
      messageText: ev.target.value
    });
  }

  onMessageSubmit = (ev) => {
    ev.preventDefault();
    const { messageText, channel_id, currentCase } = this.state;
    if (messageText === '') {
      return;
    }
    
    //When there is no Specialty assigned to a case then display message to PCP
    /*if(!currentCase.senderData && (currentCase.caseData.specialist_id === "0" || !currentCase.caseData.specialist_id)){
      this.setState({
        messageText: '',
        openAlert: true
      });
      return;
    }*/

    
    let newMessageData = {
      channel_id: channel_id,
      sender_id: this.props.userdata.id,
      receiver_id: currentCase.senderData ? currentCase.senderData.id : 0,
      type: "message",
      content: encodeString(messageText),
      user_type: this.props.userdata.user_type,
      specialist_id: currentCase.caseData.specialist_id
    };
    this.setState((prevState) => ({
      chatList: [...prevState.chatList, newMessageData]
    }));
    this.props.sendMessage(channel_id, newMessageData);
    this.props.sendMessages(newMessageData);
    const current_time = new Date();
    const current_timestamp = current_time.getTime();
    let newCaseData = {
      caseId: channel_id,
      last_updated_by_id: this.props.userdata.id,
      is_read: true,
      updated_at: current_timestamp,
      questions: encodeString(messageText),
      is_deleted: false
    };
    
    if(this.props.userdata.user_type === 'PCP'){
      newCaseData['is_read'] = true;
      let caseData = currentCase.caseData, 
        readByOthers = caseData.is_read_by_other;
      if(readByOthers && (_.indexOf(readByOthers, caseData.specialist_id) >= 0)){
        readByOthers = _.pull(readByOthers, caseData.specialist_id);
        newCaseData['is_read_by_other'] = readByOthers;
      }
    }else if(this.props.userdata.user_type === 'Specialty'){
      newCaseData['is_read'] = false;
    }

    this.props.modifyCase(newCaseData);
    this.setState({
      messageText: ''
    });
  }
  
  handleClose = () => {
    this.setState({ openAlert: false });
  }

  onMessageReceived(entry) {
    this.updateChatHistory(entry);
  }

  updateChatHistory(entry) {
    this.setState((prevState) => ({
      chatList: [...prevState.chatList, entry]
    }));
  }

  render() {

    const { classes, readedMessages } = this.props;
    const { messageText, currentCase, openAlert } = this.state;
    let chatList;
    if (this.state.chatList === '') {
      chatList = readedMessages
    } else {
      chatList = readedMessages.concat(this.state.chatList)
    }
    
    const userAvatar = currentCase.senderData && currentCase.senderData.avatar ? currentCase.senderData.avatar.name : null ;
    
    return (
      <div className={classes.root}>
        {/* backgroundColor: "#aeaeae" */}
        <Grid container justify="flex-start" style={{ padding: 10, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
           {userAvatar ? <Avatar src={currentCase.senderData.avatar.name} /> : <PersonIcon style={{ marginTop: 0 }} />}
          {/* <PersonIcon style={{ marginTop: 8 }} /> */}
          {/* <Hidden xsDown> */}
            {!isEmpty(currentCase) && (
              <Typography className={classes.chatSpecialist}>
                {currentCase.caseData.specialty} Specialist
              </Typography>
            )}
          {/* </Hidden> */}
        </Grid>
        <Divider />
        <Grid container justify="center" style={{ height: "89%"}}>
          {!isEmpty(currentCase) && (
            <Typography className={classes.chatPatient}
              style={{ margin: 10, textAlign: "center" }}>
              {currentCase.caseData.patient_name} {currentCase.caseData.specialty} Consultation
            </Typography>
          )}
          <Paper className={classes.chattingBox} ref={(panel) => { this.panel = panel }}>
            {chatList.length > 0
              ? (
                <div>
                  {chatList.map((item, i) => {
                    if (String(item.sender_id) === this.props.userdata.id) {
                      return (
                        <div key={i} style={{ display: "inline-block", marginTop: 10, width: "100%" }}>
                          {item.content?
                            <div className={classes.sendMessageItemWrapper}>
                              <label style={{ marginTop: -38, marginLeft: -10, height: 20 }}>
                                Me
                              </label>
                              <Typography variant="inherit">
                                {decodeString(item.content)}
                              </Typography> 
                            </div>: null 
                          }
                        </div>
                      )
                    } 
                    else {
                      return (
                        <div key={i} style={{ display: "inline-block", marginTop: 10, width: "100%" }}>
                        {item.content?
                          <div className={classes.receiveMessageItemWrapper}>
                            {!isEmpty(currentCase) && (
                              <label style={{ marginTop: -38, marginLeft: -10, height: 20 }}>{/*currentCase.senderData? currentCase.senderData.lastName : null*/}{item.lastName}</label>
                            )}
                            <Typography variant="inherit">{decodeString(item.content)}</Typography>
                          </div>: null
                            }
                        </div>
                      )
                    }
                  })}
                </div>
              ) : (
                <div></div>
              )}
          </Paper>
          <form onSubmit={this.onMessageSubmit} className={clsx(classes.bottom, "py-16 px-8")}>
            <Grid container justify="center" spacing={0}>
              <Grid item xs={10} sm={11} md={11}>
                <Paper className={clsx(classes.inputWrapper, "flex items-center relative")}>
                  <TextField
                    autoFocus={false}
                    autoComplete="off"
                    id="message-input"
                    className={clsx(classes.typeYourMessage, "flex-1")}
                    className="flex-1"
                    InputProps={{
                      disableUnderline: true,
                      classes: {
                        root: "flex flex-grow flex-shrink-0 ml-16 mr-48 my-8",
                        input: ""
                      },
                      placeholder: "Type your message"
                    }}
                    InputLabelProps={{
                      shrink: false,
                      className: classes.bootstrapFormLabel
                    }}
                    onChange={this.onInputChange}
                    style={{ width: "100%" }}
                    value={messageText}
                    multiline
                    rows={4}
                    rowsMax={10}
                  />
                </Paper>
              </Grid>
              <Grid item xs={2} sm={1} md={1} style={{position: "relative"}}>
                <IconButton className="absolute right-0 top-0" type="submit" style={{position: "absolute", bottom: 0}}>
                  <SendIcon className="text-24" color="action" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose }
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              No specialist assigned to this case yet. Please try later!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="contained" color="primary" className={classes.buttonCenter}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Chat.propTypes = {
  readMessages: PropTypes.func.isRequired,
  sendMessages: PropTypes.func.isRequired,
  modifyCase: PropTypes.func.isRequired,
  userdata: PropTypes.object.isRequired,
  readedMessages: PropTypes.array.isRequired,
  currentCase: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata,
  readedMessages: state.chat.readMessages,
  currentCase: state.case.currentCase,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { readMessages, sendMessages, modifyCase }
)(withStyles(styles)(Chat));