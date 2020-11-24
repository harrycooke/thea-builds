import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import CreateButton from "../components/CreateButton/CreateButton";
import Header from "../components/Header/Header";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  },
  content: {
    flexGrow: 2,
    padding: theme.spacing(0),
    paddingTop: theme.spacing(8),
    overflowX: "hidden",
    backgroundColor: "#f5f7ff"
  },
});

class DashboardLayout extends Component {

  render() {
    const { classes, children } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Header displayLogo={"none"} />
          <CreateButton/>
          <main
            className={classNames(classes.content)}
          >
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DashboardLayout);
