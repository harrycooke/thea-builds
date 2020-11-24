import React,  { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendAmplitudeData } from "../../utils/amplitude";
//import Slider from '@material-ui/core/Slider';
//import Button from '@material-ui/core/Button';
import {
  Grid,
  Typography,
  CssBaseline,
  Divider,
  Paper,
  Box,
} from '@material-ui/core';
import ConsultGraph from '../../components/Dashboard/ConsultGraph';
//import moment from 'moment';

//import 'moment-timezone'; //testing this fix

//import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';

import { fetchAllCases, setCurrentCase, modifyCase } from "../../actions/caseAction";

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

//look into why we did this in this way vs reg import
const moment = require('moment');


const styles = theme => ({
  grid: {
    width: 1080,                          //Width of the overall grid area
    margin: `0 ${theme.spacing(2)}px`,
    // [theme.breakpoints.down('sm')]: {
    //   width: 'calc(100% - 20px)'
    // }
    [theme.breakpoints.down('sm')]: {
      margin: 1,    
    },
    [theme.breakpoints.up('md')]: {
      margin: 20,    
    },
  },
  paper: {                                // for one individual Card
    padding: '32px 20px',
    margin: theme.spacing(0),
    textAlign: 'left',                    //To change the alignment of the upper text in the cards
    color: theme.palette.text.primary,
    bgcolor: theme.palette.secondary.main
  },
  dashboardPaper: {   
    [theme.breakpoints.down('sm')]: {
      padding: '25px 0px 5px 15px',    
    },
    [theme.breakpoints.up('md')]: {
      padding: '40px 0px 20px 30px',    
    },                          
    //padding: '32px 20px',
    margin: theme.spacing(0),
    textAlign: 'left',                    //To change the alignment of the upper text in the cards
    color: theme.palette.text.primary,
    bgcolor: theme.palette.secondary.main,
    // backgroundColor: "#1cacc7"
  },
  metricsPaper: { 
    [theme.breakpoints.down('sm')]: {
      margin: 0,   
      padding: theme.spacing(2), 
    },
    [theme.breakpoints.up('md')]: {
      margin: 0,  
      padding: theme.spacing(4),  
    },
    margin: theme.spacing(0),
    textAlign: 'left',                    //To change the alignment of the upper text in the cards
    color: theme.palette.primary.contrastText,
    background: theme.palette.secondary.main//"#303f9f" 				 // this should be done in a better way using primary but it won't work for some reason
  },
  metrics: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 35,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 40,
    },
  },
  metricsText:{
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 15,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 18,
    },
  },
  blockCenter: {                         // for the useful space inside individual cards
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: 0,    
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      margin: 0,    
      padding: theme.spacing(2),
    },
    textAlign: 'center',                      //To change the alignment of the center text in the cards 
    fontSize: 90
  },
  block: {
    padding: theme.spacing(0.5),
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  buttonBar: {
    display: 'flex'
  },
});



export class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  state = {
    readAllCases: [],
    loading: true,
    amount: 9500,
    period: 4,
    start: 0,
    data: [],
    labels: [] 
  };

//TODO: delete all this after talking with Chriag
/*
  updateValues() {
    const { amount, period, start } = this.state;
    const monthlyInterest = (amount)*(Math.pow(0.01*(1.01), period))/(Math.pow(0.01, period - 1))
    const totalInterest = monthlyInterest * (period + start);
    const totalPayment = amount + totalInterest;
    const monthlyPayment = period > start ? totalPayment/(period - start) : totalPayment/(period)

    const data = Array.from({length: period + start}, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i],
        'Type': delayed ? 0 : Math.ceil(monthlyPayment).toFixed(0),
        'OtherType': Math.ceil(monthlyInterest).toFixed(0)
      }
    }
    )

    this.setState({monthlyInterest, totalInterest, totalPayment, monthlyPayment, data})
  }
  */



  componentDidMount() {
    const currentUserData= {
      currentUserId: this.props.userdata.id,
      currentUserRole: this.props.userdata.user_type,
    }
  //   sendAmplitudeData('Open dashboard page')

    this.props.fetchAllCases(currentUserData);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { readAllCases, errors } = nextProps;
    if (errors) {
      this.setState({
        errors: errors
      });
    }

    this.setState((state) => ({
      readAllCases
    }));
    
  }

  shouldComponentRender() {
    const {isDeleted} = this.props;
    if(this.isDeleted === false) { 
      return false; 
    }
    // and something here
    { 
      return true; 
    }  
  }

  getOpenConsults(){
    var count = 0;
    var i;
    for (i=0; i<this.state.readAllCases.length; i++) {

      if(this.state.readAllCases[i].caseData.is_deleted == false ){
        count++;
      }
    }
    return count;
  }


  // TODO: this is super hacky fix it

  getStartDate(){
    const len = this.state.readAllCases.length;
    if(len > 0){
      const jsStartDate = new Date(Number(this.state.readAllCases[len-1].caseData.created_at));
      const laterStartDate = moment(jsStartDate);
      const startDate = laterStartDate.subtract(1, "month");
      return startDate;
    }
    else{ 
      return moment();
    }
  }



  getMonthArray(startDate) {
   const months = [];
   const endDate = moment();
   while (endDate.diff(startDate, "months") >= 1) {
    months.push(startDate);
    startDate = moment(startDate.add(1, "month"));
   }
   return months;
  }

  getMonthlyTotals(months){
    var totals = new Array(months.length).fill(0);
    for (var i=0; i<this.state.readAllCases.length; i++) {
      for (var j=0; j<months.length; j++){
        const compareDate = new Date(Number(this.state.readAllCases[i].caseData.created_at));
        const compareMoment = moment(compareDate);
        //console.log(compareMoment);
        //console.log(months[j]);

        if(compareMoment.isSame(months[j], "month")){
          totals[j]++;
        }
      }
    }
    return totals;
  }
/*
  handleChangeAmount = (event, value) => {
    this.setState({amount: value, loading: false});
    this.updateValues();
  }

  handleChangePeriod = (event, value) => {
    this.setState({period: value, loading: false});
    this.updateValues();
  }

  handleChangeStart = (event, value) => {
    this.setState({start: value, loading: false});
    this.updateValues();
  }

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };*/

  render() {

    const { classes } = this.props;
    const labels = this.getMonthArray(this.getStartDate());
    const data = this.getMonthlyTotals(labels);


    const { readAllCases, amount, period, start} = this.state;
    

    //console.log(this.state.readAllCases);
    //console.log(this.state.readAllCases.length);
    //console.log(this.getOpenConsults());
    //console.log(this.getMonthlyTotals(this.getMonthArray(this.getStartDate())));



    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center" >
            <Grid spacing={1} alignItems="center" justify="center" container className={classes.grid}>
              
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    {/*<Typography variant="h5" gutterBottom>Dashboard</Typography>
                     <Typography variant="body1">
                      Adjust the sliders to change inputs.
                    </Typography> */}
                  </div>
                  
                  {/*
                  <div>
                    <Button variant="contained" className={classes.outlinedButtom} color="primary">
                      Get help/ Back/ Submit 
                    </Button>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Dropdown Button
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}

                </div>
              </Grid>
              <Grid item xs={12} md={4} >  
                  {/*<Box bgcolor="primary.main" color="info.contrastText" p={3} boxShadow={6}>*/}
                  <Paper className={classes.metricsPaper} color="#303f9f" elevation={5}>
                    <div>
                      {/*<Typography className={classes.metricsText} gutterBottom>
                        <h3>Total Consults</h3>
                      </Typography>*/}
                      <h2>Total Consults</h2>
                      <div className={classes.blockCenter}>
                        <Typography className={classes.metrics} gutterBottom>
                          {this.state.readAllCases.length.toLocaleString()}
                        </Typography>
                      </div>
                      <div>
                        {/* <Slider
                          value={amount}
                          min={20000}
                          max={150000}
                          step={15000}
                          onChange={this.handleChangeAmount}
                        /> */}
                      </div>

                      {/* <div className={classes.rangeLabel}>
                        <div>
                          <Typography variant="subtitle2">
                            1 USD
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle2">
                            500,000+ USD
                          </Typography>
                        </div>

                      </div> */}
                    </div>
                  </Paper>
               {/* </Box> */} 

              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.metricsPaper} elevation={5}>

                  {/*<Box bgcolor="primary.main" color="info.contrastText" p={3} boxShadow={6}>*/}
                  <div>
                    {/*<Typography className={classes.metricsText} gutterBottom>
                      <h3>Open Consults</h3>
                    </Typography>*/}
                    <h2>Open Consults</h2>
                    {/* <Typography variant="body1">
                      Set your preferred start date.
                    </Typography> */}

                    <div className={classes.blockCenter}>
                      <Typography className={classes.metrics} gutterBottom>
                        {this.getOpenConsults().toLocaleString()}
                      </Typography>
                    </div>

                    <div className={classes.rangeLabel}>
                      {/* <div>
                        <Typography variant="subtitle2">
                          Avg. is 15 per month
                        </Typography>
                      </div> */}
                      {/* <div>
                        <Typography variant="subtitle2">
                          Present
                        </Typography>
                      </div> */}
                    </div>
                  </div>
               {/* </Box> */} 
              </Paper> 
              </Grid>
              <Grid item xs={12} md={4}>
              <Paper className={classes.metricsPaper} elevation={5}>
                  {/*<Box bgcolor="primary.main" color="info.contrastText" p={3} boxShadow={6}>*/}
                  <div>
                    {/*<Typography className={classes.metricsText} gutterBottom>
                      <h3>Estimated Cost Savings</h3>
                    </Typography>*/}
                    <h2>Estimated Cost Savings</h2>

                    {/* <Typography variant="body1">
                      Your total period
                    </Typography> */}

                    <div className={classes.blockCenter}>
                      <Typography className={classes.metrics} gutterBottom>
                        ${(this.state.readAllCases.length*541).toLocaleString()}            
                      </Typography>
                    </div>

                    <div>
                      {/* <Slider
                        value={period}
                        min={1}
                        max={6}
                        step={1}
                        onChange={this.handleChangePeriod}
                      /> */}
                    </div>
                    {/* <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          1 month
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          60+ months
                        </Typography>
                      </div>
                    </div> */}


                  </div>

               {/* </Box> */} 
               </Paper>
              </Grid>

              <Grid item xs={12} md={12}>
                <Paper className={classes.dashboardPaper} elevation={5}>
                  {/* <Typography variant="h6" gutterBottom margin="80">Consults Over Time</Typography> */}
                  {/*<Typography className={classes.metricsText} gutterBottom>
                      <h3 style={{ marginBottom: 20}}>Consults Over Time</h3>
                  </Typography>*/}
                  <h2 style={{ marginBottom: 20}}>Consults Over Time</h2>
                    <ConsultGraph
                      data={data}
                      // average={average} 
                      labels={labels} 
                    />
                </Paper>
              </Grid>

              {/* <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      <h3>Start date</h3> 
                    </Typography>
                    <Typography variant="body1">
                      Set your preferred start date.
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        // {monthRange[start]}                                   Use integer values 1, 2, 3... 
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={start}
                        min={0}
                        max={5}
                        step={1}
                        onChange={this.handleChangeStart}
                      />
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          Jan 2018
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          Present
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid> */}


              {/* <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      <h3>Consults per specialist type</h3>
                    </Typography>
                    <Typography variant="body1">
                      Set your preferred start date.
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        // {monthRange[start]} 22 Ortho   22 Ophthalmo   22 Cardio   23 Dermato
                      </Typography>
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          *Includes mixed cases or common patients.
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          Present
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid> */}

            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
};


Dashboard.propTypes = {
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
) (withStyles(styles)(Dashboard));