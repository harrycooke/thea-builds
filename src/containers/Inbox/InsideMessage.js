import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import {
  Grid,
  Card,
  Typography,
  Fab,
  IconButton,
  Modal
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import socket from "../../socket";
import { fetchUserData } from "../../actions/authActions";
import { setCurrentCase, modifyCase } from "../../actions/caseAction";
import Chat from "../../components/Inbox/Chat";
import InsideMessageRightCard from "../../components/Inbox/InsideMessageRightCard";
import DoubleArrowLeftIcon from "../../assets/icons/DoubleArrowLeftIcon.svg";
import DoubleArrowRightIcon from "../../assets/icons/DoubleArrowRightIcon.svg";
import styles from "../../assets/styles/InsideMessageStyles";
import PDF from "../PDF/index"
import { sendAmplitudeData } from "../../utils/amplitude";

class InsideMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      client: socket(),
      currentCase: '',
      displayModal: false,
      closed: false,
      documentModal: false,
      // displayReOpenModal: false,
      downloadPDF: true 
    }
  }

  handleCollapse = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleColseButton = () => {
    this.setState({
      displayModal: true,
      downloadPDF: false
    })
  }

  // handleReopenCase = () => {
  //   this.setState({
  //     displayReOpenModal: true,
  //     downloadPDF: false
  //   })
  // }

  handleClose = () => {
    this.setState({
      displayModal: false,
      // displayReOpenModal: false,
      // downloadPDF: true
    })
  }

  reopenCase = () => {
    const { channel_id } = this.props.match.params;
    const current_time = new Date();
    const current_timestamp = current_time.getTime();
    const newCaseData = {
      caseId: channel_id,
      last_updated_by_id: this.props.userdata.id,
      is_read: true,
      updated_at: current_timestamp,
      is_deleted: false
    };
    sendAmplitudeData('ReOpen a case', newCaseData)
    this.props.modifyCase(newCaseData);
    this.setState({
      // displayReOpenModal: false,
      closed: false
    });
    const currentCaseCondition = {
      case_id: channel_id,
      currentUserRole: this.props.userdata.user_type
    }
    setTimeout(() => {
      this.props.setCurrentCase(currentCaseCondition);
    }, 100)
  }

  downloadPDF = () => {
    this.child.callDownloadPDF();
  }

  handleCloseCase = () => {
    const { caseData } = this.state.currentCase;
    const { channel_id } = this.props.match.params;
    const current_time = new Date();
    const current_timestamp = current_time.getTime();
    const newCaseData = {
      caseId: channel_id,
      last_updated_by_id: this.props.userdata.id,
      is_read: true,
      updated_at: current_timestamp,
      is_deleted: true,
      //emailToID: caseData.specialist_id && caseData.specialist_id !== '0' ? caseData.specialist_id : null
      //emailToID: caseData.specialty && caseData.provider_id !== '' ? caseData.provider_id : null
      emailToID: caseData.specialist_id && caseData.specialist_id !== '0' ? caseData.specialist_id : null
    };
    sendAmplitudeData('Closed a case', newCaseData)
    this.props.modifyCase(newCaseData);
    this.setState({
      displayModal: false,
      closed: true
    });
    const currentCaseCondition = {
      case_id: channel_id,
      currentUserRole: this.props.userdata.user_type
    }
    setTimeout(() => {
      this.props.setCurrentCase(currentCaseCondition);
    }, 100)

    this.setState({ downloadPDF:true });
    setTimeout(() => {
      this.downloadPDF();
    }, 2000);

    //window.open(`/pdf_${channel_id}`, "_blank") //to open new page

    // this.props.history.push(`/pdf_${channel_id}`)
  }

  handleCloseDocumentModal = () => this.setState({ documentModal: false, downloadPDF:true })

  componentDidMount() {
    const { channel_id } = this.props.match.params;
    const currentCaseCondition = {
      case_id: channel_id,
      currentUserRole: this.props.userdata.user_type
    }
    this.props.setCurrentCase(currentCaseCondition);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentCase) {
      const currentCase = nextProps.currentCase;
      const closed = currentCase && currentCase.caseData && currentCase.caseData.is_deleted;
      this.setState({ currentCase, closed });
    }
  }

  sendMessage = (room, newMessageData) => {
    const { client } = this.state;
    client.message(room, newMessageData)
  }

  joinToRoom = (nameOfRoom) => {
    const { client } = this.state;
    client.join(nameOfRoom)
  }

  render() {
    const { classes, userdata } = this.props;
    const { expanded, displayModal, closed, documentModal } = this.state;
    const { channel_id } = this.props.match.params;
    let prevRoute = this.props.location.state && this.props.location.state.from;
    let route = "/inbox/".concat(prevRoute);
    return (
      <div className={classes.container}>
        <Grid container justify="center" style={{ height: "100%" }}>
          <Grid item xs={12} sm={12} md={expanded ? 11 : 5} className={classes.mainBody}>
            <Grid container justify="flex-start" style={{ width: "100%" }}>
              <Grid item xs={7} >
                <div style={{ display: "flex" }}>
                  <Link to={route}>
                    <Fab
                      color="inherit"
                      aria-label="add"
                      className={classes.addButton}
                    >
                      <ArrowBackIcon color="action" />
                    </Fab>
                  </Link>
                  <Typography
                    color="textSecondary"
                    className={classes.backFAB}
                    // variant="h6"
                    // fontSize= "1"
                    // style={{ margin: 5, marginLeft: 10 }}
                  >
                      Back to Inbox
                  </Typography>
                </div>
                {/*closed && (
                  <Fab
                    color="default"
                    variant="extended"
                    aria-label="close-case"
                    className={classes.reopenButton}
                    onClick={this.handleReopenCase}
                    style={{
                      display: userdata.user_type === "PCP"
                        ? "flex"
                        : "none"
                    }}
                  >
                    Reopen Case
                    </Fab>)*/}
              </Grid>
              <Grid item xs={5} >
                {closed ? (
                  <div>
                    <Fab
                      color="default"
                      variant="extended"
                      aria-label="close-case"
                      className={classes.closeButton}
                      onClick={this.reopenCase}
                      style={{
                        display: userdata.user_type === "PCP"
                          ? "flex"
                          : "none"
                      }}
                    >
                    Reopen Case
                    </Fab>
                    
                    <Fab
                      color="default"
                      variant="extended"
                      aria-label="close-case"
                      className={`${classes.closeButton}`}
                      onClick={this.downloadPDF}
                      style={{
                        backgroundColor: "#b2b2b2",
                        marginTop: 10
                      }}
                    >
                      Download PDF
                    </Fab>
                  </div>
                ) : (
                    <Fab
                      color="default"
                      variant="extended"
                      aria-label="close-case"
                      className={classes.closeButton}
                      onClick={this.handleColseButton}
                      style={{
                        display: userdata.user_type === "PCP"
                          ? "flex"
                          : "none"
                      }}
                    >
                      Close Case
                    </Fab>
                  )
                }
              </Grid>
              {/* <Grid item xs={1}>
                <IconButton style={expanded
                  ? { marginTop: -5, marginLeft: "70%" }
                  : { marginTop: -5, marginLeft: 15 }
                } onClick={this.handleCollapse}>
                  <img
                    alt="required"
                    src={expanded
                      ? DoubleArrowRightIcon
                      : DoubleArrowLeftIcon} />
                </IconButton>
              </Grid> */}
            </Grid>
            <Grid container justify="center" style={{ height: "95%", width: "100%" }}>
              <Grid item xs={expanded ? 6 : 12} style={{ paddingTop: 10, height: "100%" }}>
                <Card className={classes.leftCard}>
                  <Chat
                    channel_id={channel_id}
                    joinToRoom={this.joinToRoom}
                    sendMessage={this.sendMessage}
                    registerHandler={this.state.client.registerHandler}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={expanded ? 1 : 7} style={{ height: "100%" }}>
            <InsideMessageRightCard
              expanded={expanded}
            />
          </Grid>
        </Grid>

{/*-----------------display Modal Close DocumentModal ---------------*/}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={displayModal}
          onClose={this.handleClose}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className={classes.modalContainer}>
            <Card className={classes.modalCard}>
              <Typography
                className={classes.modalCardTitle}
              >
                Are you sure you want to close this case?
              </Typography>
              <Fab
                color="default"
                variant="extended"
                aria-label="close-case"
                className={classes.closeCaseButtonInModal}
                onClick={this.handleCloseCase}
              // disabled={true}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontWeight: "bold", fontFamily: "Open Sans", fontSize: 18, color: "#3F3F3F" }}>Close Consult</p>
                  <p style={{ fontWeight: "500", fontFamily: "Open Sans", fontSize: 14, color: "#3F3F3F" }}>Export PDF for Billing</p>
                </div>
              </Fab>
              <Typography
                className={classes.modalCardDetail}
              >
                Closed cases will always be available for reference in the “Closed Cases” tab in your inbox.
              </Typography>
            </Card>
            <div style={{
              justifyContent: "center",
              display: "flex",
              paddingTop: 5
            }}>
              <Fab
                variant="round"
                className={classes.modalCloseButton}
                onClick={this.handleClose}>
                <CloseIcon />
              </Fab>
            </div>
          </div>
        </Modal>

{/*-----------------ReOpen case modal ---------------*/}
        {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={displayReOpenModal}
          onClose={this.handleClose}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className={classes.modalContainer}>
            <Card className={classes.modalCard}>
              <Typography
                className={classes.modalCardTitle}
              >
                Are you sure you want to Reopen this case?
              </Typography>
              <Fab
                color="default"
                variant="extended"
                aria-label="close-case"
                className={classes.closeCaseButtonInModal}
                onClick={this.reopenCase}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontWeight: "bold",fontFamily: "Open Sans", fontSize: 18, color: "#3F3F3F" }}>ReOpen Consult</p>
                  <p style={{ fontWeight: "500", fontFamily: "Open Sans", fontSize: 14, color: "#3F3F3F" }}>Export PDF for Billing</p>
                </div>
              </Fab>
              <Typography
                className={classes.modalCardDetail}
              >
                ReOpen cases will always be available for reference in the “Open Cases” tab in your inbox.
              </Typography>
            </Card>
            <div style={{
              justifyContent: "center",
              display: "flex",
              paddingTop: 5
            }}>
              <Fab
                variant="round"
                className={classes.modalCloseButton}
                onClick={this.handleClose}>
                <CloseIcon />
              </Fab>
            </div>
          </div>
        </Modal> */}


{/*-----------------CloseDocumentModal ---------------*/}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={documentModal}
          onClose={this.handleCloseDocumentModal}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className={classes.modalDocumentContainer}>
            <Card className={classes.modalCard}>
              <PDF channel_id={channel_id} />
            </Card>
            <div style={{
              justifyContent: "center",
              display: "flex",
              paddingTop: 5
            }}>
              <Fab
                variant="round"
                className={classes.modalCloseButton}
                onClick={this.handleCloseDocumentModal}>
                <CloseIcon />
              </Fab>
            </div>
          </div>
        </Modal>
        { this.state.downloadPDF &&
          <Card className={classes.modalCard} style={{display: 'none'}}>
            <PDF channel_id={channel_id} onRef={ref => (this.child = ref)}/>
          </Card>
        }
        {/*<ConfirmationDialog
          message="Are you sure you want to Reopen this case?"
          title="Reopen Case"
          okOperationDialog={this.reopenCase}
          handleClose={this.handleReopenCase}
          dialogState={this.state.displayReOpenModal} />*/}

      </div>
    );
  }
}

InsideMessage.propTypes = {
  userdata: PropTypes.object.isRequired,
  currentCase: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  setCurrentCase: PropTypes.func.isRequired,
  modifyCase: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata,
  currentCase: state.case.currentCase,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { setCurrentCase, fetchUserData, modifyCase }
)(withStyles(styles)(InsideMessage));
