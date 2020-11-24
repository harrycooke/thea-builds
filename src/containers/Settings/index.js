import React from "react";

//why are these imports made here???

// import ConsultsCard from '../../components/Dashboard/Utilization/ConsultsCard';
// import TurnaroundCard from '../../components/Dashboard/Utilization/TurnaroundCard';
// import SavingsConsultsCard from '../../components/Dashboard/Savings/ConsultsCard';
// import SavingsCostsCard from '../../components/Dashboard/Savings/CostCard';
// import FollowupsCard from '../../components/Dashboard/Efficiency/FollowupsCard';
// import QualityCard from '../../components/Dashboard/Efficiency/QualityCard';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import styles from "../../assets/styles/DashboardStyles";

class Settings extends React.Component {

  state = {
    open: false
  };

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root} >
        <img src={require("../../assets/images/dashboard.png")} alt="required" style={{width: "100%"}} />
      </div>
    );
  }
};

export default withStyles(styles)(Settings);
