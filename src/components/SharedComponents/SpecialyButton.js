// import React from 'react';
// import {
//   Button
// } from "@material-ui/core";
// import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//   buttonSpecialty: {
//     borderRadius: "50%",
//     width: 57,
//     height: 64,
//     backgroundColor: "#e0e9ff"
//   },
//   buttonImage: {
//     width: 94,
//     height: 72,
//   }
// })

// const SpecialyButton = props => {

//   const { classes } = props;

//   return (
//     <div style={{ textAlign: "center", display: "grid", justifyItems: "center" }}>
//       {
//         props.specialty && (
//           <Button className={classes.buttonSpecialty}>
//             <img alt="require" src={require(`../../assets/images/${props.specialty}.png`)} />
//           </Button>
//         )
//       }
//       {
//         props.imageName && (
//           <Button className={classes.buttonImage}>
//             <img alt="require" src={require(`../../assets/images/${props.imageName}.png`)} />
//           </Button>
//         )
//       }
//       {
//         props.imageName &&(
//           <label
//             style={{
//               color: "#1d1d1b",
//               fontFamily: "Open Sans",
//               fontSize: 12,
//               fontWeight: 700,
//               marginTop: 8              
//             }}
//           >
//             {props.imageName}
//           </label>
//         )
//       }  
//       {
//         props.specialty && (
//           <label
//             style={{
//               color: "#ababab",
//               fontFamily: "Open Sans",
//               fontSize: 12,
//               fontWeight: 400
//             }}
//           >
//             {props.specialty}
//           </label>
//         )
//       }    
//       {
//         props.date && (
//           <label
//             style={{
//               color: "#ababab",
//               fontFamily: "Open Sans",
//               fontSize: 12,
//               fontWeight: 400
//             }}
//           >
//             {props.date}
//           </label>
//         )
//       }
//     </div>
//   )
// }

// export default withStyles(styles)(SpecialyButton)