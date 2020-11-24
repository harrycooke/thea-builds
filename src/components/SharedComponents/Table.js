// import React from 'react';
// import {
//   InputBase,
//   Divider
// } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
// import MaterialTable from 'material-table';
// import { MuiThemeProvider, createMuiTheme, withStyles, fade } from "@material-ui/core/styles";

// const styles = theme => ({
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(1),
//     width: "100%"
//   },
//   searchIcon: {
//     width: theme.spacing(3),
//     marginTop: 6,
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     width: "100%",
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 3),
//     transition: theme.transitions.create('width'),
//   },
// })

// class MaterialTableDemo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedRow: null,
//     };
//     this.theme = createMuiTheme({
//       palette: {
//         primary: {
//           main: '#4caf50',
//         },
//         secondary: {
//           main: '#ff9100',
//         },
//       },
//     });
//   }



//   render() {
//     const { classes } = this.props;
//     return (
//       <MuiThemeProvider theme={this.theme}>
//         <MaterialTable
//           columns={this.props.columns}
//           data={this.props.data}
//           options={{
//             ...this.props.options,
//             rowStyle: rowData => ({
//               backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#fbfcff' : '#FFF',
//             })
//           }}
//           components={{
//             Pagination: props => (<div style={{ dispaly: "none" }}></div>),
//             Toolbar: props => (
//               <div>
//                 <div style={{ display: "flex", padding: 8 }}>
//                   <div className={classes.search}>
//                     <div className={classes.searchIcon}>
//                       <SearchIcon style={{ color: "#7e8fa7" }} />
//                     </div>
//                     <InputBase
//                       placeholder={this.props.searchPlaceholder}
//                       classes={{
//                         root: classes.inputRoot,
//                         input: classes.inputInput,
//                       }}
//                       inputProps={{ 'aria-label': 'Search' }}
//                     />
//                   </div>
//                 </div>
//                 <Divider />
//               </div>
//             )
//           }}
//           onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
//           style={{ boxShadow: "none", overflow: "auto" }}
//         />
//       </MuiThemeProvider>
//     )
//   }
// }
// export default withStyles(styles)(MaterialTableDemo)