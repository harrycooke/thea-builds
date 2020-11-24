import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Typography,
  Button,
  Hidden,
  MenuItem,
  TextField,
  InputAdornment,
  Divider,
  InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from '@material-ui/icons/Create';

import _ from "../../@lodash";
import { fetchAllDrafts, setCurrentDraft, removeDraft } from "../../actions/draftActions";
import MessageList from "../../components/Inbox/MessageList";
import styles from "../../assets/styles/InboxStyles";
import { specialtyList } from "../../utils/constant";
import ConfirmationDialog from "../../components/SharedComponents/ConfirmationDialog"
import { sendAmplitudeData } from '../../utils/amplitude';
import { removeFileFromS3 } from '../../utils/s3';
import CircularProgress from '../../components/SharedComponents/CircularProgress';
const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class Drafts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToChat: false,
      redirectToCreateCase: false,
      readAllDrafts: [],
      selectedSpecialty: '',
      searchResultsForDrafts: [],
      confirmDraftDelete: false,
      filesDraft: []
    }
    this.openDraftDialog = this.openDraftDialog.bind(this)
    this.removeDraft = this.removeDraft.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleTrClicked = (id, isDraft) => {
    this.setState({
      redirectToCreateCase: true,
      selectedClientID: id
    });
    this.props.setCurrentDraft({ case_id: id })
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
    let selectedSpecialty = e.target.value;
    const { readAllDrafts } = this.state;
    if (selectedSpecialty !== '') {
      let searchResultsForDrafts= readAllDrafts;

      if(selectedSpecialty != "All Specialties"){  
        searchResultsForDrafts = _.filter(readAllDrafts, function (item) {
        return item.draftData.specialty.toLowerCase().indexOf(selectedSpecialty.toLowerCase()) > -1 || item.draftData.patient_name.toLowerCase().indexOf(selectedSpecialty.toLowerCase()) > -1;
      });
    }
      this.setState({ searchResultsForDrafts });
    } else {
      this.setState({
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
    this.props.userdata.user_type === 'PCP' && this.props.fetchAllDrafts(currentUserData);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { readAllDrafts, errors } = nextProps;
    if (errors) {
      this.setState({
        errors: errors
      });
    }
    this.setState({
      readAllDrafts,
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

  openDraftDialog(draftData) {
    this.setState({ confirmDraftDelete: true, draftId: draftData.case_id, filesDraft: draftData.files && draftData.files.length ? draftData.files : [] })
  }
  render() {
    const { classes, userdata, readAllDrafts } = this.props;
    const {
      redirectToChat,
      redirectToCreateCase,
      selectedClientID,
      selectedSpecialty,
      searchResultsForDrafts
    } = this.state;
    if (redirectToChat) {
      return (<Redirect to={{
        pathname: `/insidemessage/room_${selectedClientID}`,
      }} />)
    }
    if (redirectToCreateCase) {
      return (<Redirect to={{
        pathname: `/edit-new-case-${selectedClientID}`,
      }} />)
    }
    let rows = [...searchResultsForDrafts];
    return (
      <div className={classes.container}>

        {/* <Hidden lgUp>
          <Grid container spacing={1} style={{ paddingBottom: 20 }}>
            <Grid item xs={5}
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "flex-start"
              }}
            >
              <Button
                color="default"
                component={AdapterLink}
                to="/inbox/cases"
                variant="contained"
                style={{
                  fontSize: 16,
                  width: 130,
                  backgroundColor: "#ffffff",
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
                  marginLeft: 32
                }}>
                Closed Cases
              </Button>
              {readAllDrafts && readAllDrafts.length ?
                <Button
                  color="primary"
                  component={AdapterLink}
                  to="/inbox/drafts"
                  variant="contained"
                  style={{
                    fontSize: 16,
                    width: 80,
                    marginLeft: 32
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
                <Grid item  
                  style={{ paddingTop: 6, paddingLeft: 15, paddingRight: 15, paddingBottom: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start"}}>
                  <Typography
                    color="textSecondary"
                    variant="h5"
                    fontWeight="100"
                  >
                    Drafts
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
                    size="small"
                    variant="outlined"
                    type={'text'}
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
                      className={classes.searchBar}
                      size="small"
                      InputProps={{
                       startAdornment: (
                         <InputAdornment position="start">
                           <SearchIcon />
                         </InputAdornment>
                       ),
                      }}
                      onChange={this.handleSearch}
                    />
                </Grid>
              </Grid>
              <CircularProgress isLoading={this.props.draftLoader} />
              <CircularProgress isLoading={this.props.caseLoader} />

              <MessageList
                openDraftDialog={this.openDraftDialog}
                rows={rows}
                isTrClicked={this.handleTrClicked}
                readAllDrafts={searchResultsForDrafts}
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
      </div>
    );
  }
}

Drafts.propTypes = {
  userdata: PropTypes.object.isRequired,
  fetchAllDrafts: PropTypes.func.isRequired,
  setCurrentDraft: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata,
  readAllDrafts: state.draft.readAllDrafts,
  isDraftDeleted: state.draft.isDraftDeleted,
  draftLoader: state.draft.draftLoader,
  caseLoader: state.case.caseLoader
})

export default connect(
  mapStateToProps,
  { fetchAllDrafts, setCurrentDraft, removeDraft }
)(withStyles(styles)(Drafts))