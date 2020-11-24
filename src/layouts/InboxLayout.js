import React, { Fragment, Component } from "react";
import {
  Hidden
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { fetchAllDrafts } from "../actions/draftActions";
import { connect } from "react-redux";

import CreateButton from "../components/CreateButton/CreateButton";
import Header from "../components/Header/Header";
import InboxSideBar from "../components/Sidebar/InboxSideBar";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  },
  content: {
    flexGrow: 2,
    paddingLeft: theme.spacing(0),
    padding: theme.spacing(0),
    paddingTop: theme.spacing(8),
    overflowX: "hidden",
    backgroundColor: "#f5f7ff"
  },
});

class InboxLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    };
    const currentUserData = {
      currentUserId: this.props.userdata.id,
      currentUserRole: this.props.userdata.user_type,
      isDeleted: false,
      isCompleted: false
    }
    this.props.userdata.user_type === 'PCP' && this.props.fetchAllDrafts(currentUserData);
  }

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { readAllDrafts } = nextProps;
    this.setState({
      readAllDrafts
    })
  }

  render() {
    const { classes, children, location } = this.props;
    const { readAllDrafts } = this.state;
    const routeName = location.pathname;
    return (
      <Fragment>
        <div className={classes.root}>
          <Header />
          <CreateButton />
          <Hidden smDown>
            <InboxSideBar routeName={routeName} draftExist={readAllDrafts && readAllDrafts.length ? true : false} />
          </Hidden>
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
const mapStateToProps = state => ({
  userdata: state.auth.userdata,
  readAllDrafts: state.draft.readAllDrafts
})

export default connect(
  mapStateToProps,
  { fetchAllDrafts }
)(withStyles(styles)(InboxLayout))
