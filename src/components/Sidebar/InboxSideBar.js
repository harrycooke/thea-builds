import React from 'react';
import {
  Card,
  List,
  Typography,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import FolderIcon from '@material-ui/icons/Folder';
import { Link } from "react-router-dom";
import DraftsIcon from '@material-ui/icons/Drafts'
const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    maxWidth: drawerWidth,
    margin: 0,
    padding: 0,
    height: "100vh",
    paddingTop: theme.spacing(8),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0, 
    // backgroundColor: "#06596b",
    backgroundColor: theme.palette.secondary.main

  },
  content: {
    flexGrow: 1,
    padding: 0,
  },
  toolbar: theme.mixins.toolbar,
  listItemTextRoot: {
    padding: 0
  },
  listItemTextLabel: {
    //color: "#7e8fa7",
    fontSize: 15,
    fontWeight: 600
  }
}));

export default function InboxSideBar(props) {
  const classes = useStyles();
  let repVal = ''

  const routeName = props.routeName.substr(props.routeName.length-1,1);
  if(routeName === '/'){
    repVal = props.routeName.substr(0,props.routeName.length-1);
  }else{
    repVal = props.routeName;
  }

  return (
    <Card className={classes.root}>
      <div className={classes.drawer}>
        <List>
          {/* <Divider variant="fullWidth" style={{ marginTop: 12 }}/> */}
          <Typography color="textSecondary" variant="subtitle1" style={{ marginLeft: 14, marginTop: 45, marginBottom: 10, fontWeight: 800 }}>
            FOLDERS
          </Typography>
          {/* <Divider variant="fullWidth" style={{ marginBottom: 10 }}/> */}
          
          <Link to="/inbox/cases">
            <ListItem button>
              <ListItemIcon>
                <QuestionAnswerIcon style={{ color: `${repVal === '' || repVal === '/inbox' || repVal === '/inbox/cases' ? '#fff' : '#87b9c4'}` }} />
              </ListItemIcon>
              <ListItemText style={{ color: `${repVal === '' || repVal === '/inbox' || repVal === '/inbox/cases' ? '#fff' : '#87b9c4'}` }}
                primary="Open Cases"
                classes={{
                  root: classes.listItemTextRoot,
                  primary: classes.listItemTextLabel
                }} />
            </ListItem>
          </Link>
          <Link to="/inbox/closed_cases">
            <ListItem button>
              <ListItemIcon>
                <FolderIcon style={{ color: `${repVal === '/inbox/closed_cases' ? '#fff' : '#87b9c4'}` }} />
              </ListItemIcon>
              <ListItemText style={{ color: `${repVal === '/inbox/closed_cases' ? '#fff' : '#87b9c4'}` }}
                primary="Closed Cases"
                classes={{
                  root: classes.listItemTextRoot,
                  primary: classes.listItemTextLabel
                }} />
            </ListItem>
          </Link>
          {props.draftExist &&
            <Link to="/inbox/drafts">
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon style={{ color: `${repVal === '/inbox/drafts' ? '#fff' : '#87b9c4'}` }} />
                </ListItemIcon>
                <ListItemText style={{ color: `${repVal === '/inbox/drafts' ? '#fff' : '#87b9c4'}` }}
                  primary="Drafts"
                  classes={{
                    root: classes.listItemTextRoot,
                    primary: classes.listItemTextLabel
                  }} />
              </ListItem>
            </Link>}
        </List>
      </div>
    </Card>
  );
}