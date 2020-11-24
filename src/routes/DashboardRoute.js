import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DashboardLayout from "../layouts/DashboardLayout";

const DashboardRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps =>
        auth.isAuthenticated === true ? (
          <DashboardLayout>
            <Component {...matchProps} />
          </DashboardLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

DashboardRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DashboardRoute);