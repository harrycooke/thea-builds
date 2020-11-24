import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
// import Papa from 'papaparse';
import axios from 'axios';
import {
  Card,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Redirect, Link } from 'react-router-dom';

import Media from 'react-media';
//import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import { withStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import _ from "../../@lodash";
import { uploadFile } from '../../utils/s3';
import { getServerUrl } from '../../utils/functions';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);


const styles = theme => ({
  root: {
    paddingTop: theme.spacing(3),
    height: "65%",
    display: "flex",
    marginRight: 0,
    marginLeft: 0,
    justifyContent: "center"        //stretch, flex-start, center, flex-end, space-between, space-around
  },
  containCard: {
    width: "100%",
  },
  container: {
    width: "100%",
    height: `calc(100% - (90px))`,
    fallbacks: [
      { height: `-moz-calc(100% - (70px))` },
      { height: `-webkit-calc(100% - (70px))` },
      { height: `-o-calc(100% - (70px))` },
    ]
  },
  dropzone: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  mainText: {
    fontSize: 15,
    textAlign: "center",
    color: "#818181",
  },
  // p: {
  //   textAlign: "center",
  // },
  // p: {
  //   fontSize: "1.3rem",
  // }
});

//   example: {
//   padding: "20px",
//   color: white,
//   },
// /* Extra small devices (phones, 600px and down) */
// @media only screen and (max-width: 600px) {
//   .example {background: red;}
// }

// /* Small devices (portrait tablets and large phones, 600px and up) */
// @media only screen and (min-width: 600px) {
//   .example {background: green;}
// }

// /* Medium devices (landscape tablets, 768px and up) */
// @media only screen and (min-width: 768px) {
//   .example {background: blue;}
// } 

// /* Large devices (laptops/desktops, 992px and up) */
// @media only screen and (min-width: 992px) {
//   .example {background: orange;}
// } 

// /* Extra large devices (large laptops and desktops, 1200px and up) */
// @media only screen and (min-width: 1200px) {
//   .example {background: pink;}
// }



// var para = document.querySelector('p');
// var mql = window.matchMedia('(max-width: 600px)');

// function screenTest(e) {
//   if (e.matches) {
//     /* the viewport is 600 pixels wide or less */
//     para.textContent = 'This is a narrow screen — less than 600px wide.';
//     document.body.style.backgroundColor = 'red';
//   } else {
//     /* the viewport is more than than 600 pixels wide */
//     para.textContent = 'This is a wide screen — more than 600px wide.';
//     document.body.style.backgroundColor = 'blue';
//   }
// }

// mql.addListener(screenTest);







const acceptedImportFiles = "application/pdf, image/*, video/mp4,video/x-m4v,video/*, .doc, .docx, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
class Import extends Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      oldFileList: [],
      filePaths: [],
      isLoading: false
    };
    // this.updateData = this.updateData.bind(this);
  }

  // handleChange = files => {
  //   this.setState({
  //     csvfile: files[0]
  //   });
  // };

  // importCSV = () => {
  //   const { csvfile } = this.state;
  //   Papa.parse(csvfile, {
  //     complete: this.updateData,
  //     header: true
  //   });
  // };


  // updateData(result) {
  //   var data = result.data;
  // }

  uploadFile = async () => {
    this.setState({ isLoading: true });
    const { oldFileList, filePaths } = this.state;
    const promise = await Promise.all(oldFileList.map(async (file) => {
      return await uploadFile(file);
    }));
    promise.map(path => filePaths.push(path));
    axios.post(getServerUrl() + '/api/v1/case/getFileLink', filePaths)
      .then(res => {
        this.setState({
          uploadedLink: res.data.data,
          isLoading: false,
          oldFileList:[]
        })
      })
      .catch(err => {
        this.setState({ isLoading: false })
      })
  }

  onDrop = (uploadedFiles) => {
    const { oldFileList } = this.state;
    oldFileList.push(uploadedFiles);
    // Object.defineProperty(Array.prototype, 'flat', {
    //   value: function (depth = 1) {
    //     return this.reduce(function (flat, toFlatten) {
    //       return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
    //     }, []);
    //   }
    // });
    const files = _.uniqBy(oldFileList.flat(), function (e) {
      return JSON.stringify(e);
    });
    this.setState({ oldFileList: files });
  };

  render() {
    const { classes } = this.props;
    const { uploadedLink, oldFileList, isLoading } = this.state;

    // var para = document.querySelector('p');
    // var mql = window.matchMedia('(max-width: 600px)');
    // function screenTest(e) {
    //   if (e.matches) {
    //     /* the viewport is 600 pixels wide or less */
    //     para.textContent = 'This is a narrow screen — less than 600px wide.';
    //     // document.body.style.backgroundColor = 'red';
    //   } else {
    //     /* the viewport is more than than 600 pixels wide */
    //     para.textContent = 'This is a wide screen — more than 600px wide.';
    //     // document.body.style.backgroundColor = 'blue';
    //   }
    // }

    // screenTest(mql);
    // mql.addListener(screenTest);

    // mql.onchange = function() {
    //   console.log(mql);
    // }

    return (
      <div className={classes.root}>
        {/* <div>
          <Media queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)"
          }}>
            {matches => (
              <Fragment>
                {matches.small && <p>I am small!</p>}
                {matches.medium && <p>I am medium!</p>}
                {matches.large && <p>I am large!</p>}
              </Fragment>
            )}
          </Media>
        </div> */}
        <Grid item xs={12} md={6} sm={9} lg={6} xl={6}>
          <Card className={classes.containCard}>
            {/* <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          <button onClick={this.importCSV}> Upload now!</button> */}
            <Dropzone accept={acceptedImportFiles} onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className={classes.container}>
                  <div {...getRootProps({ className: 'dropzone' })} style={{ height: "100%" }}>
                    <input {...getInputProps()} />
                    <div className={classes.dropzone}>
                      <h2 style={{ lineHeight: "70px", textAlign: "center" }}>Import Data!</h2>
                      <CloudDownloadIcon style={{ width: 80, height: 80 }} />
                      <p className={classes.mainText}>Click here to upload a csv file.</p>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              height: 70,
              alignItems: "center",
              padding: 40
            }}>
              {uploadedLink &&
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: "17%"
                }}>
                  <p style={{ color: "#0000EE" }}>Upload Complete!</p>
                  <a href={uploadedLink}>
                    Click here to download the uploaded file.
                  </a>
                </div>
              }
              <Button
              fullWidth
                size="large"
                //marginRight="4"
                variant="contained"
                // color="secondary"
                onClick={this.uploadFile}
                disabled={!Boolean(oldFileList.length >= 1)}
              >
                Upload
              </Button>
            </div>
            {isLoading && (
              <CircularProgress
                disableShrink
                style={{
                  zIndex: 100,
                  position: "relative",
                  top: "-20vh",
                  left: "48%"
                }}
              />
            )}
          </Card>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Import);