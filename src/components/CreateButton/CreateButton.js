import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Hidden,
  Fab,
} from "@material-ui/core";

//import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";

import { withStyles } from "@material-ui/core/styles";



const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3.5),
    zIndex: 9
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});


const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);


export class CreateButton extends React.Component {

  componentDidMount() {
    const { id, user_type } = this.props.auth;
    const userData = {
      userId: id,
      userRole: user_type
    }
  }

    

  render() {
    const { classes } = this.props;

    return (
      <div>  
      {
        this.props.auth.user_type === "PCP" && (
          <div>
            <Hidden smUp>
              <Fab color="primary" aria-label="Create Case" component={AdapterLink} to="/create-new-case" variant="extended" className={classes.fab}>
                <CreateIcon className={classes.extendedIcon}/>
                Create a Case
              </Fab>
            </Hidden>
          </div>
        )
      }
      </div>
    );
  }
};

CreateButton.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
});

export default connect(
  mapStateToProps,
  { Link }
)(withStyles(styles)(CreateButton));

