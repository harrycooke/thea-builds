import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getNumOfNewMessage } from "../../actions/caseAction";
import Update from "./Update";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Grid,
  Typography,
  Hidden,
  Menu,
  MenuItem,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InputIcon from "@material-ui/icons/Input";
import CreateIcon from "@material-ui/icons/Create";
import UserMenu from './UserMenu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsSharpIcon from '@material-ui/icons/DraftsSharp';
import CreateNewFolderSharpIcon from '@material-ui/icons/CreateNewFolderSharp';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";



const styles = theme => ({
  toolbarRoot: {
    paddingRight: theme.spacing(3),
    backgroundColor: "#fff"
  },
  media: {
    height: 30,
    width: 210,
    marginLeft: 30,
    margin: 0,
  },
  title: {
    marginLeft: 100,
    flexGrow: 1
  },
  badgeRoot: {
    marginRight: 10
  },
  badgeSpan: {
    top: 2,
    right: 2
  },
  navItemDashboard: {
    borderLeft: '0.1em solid #d8d8d8',
    // borderRight: '0.1em solid #d8d8d8',
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 18,
    },
  },
  navItem: {
    //borderLeft: '0.1em solid #d8d8d8',
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 18,
    },
  },
  iconButton: {
    padding: 5
  },
  logo: {
    width: '75%',
    height: 'auto',
  }
});

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});



const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

// const ITEM_HEIGHT = 48;
// //test comment
// const test = 10;
export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      numOfNotifications:0
    }
  }

  componentDidMount() {
    const { id, user_type } = this.props.auth;
    const userData = {
      userId: id,
      userRole: user_type
    }
    //setInterval(() => {
      this.props.getNumOfNewMessage(userData)
    //}, 1000);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.numberOfNewMessage !== this.props.numberOfNewMessage) {
      if (nextProps.numberOfNewMessage) {
        this.setState({
          numOfNotifications: nextProps.numberOfNewMessage
        })
      }
    }
  }

  getDifference(a, b)
  {
      var i = 0;
      var j = 0;
      var result = "";
      while (j < b.length)
      {
       if (a[i] !== b[j] || i === a.length)
           result += b[j];
       else
           i++;
       j++;
      }
      return result;
  }
  
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };
//

  render() {
    const { classes } = this.props;
    const { anchorEl, numOfNotifications } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>

      <AppBar position="fixed">
      <Update/>
              {/* <div>
        {['left', 'right', 'top', 'bottom'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer anchor={anchor} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div> */}
        <Toolbar disableGutters={true} classes={{ root: classes.toolbarRoot }}>
          <Link to="/">
            <div style={{
              marginLeft: 20,
              display: "flex"
            }}>
              <img src={require("../../assets/images/text-logo.png")} alt="required" style={{width: "55%", height: "auto" }} />
            </div>
          </Link>
          <Typography                                     //This component adds space between the logo and menu items but needs to be
            variant="h2"                                      //removed as it is garbage code- doesn't serve any purpose.
            color="textSecondary"
            noWrap
            className={classes.title}
          >
          </Typography>

          <Hidden smDown>
            <div className={classes.navItem}>
              <Button
                //variant="extended"
                color="default"
                aria-label="Add"
                // style={{
                //   fontSize: 17
                // }}
                component={AdapterLink}
                to="/inbox/cases">
                <Badge
                  badgeContent={numOfNotifications}
                  color="primary"
                  classes={{
                    root: classes.badgeRoot,
                    badge: classes.badgeSpan
                  }}>
                  <MailIcon color={"action"} style={{ width: 25, height: 25 }} />
                </Badge>
                Inbox
              </Button>
            </div>

            <div className={classes.navItemDashboard}>
              <Button color="default" component={AdapterLink} to="/dashboard" >
                Dashboard
              </Button>
            </div>
            
            {/* <div className={classes.navItemDashboard}>
              <Button color="default" component={AdapterLink} to="/pricing" >
                Pricing
              </Button>
            </div> */}
             
             {
              this.props.auth.user_type === "PCP" && (
                <div className={classes.navItem}>
                  <Button
                    color="primary"
                    component={AdapterLink}
                    to="/create-new-case"
                    variant="contained"
                    style={{
                      // fontSize: 17,
                      width: 170
                    }}>
                    Create new case
                  </Button>
                </div>
              )
           } 
            <UserMenu />
          </Hidden>
          <Hidden only={['xs', 'md', 'lg', 'xl']}>
            {
              this.props.auth.user_type === "PCP" && (
                <div className={classes.navItem}>
                  <Button
                    color="primary"
                    component={AdapterLink}
                    to="/create-new-case"
                    variant="contained"
                    style={{
                      fontSize: 17,
                      width: 170
                    }}>
                    Create new case
                  </Button>
                </div>
              )
           }

          </Hidden>

          <Hidden mdUp>
            {/*
              this.props.auth.user_type === "PCP" && (
                <div className={classes.navItem}>
                  <Button
                    color="primary"
                    component={AdapterLink}
                    to="/create-new-case"
                    variant="contained"
                    style={{
                      fontSize: 17,
                      width: 170
                    }}>
                    Create new case
                  </Button>
                </div>
              )
           */}
            <div >
              <IconButton
                aria-label="More"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    // maxHeight: ITEM_HEIGHT * 4.5,
                    width: 170,
                    // backgroundColor: "#06596b",
                  },
                }}
              >
                {/* why handleClick method? */}
                <Link to="/dashboard">
                  <MenuItem onClick={this.handleClose} >                              
                    <IconButton color="default" className={classes.iconButton}>
                      <DashboardIcon />
                    </IconButton>
                    <Typography color="textSecondary">Dashboard</Typography>
                  </MenuItem>
                </Link>
                
                {/* //why handleClose method? */}
                <Link to="/import">
                  <MenuItem onClick={this.handleClose} >                              
                    <IconButton color="default" className={classes.iconButton}>
                        <CloudUploadOutlinedIcon fontSize={"inherit"} />
                    </IconButton>
                    <Typography color="textSecondary">Import</Typography>
                  </MenuItem>
                </Link>

         
                <Divider />
                <h5 style={{marginLeft: 10, marginTop: 15, marginBottom: 5 }}>FOLDERS</h5>
                {/* //why handleClose method? */}
                <Link to="/inbox/cases">
                  <MenuItem onClick={this.handleClose} >                              
                    <IconButton color="default" className={classes.iconButton}>
                      <Badge badgeContent={numOfNotifications} color="primary">
                        <DraftsSharpIcon fontSize={"inherit"} />
                      </Badge>
                    </IconButton>
                    <Typography color="textSecondary">Open Cases</Typography>
                  </MenuItem>
                </Link>
                {/* //why handleClose method? */}
                <Link to="/inbox/closed_cases">
                  <MenuItem onClick={this.handleClose} >                              
                    <IconButton color="default" className={classes.iconButton}>
                      <Badge badgeContent={numOfNotifications} color="primary">
                        <MailIcon fontSize={"inherit"} />
                      </Badge>
                    </IconButton>
                    <Typography color="textSecondary">Closed Cases</Typography>
                  </MenuItem>
                </Link>
                {/* //why handleClose method? */}
                <Link to="/inbox/drafts">
                  <MenuItem onClick={this.handleClose} >                              
                    <IconButton color="default" className={classes.iconButton}>
                      <Badge badgeContent={numOfNotifications} color="primary">
                        <CreateNewFolderSharpIcon fontSize={"inherit"} />
                      </Badge>
                    </IconButton>
                    <Typography color="textSecondary">Drafts</Typography>
                  </MenuItem>
                </Link>
                <Divider />

                <Grid backgroundColor="e2e2e2" fontWeight="500">
                <Link to="/account">
                  <MenuItem onClick={this.handleClose} >                              
                    <IconButton color="default" className={classes.iconButton}>
                      <AccountBoxIcon />
                    </IconButton>
                    <Typography color="textSecondary">Account</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={this.onLogoutClick} >
                  <IconButton color="default" className={classes.iconButton}>
                    <InputIcon />
                  </IconButton>
                  <Typography color="textSecondary">Log out</Typography>
                </MenuItem>
                </Grid>
              </Menu>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
      </div>
    );
  }
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getNumOfNewMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
  numberOfNewMessage: state.case.numberOfNewMessage
});

export default connect(
  mapStateToProps,
  { logoutUser, getNumOfNewMessage }
)(withStyles(styles)(Header));
