import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InsideMessageLayout from "../layouts/InsideMessageLayout";

const InsideMessageRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps =>
        auth.isAuthenticated === true ? (
          <InsideMessageLayout>
            <Component {...matchProps} />
          </InsideMessageLayout>
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