import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Header from "../components/Header/Header";

const styles = theme => ({
  root: {
    //display: "flex",
    width: "100%",
    height: "100%"
  },
  content: {
    flexGrow: 2,
    paddingLeft: theme.spacing(0),
    padding: theme.spacing(0),
    paddingTop: theme.spacing(8),
    backgroundColor: "#f5f7ff"
  }
});

class InsideMessageLayout extends Component {
  state = {
    open: false
  };

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  render() {
    const { classes, children } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Header />
          <main
            className={classes.content}
          >
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(InsideMessageLayout);
