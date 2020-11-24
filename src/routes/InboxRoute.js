import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InboxLayout from "../layouts/InboxLayout";

const InboxRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps =>
        auth.isAuthenticated === true ? (
          <InboxLayout {...matchProps}>
            <Component {...matchProps} />
          </InboxLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

InboxRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(InboxRoute);