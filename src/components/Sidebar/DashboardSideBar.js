// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@material-ui/core";
// import SettingsIcon from "@material-ui/icons/Settings";
// import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
// import { NavLink } from "react-router-dom";
// import { withStyles } from "@material-ui/core/styles";
// import classNames from "classnames";

// const drawerWidth = 280;

// const styles = theme => ({
//   drawerPaper: {
//     position: "fixed",
//     top: 0,
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     backgroundColor: theme.palette.primary.main,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   drawerPaperClose: {
//     overflowX: "hidden",
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     width: theme.spacing(8),
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing(7)
//     }
//   },
//   media: {
//     height: 0,
//     paddingTop: '13.33%', // 16:9,
//     margin: 15,
//   },
//   mediaClose: {
//     height: 0,
//     paddingTop: '13.33%', // 16:9,
//     margin: 15,
//     display: "none"
//   },
//   listBox: {
//     position: "fixed",
//     top: theme.spacing(8),
//   },
//   listItemTextRoot: {
//     padding: 0
//   },
//   listItemTextLabel: {
//     color: "#FFFFFFF"
//   }
// });

// const DashboardSideBar = props => {
//   const { open, classes, handleToggleDrawer } = props;

//   return (
//     <Drawer
//       variant="permanent"
//       classes={{
//         paper: classNames(
//           classes.drawerPaper,
//           !open && classes.drawerPaperClose
//         )
//       }}
//       open={open}
//       onMouseOver={handleToggleDrawer}
//       onMouseOut={handleToggleDrawer}
//     >
//       <div style={{
//         marginLeft: 20,
//         // display: open
//         display: open ? "flex" : "none"
//       }}>
//         <p style={{
//           color: "#23C8DE",
//           fontFamily: "Lato",
//           fontWeight: "bold",
//           fontSize: 45
//         }}>
//           Thea
//         </p>
//         <p style={{
//           color: "#2F5496",
//           fontFamily: "Lato",
//           fontWeight: "bold",
//           fontSize: 45
//         }}>
//           Health
//         </p>
//       </div>

//       <List style={
//         open ? { marginTop: "30px" }
//           : { marginTop: "70px" }
//       }>
//         <NavLink to="/">
//           <ListItem button>
//             <ListItemIcon>
//               <SettingsIcon style={{ color: "#b0bdd2" }} />
//             </ListItemIcon>
//             <ListItemText
//               primary="Summary"
//               dense={classes.listItemTextLabel}
//               classes={{
//                 root: classes.listItemTextRoot,
//                 primary: classes.listItemTextLabel
//               }} />
//           </ListItem>
//         </NavLink>
//         <NavLink to="/dashboard/utilization">
//           <ListItem button>
//             <ListItemIcon>
//               <PeopleIcon style={{ color: "#b0bdd2" }} />
//             </ListItemIcon>
//             <ListItemText
//               primary="Utilization"
//               classes={{
//                 root: classes.listItemTextRoot,
//                 primary: classes.listItemTextLabel
//               }} />
//           </ListItem>
//         </NavLink>
//         <NavLink to="/">
//           <ListItem button>
//             <ListItemIcon>
//               <BarChartIcon style={{ color: "#b0bdd2" }} />
//             </ListItemIcon>
//             <ListItemText
//               primary="Savings & Reimbursements"
//               classes={{
//                 root: classes.listItemTextRoot,
//                 primary: classes.listItemTextLabel
//               }} />
//           </ListItem>
//         </NavLink>
//         <NavLink to="/">
//           <ListItem button>
//             <ListItemIcon>
//               <LayersIcon style={{ color: "#b0bdd2" }} />
//             </ListItemIcon>
//             <ListItemText
//               primary="Consult Efficiency"
//               classes={{
//                 root: classes.listItemTextRoot,
//                 primary: classes.listItemTextLabel
//               }} />
//           </ListItem>
//         </NavLink>
//       </List>
//     </Drawer>
//   );
// };

// export default withStyles(styles)(DashboardSideBar);
