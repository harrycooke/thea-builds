import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  },
  content: {
    flexGrow: 2,
    overflowX: "hidden"
  },
});

class AdminLayout extends Component {
  state = {
    open: false
  };

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };
// 
  render() {
    const { classes, children } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
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

export default withStyles(styles)(AdminLayout);
