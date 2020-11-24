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
  Divider,
  InputAdornment,
  InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from '@material-ui/icons/Create';

import _ from "../../@lodash";
import { fetchAllCases, setCurrentCase, modifyCase } from "../../actions/caseAction";
import MessageList from "../../components/Inbox/MessageList";
import styles from "../../assets/styles/InboxStyles";
import { specialtyList } from "../../utils/constant";
import { sendAmplitudeData } from "../../utils/amplitude";
import CircularProgress from '../../components/SharedComponents/CircularProgress';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class ClosedCases extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      readAllCases: [],
      selectedSpecialty: '',
      searchResultsForCases: [],
    }
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
    let selectedSpecialty = e.target.value;
    const { readAllCases } = this.state;
    if (selectedSpecialty !== '') {
      let searchResultsForCases = readAllCases;

      if(selectedSpecialty != "All Specialties"){  
        searchResultsForCases = _.filter(readAllCases, function (item) {
        return item.caseData.specialty.toLowerCase().indexOf(selectedSpecialty.toLowerCase()) > -1 || item.caseData.patient_name.toLowerCase().indexOf(selectedSpecialty.toLowerCase()) > -1;
      });
    }
      this.setState({ searchResultsForCases });
    } else {
      this.setState({
        searchResultsForCases: readAllCases,
      });
    }
  }

  handleTrClicked = (id) => {
    const newCaseData = {
      caseId: id,
      is_read: true
    }
    this.props.modifyCase(newCaseData);
    this.setState({
      redirect: true,
      selectedClientID: id
    });
  }

  componentDidMount() {
    const currentUserData = {
      currentUserId: this.props.userdata.id,
      currentUserRole: this.props.userdata.user_type,
      isDeleted: true
    }
    sendAmplitudeData('Open closed case page', currentUserData)
    this.props.fetchAllCases(currentUserData);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { readAllCases, errors } = nextProps;
    if (errors) {
      this.setState({
        errors: errors
      });
    }
    this.setState({
      readAllCases,
      searchResultsForCases: readAllCases,
    })
    
  }

  render() {
    const { classes, userdata, readAllDrafts } = this.props;
    const {
      redirect,
      selectedClientID,
      selectedSpecialty,
      searchResultsForCases,
    } = this.state;
    //console.log(this.props);
    if (redirect) {
      return (<Redirect to={{
        pathname: `/insidemessage/room_${selectedClientID}`,
        state: { from: 'closed_cases' }
      }} />)
    }
    let rows = [...searchResultsForCases];
    return (
      <div className={classes.container}>
        <CircularProgress isLoading={this.props.caseLoader} />

        {/* <Hidden lgUp>
          <Grid container spacing={1} style={{ paddingBottom: 20, height: 70 }}>
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
                  backgroundColor: "#ffffff",
                  width: 130
                }}>
                Open Cases
              </Button>
              <Button
                color="primary"
                component={AdapterLink}
                to="/inbox/closed_cases"
                variant="contained"
                style={{
                  fontSize: 16,
                  width: 130,
                  marginLeft: 32
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
                    marginLeft: 32,
                    width: 80,
                    backgroundColor: "#ffffff"
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
        <Grid container justify="flex-start" spacing={0} className={classes.cardContainer}>
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
                    Closed Cases
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
              <MessageList
                rows={rows}
                isTrClicked={this.handleTrClicked}
                readAllCases={searchResultsForCases}
                isClosedCaseRoute={true}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ClosedCases.propTypes = {
  userdata: PropTypes.object.isRequired,
  fetchAllCases: PropTypes.func.isRequired,
  setCurrentCase: PropTypes.func.isRequired,
  modifyCase: PropTypes.func.isRequired,
  readAllCases: PropTypes.array.isRequired,

}

const mapStateToProps = state => ({
  userdata: state.auth.userdata,
  readAllCases: state.case.readAllCases,
  readAllDrafts: state.draft.readAllDrafts,
  caseLoader: state.case.caseLoader
})

export default connect(
  mapStateToProps,
  { fetchAllCases, setCurrentCase, modifyCase }
)(withStyles(styles)(ClosedCases))