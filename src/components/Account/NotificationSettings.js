import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Slide,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import { modifyUserData, confirmPassword, logoutUser } from "../../actions/authActions";
import { sendAmplitudeData } from "../../utils/amplitude";

const styles = theme => ({
  root: {},
  errorText: {
    fontSize: 12,
    fontWeight: "500"
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
  /// Comment to get rid of yellow on sublime
});

export class NotificationSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.auth.notification
    }
  }

  handleChangeSwitch = name => event => {
    this.setState({[name]: event.target.checked });
    this.props.modifyUserData({
      userID: this.props.auth.id,
      notification: event.target.checked
    });
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    
    return (
    <Card
      className={classes.root}>
      
      <CardHeader
        title="Notification Settings"
      />
        <Divider />
          <FormControlLabel
            checked={checked}
            style={{ margin: '1rem' }}
            onChange={this.handleChangeSwitch('checked')}
            control={<Switch color="primary" display="flex-start"/>}
            label="Send emails when there is activity on any of my cases."
            // label="Allow TheaHealth to send emails when there is activity on one of my cases."
            labelPlacement="start"
          />
    </Card>
    )
  }
};


NotificationSettings.propTypes = {
  auth: PropTypes.object.isRequired,
  modifyUserData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
});

export default connect(
  mapStateToProps,
  { modifyUserData}
)(withStyles(styles)(NotificationSettings));
