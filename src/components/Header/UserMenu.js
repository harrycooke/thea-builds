import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography,
  Avatar
} from '@material-ui/core';
import LockIcon from "@material-ui/icons/Lock";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import InputIcon from "@material-ui/icons/Input";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

function UserMenu(props) {
  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  const userName = `${props.auth.userdata.firstName} ${props.auth.userdata.lastName}`;
  const userAvatar = props.auth.userdata.avatar ? props.auth.userdata.avatar.name : null;

  return (
    <React.Fragment>
      <Button onClick={userMenuClick}>
        {userAvatar ? 
          <Avatar 
            src={userAvatar}
          /> :
          <AccountCircleIcon />
        }
        <div className="hidden md:flex flex-col ml-12 items-start">
          <Typography 
            component="span" 
            className="normal-case font-600 flex" 
            style={{ paddingLeft: '5px', 
            // fontWeight:"600",                                //Uncomment for bold Username display
            }}>
              {userName}
          </Typography>
        </div>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: "py-8"
        }}
      >
        {
          !props.auth.isAuthenticated ? (
            <React.Fragment>
              <MenuItem component={Link} to="/login">
                <ListItemIcon className="min-w-40">
                  <LockIcon />
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Login" />
              </MenuItem>
              <MenuItem component={Link} to="/register">
                <ListItemIcon className="min-w-40">
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Register" />
              </MenuItem>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <MenuItem component={Link} to="/account" onClick={userMenuClose}>
                  <ListItemIcon className="min-w-40">
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Account" />
                </MenuItem>
                <MenuItem component={Link} to="/import" onClick={userMenuClose}>
                  <ListItemIcon className="min-w-40">
                    <CloudUploadOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Import" />
                </MenuItem>
                {/*
                <MenuItem component={Link} to="/checkout" onClick={userMenuClose}>
                  <ListItemIcon className="min-w-40">
                    <CloudUploadOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Checkout" />
                </MenuItem>
              */}
                <MenuItem component={Link} onClick={onLogoutClick} to="/login">
                  <ListItemIcon className="min-w-40">
                    <InputIcon />
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Logout" />
                </MenuItem>
              </React.Fragment>
            )
        }
      </Popover>
    </React.Fragment>
  );
}

UserMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(UserMenu);
