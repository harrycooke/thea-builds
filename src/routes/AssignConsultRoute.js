import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AssignConsultLayout from "../layouts/AssignConsultLayout";

const AssignConsultRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps =>
        auth.isAuthenticated === true && auth.userdata && auth.userdata.user_type === "Admin" ? (
          <AssignConsultLayout>
            <Component {...matchProps} />
          </AssignConsultLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

AssignConsultRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AssignConsultRoute);