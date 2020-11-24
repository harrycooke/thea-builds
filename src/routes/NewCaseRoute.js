import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NewCaseLayout from "../layouts/NewCaseLayout";

const InsideMessageRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps =>
        auth.isAuthenticated === true ? (
          <NewCaseLayout>
            <Component {...matchProps} />
          </NewCaseLayout>
        ) : (
            <Redirect to="/login" />
          )
      }
    />
  );
};
InsideMessageRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(InsideMessageRoute);
