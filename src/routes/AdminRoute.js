import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <AdminLayout>
          <Component {...matchProps} />
        </AdminLayout>
      )}
    />
  );
};

export default AdminRoute