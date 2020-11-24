import React from "react";
import { Route } from "react-router-dom";
import EmptyLayout from "../layouts/EmptyLayout";

const EmptyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  );
};

export default EmptyRoute