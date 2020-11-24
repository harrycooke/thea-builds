import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MySnackbarContentWrapper from '../../components/SharedComponents/SnackBar';
import {
  Card,
  Grid,
  Typography,
  Button,
  Hidden,
  MenuItem,
  TextField,
  Divider,
  InputBase,
  InputAdornment,
  Snackbar,
} from '@material-ui/core';
import Media from 'react-media';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from '@material-ui/icons/Create';

import _ from "../../@lodash";
import { fetchAllCases, setCurrentCase, modifyCase, setSnackbar } from "../../actions/caseAction";
import { fetchAllDrafts, setCurrentDraft, removeDraft } from "../../actions/draftActions";
import MessageList from "../../components/Inbox/MessageList";
import styles from "../../assets/styles/InboxStyles";
import { specialtyList } from "../../utils/constant";
import ConfirmationDialog from "../../components/SharedComponents/ConfirmationDialog"
import { removeFileFromS3 } from '../../utils/s3';
import CircularProgress from '../../components/SharedComponents/CircularProgress';

import { sendAmplitudeData } from '../../utils/amplitude';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class Inbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToChat: false,
      redirectToAssignConsult: false,
      cases_id: null,
      specialty: null,
      redirectToCreateCase: false,
      readAllCases: [],
      readAllDrafts: [],
      selectedSpecialty: '',
      searchResultsForCases: [],
      searchResultsForDrafts: [],
      confirmDraftDelete: false,
      files: []
    }
    this.removeDraft = this.removeDraft.bind(this)
    this.openDraftDialog = this.openDraftDialog.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleTrClicked = (id, isDraft, caseData) => {
    if (isDraft) {
      this.setState({
        redirectToCreateCase: true,
        selectedClientID: id
      });
      this.props.setCurrentDraft({ case_id: id })
    } else {
      let newCaseData = {
        caseId: id,
        last_updated_by_id: this.props.userdata.id
      }
      if(this.props.userdata.id === caseData.created_by_id){
        newCaseData['is_read'] = true;
      }else{
        let readByOthers = caseData.is_read_by_other ? caseData.is_read_by_other : [];
        let ifIndex = _.indexOf(readByOthers, this.props.userdata.id);
        if(ifIndex < 0){
          readByOthers.push(this.props.userdata.id);
          newCaseData['is_read_by_other'] = readByOthers;
        }
      }
      this.props.modifyCase(newCaseData);
      this.setState({
        redirectToChat: true,
        selectedClientID: id
      });
    }
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
    let selectedSpecialty = e.target.value;
    const { readAllCases, readAllDrafts } = this.state;
    if (selectedSpecialty !== '') {
      let searchResultsForCases = readAllCases;
      let searchResultsForDrafts = readAllDrafts;
      // debugger;
      if(selectedSpecialty != "All Specialties"){                                         //Need to bug-proof here. If the text value to if condition is changed, the condition will break and no value returned.
        searchResultsForCases = _.filter(readAllCases, function (item) {
          return item.caseData.specialty.toLowerCase().indexOf(selectedSpecialty.toLowerCase()) > -1 || item.caseData.patient_name.toLowerCase().indexOf(selectedSpecialty.toLowerCase()) > -1;
        });
        searchResultsForDrafts = _.filter(readAllDrafts, function (item) {
          return item.draftData.specialty.toLowerCase().indexOf(selectedSpecialty.toLowerCase()) > -1 || item.draftData.patient_name.toLowerCase().indexOf(selectedSpecialty.toLowerCase()) > -1;
        });  
      }
      this.setState({ searchResultsForCases, searchResultsForDrafts });
    } else {
    // else if (selectedSpecialty == '') {
    //   this.setState({
    //     searchResultsForCases: readAllCases,
    //     searchResultsForDrafts: readAllDrafts
    //   });
    // }
    //   else {
      this.setState({   
        searchResultsForCases: readAllCases,
        searchResultsForDrafts: readAllDrafts
      });
    }
  }

  componentDidMount() {
    const currentUserData = {
      currentUserId: this.props.userdata.id,
      currentUserRole: this.props.userdata.user_type,
      isDeleted: false,
      isCompleted: false
    }
    sendAmplitudeData('Open Inbox page', currentUserData)
    setTimeout(() => {
      this.props.fetchAllCases(currentUserData);
      this.props.userdata.user_type === 'PCP' && this.props.fetchAllDrafts(currentUserData);
    }, 500)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { readAllCases, readAllDrafts, errors } = nextProps;
    if (errors) {
      this.setState({
        errors: errors
      });
    }
    this.setState({
      readAllCases,
      readAllDrafts,
      searchResultsForCases: readAllCases,
      searchResultsForDrafts: readAllDrafts
    })
    if ((nextProps.isDraftDeleted !== this.props.isDraftDeleted) && nextProps.isDraftDeleted) {
      const currentUserData = {
        currentUserId: this.props.userdata.id,
        currentUserRole: this.props.userdata.user_type,
        isDeleted: false,
        isCompleted: false
      }
      setTimeout(() => {
        this.props.fetchAllCases(currentUserData);
        this.props.userdata.user_type === 'PCP' && this.props.fetchAllDrafts(currentUserData);
      }, 500)
    }
  }
  removeDraft() {
    this.setState({ confirmDraftDelete: false })
    const { filesDraft, draftId } = this.state;
    if (filesDraft && filesDraft.length) {
      filesDraft.map(async (fileObj, index) => {
        if (fileObj && fileObj.name) {
          return await removeFileFromS3(fileObj, index);
        }
      })
    }
    this.props.removeDraft({ case_id: draftId })

  }
  handleClose() { this.setState({ confirmDraftDelete: false }) }

  handleSnackbarClose = () => { 
    this.props.setSnackbar(false);
  }

  openDraftDialog(draftData) {
    this.setState({ confirmDraftDelete: true, draftId: draftData.case_id, filesDraft: draftData.files && draftData.files.length ? draftData.files : [] })
  }

  handleAssignConsult = (id, specialty) => {
    if(id){
      this.setState({redirectToAssignConsult: true, cases_id: id, specialty: specialty});
    }
  }

  render() {
    const { classes, userdata, readAllDrafts } = this.props;
    const {
      redirectToChat,
      redirectToCreateCase,
      selectedClientID,
      selectedSpecialty,
      searchResultsForCases,
      searchResultsForDrafts,
      redirectToAssignConsult,
      cases_id,
      specialty
    } = this.state;
    if (redirectToChat) {
      return (<Redirect to={{
        pathname: `/insidemessage/room_${selectedClientID}`,
        state: { from: 'cases' }
      }} />)
    }
    if (redirectToCreateCase) {
      return (<Redirect to={{
        pathname: `/edit-new-case-${selectedClientID}`,
      }} />)
    }
    if(redirectToAssignConsult){
      return (<Redirect to={{
        pathname: `/assign-consult/case_${cases_id}/specialty_${specialty}`,
      }} />)
    }

    let rows = [...searchResultsForDrafts, ...searchResultsForCases];

    return (
      <div className={classes.container}>
        <CircularProgress isLoading={this.props.draftLoader} />
        <CircularProgress isLoading={this.props.caseLoader} />
        {/* 
        <div>
          <Media queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)"
          }}>
            {matches => (
              <Fragment>
                {matches.small && <p>I am small!</p> && <style>  </style>}
                {matches.medium && <p>I am medium!</p>}
                {matches.large && <p>I am large!</p>}
              </Fragment>
            )}
          </Media>
        </div> */}

        {/* <Hidden lgUp>
          <Grid container spacing={4} style={{ paddingBottom: 20 }}>
            <Grid item xs={5}
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "flex-start"
              }}
            >
              <Button
                color="primary"
                component={AdapterLink}
                to="/inbox/cases"
                variant="contained"
                style={{
                  fontSize: 16,
                  width: 130,
                  // margin: 5
                }}>
                Open Cases
              </Button>
              <Button
                color="default"
                component={AdapterLink}
                to="/inbox/closed_cases"
                variant="contained"
                style={{
                  fontSize: 16,
                  backgroundColor: "#ffffff",
                  width: 130,
                  marginLeft: 20,
                }}>
                Closed Cases
              </Button>
              {readAllDrafts && readAllDrafts.length ?
                <Button
                  color="default"
                  component={AdapterLink}
                  to="/inbox/drafts"
                  variant="contained"
                  style={{
                    fontSize: 16,
                    backgroundColor: "#ffffff",
                    width: 80,
                    marginLeft: 32,
                  }}>
                  Drafts
              </Button> : null}
            </Grid>
            <Grid item xs={7}
              style={{
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              {userdata.user_type === "PCP" && (
                <Button
                  color="primary"
                  component={AdapterLink}
                  to="/create-new-case"
                  variant="contained"
                  style={{
                    fontSize: 16,
                    marginLeft: 32,
                    height: 45
                  }}>
                  Create a new Case
              </Button>)}
            </Grid>
          </Grid>
        </Hidden> */}
        <Grid container justify="flex-start" spacing={0} className={classes.cardContainer} >
          <Grid item xs={12}>
            <Card style={{
              backgroundColor: "#ffffff",
              padding: 20,
              overflow: "auto",
              height: "100%"
            }}>
              <Grid  container justify="space-between" >
                <Grid style={{ paddingTop: 6, paddingLeft: 15, paddingRight: 15, paddingBottom: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start"}}>
                  <Typography
                    color="textSecondary"
                    variant="h5"
                    fontWeight="100"
                  >
                    Open Cases
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}
                  sm={12} 
                  md={4} 
                  lg={4} 
                  xl={4} 
                  style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start"
                }}>
                  <TextField
                    fullWidth
                    select
                    id="outlined-adornment-password"
                    className={classes.searchBar}
                    variant="outlined"
                    type={'text'}
                    size="small"
                    label="Filter by Specialty"
                    //label="Specialty type"
                    name={"selectedSpecialty"}
                    value={selectedSpecialty}
                    onChange={this.handleSearch}
                    style={{
                      display: userdata.user_type === "Admin" || userdata.user_type === "PCP"
                        ? "flex"
                        : "none"
                    }}
                  >
                    {specialtyList.map(specialty => (
                      <MenuItem key={specialty.value} value={specialty.value}>{specialty.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}
                  sm={12} 
                  md={4} 
                  lg={4} 
                  xl={4}   
                  style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start"
                }}> 
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search"
                      size="small"
                      className={classes.searchBar}
                      InputProps={{
                       startAdornment: (
                         <InputAdornment position="start">
                           <SearchIcon  color="action"/>
                         </InputAdornment>
                       ),
                      }}
                      onChange={this.handleSearch}
                    />
                </Grid>
              </Grid>
              <MessageList
                openDraftDialog={this.openDraftDialog}
                rows={rows}
                isTrClicked={this.handleTrClicked}
                readAllCases={searchResultsForCases}
                readAllDrafts={searchResultsForDrafts}
                assignConsult={this.handleAssignConsult}
              />
            </Card>
            
          </Grid>
        </Grid>
        <ConfirmationDialog
          message="Are you sure you want to delete this draft?"
          title="Delete Draft"
          okOperationDialog={this.removeDraft}
          handleClose={this.handleClose}
          dialogState={this.state.confirmDraftDelete} />

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
              message="Case sent successfully."
            />
          </Snackbar>
      </div>
    );
  }
}

Inbox.propTypes = {
  userdata: PropTypes.object.isRequired,
  fetchAllCases: PropTypes.func.isRequired,
  setCurrentCase: PropTypes.func.isRequired,
  modifyCase: PropTypes.func.isRequired,
  fetchAllDrafts: PropTypes.func.isRequired,
  setCurrentDraft: PropTypes.func.isRequired,
  readAllCases: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata,
  readAllCases: state.case.readAllCases,
  readAllDrafts: state.draft.readAllDrafts,
  isDraftDeleted: state.draft.isDraftDeleted,
  draftLoader: state.draft.draftLoader,
  caseLoader: state.case.caseLoader,
  showSnackbar: state.case.showSnackbar
})

export default connect(
  mapStateToProps,
  { fetchAllCases, setCurrentCase, modifyCase, fetchAllDrafts, setCurrentDraft, removeDraft, setSnackbar }
)(withStyles(styles)(Inbox))