import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Typography,
  Divider,
  InputBase,
  Fab,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import _ from "../../@lodash";
import { setCurrentCase } from "../../actions/caseAction";
import { fetchSpecificUsers } from "../../actions/authActions";
import ConsultList from "../../components/Inbox/ConsultList";
import styles from "../../assets/styles/InboxStyles";

class AssignConsult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCase: null,
      specialtyData: [],
      searchResultsForSpecilty: [],
    }
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
    let searchedValue = e.target.value;
    const { specialtyData } = this.state;
    if (searchedValue !== '') {
      let searchResultsForSpecilty = _.filter(specialtyData, function (item) {
        let consultName;
        if(item.firstName && item.lastName){
          consultName = `${item.firstName} ${item.lastName}`;
        }else{
          consultName = item.firstName;
        }
        return consultName.toLowerCase().indexOf(searchedValue.toLowerCase()) > -1;
      });
      this.setState({ searchResultsForSpecilty });
    } else {
      this.setState({
        searchResultsForSpecilty: specialtyData
      });
    }
  }

  componentDidMount() {
    const { case_id, type } = this.props.match.params;
    const currentCaseCondition = {
      case_id: case_id,
      currentUserRole: this.props.userdata.user_type
    };
    this.props.setCurrentCase(currentCaseCondition);
    this.props.fetchSpecificUsers(type);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { specialtyData, currentCase, errors } = nextProps;
    if (errors) {
      this.setState({
        errors: errors
      });
    }
    if (nextProps.currentCase) {
      let currentCaseData = currentCase ? currentCase.caseData: null;
      this.setState({ currentCaseData, specialtyData, searchResultsForSpecilty: specialtyData});
    }
  }
  
  render() {
    const { classes, match } = this.props;
    const {
      currentCaseData,
      searchResultsForSpecilty
    } = this.state;
    let rows = [...searchResultsForSpecilty];
    let route = "/inbox/cases";

    return (
      <div className={classes.container}>
        <Grid container justify="flex-start" spacing={0} className={classes.cardContainer} >
          <Grid item xs={12}>
            <Card style={{
              backgroundColor: "#ffffff",
              padding: 20,
              overflow: "auto",
              height: "100%"
            }}>
              <Grid item xs={7} >
                <div style={{ display: "flex" }}>
                  <Link to={route}>
                    <Fab
                      color="inherit"
                      aria-label="add"
                      style={{
                        width: 38,
                        height: 38,
                        backgroundColor: "#fff"
                      }}
                    >
                      <ArrowBackIcon color="action" />
                    </Fab>
                  </Link>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    style={{ margin: 5, marginLeft: 10 }}
                  >
                    Back to Inbox
                </Typography>
                </div>
              </Grid>

              <Grid container justify="center" >                
                <Grid item xs={6} style={{ padding: 15, paddingLeft: 30 }}>
                  <Typography
                    color="textSecondary"
                    variant="h5"
                  >
                    { currentCaseData && currentCaseData.patient_name &&
                    `Assign ${currentCaseData.specialty} Specialist to ${currentCaseData.patient_name}` }
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon style={{ color: "#7e8fa7" }} />
                    </div>
                    <InputBase
                      placeholder="Search by specialist name..."
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                      inputProps={{ 'aria-label': 'Search' }}
                      onChange={this.handleSearch}
                    />
                    <Divider variant="middle" />
                  </div>
                </Grid>
              </Grid>
              {currentCaseData && <ConsultList
                rows={rows}
                patientName={currentCaseData && currentCaseData.patient_name}
                currentCaseData={currentCaseData}
                params={match.params}
                selectedConsult={currentCaseData && currentCaseData.specialist_id !== '0' ? currentCaseData.specialist_id: null}
              />}
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AssignConsult.propTypes = {
  userdata: PropTypes.object.isRequired,
  currentCase: PropTypes.any.isRequired,
  setCurrentCase: PropTypes.func.isRequired,
  fetchSpecificUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata,
  currentCase: state.case.currentCase,
  specialtyData: state.auth.specialtyData
})

export default connect(
  mapStateToProps,
  { setCurrentCase, fetchSpecificUsers }
)(withStyles(styles)(AssignConsult))