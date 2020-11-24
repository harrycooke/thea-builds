import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { withStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Fab,
  Card,
  Paper,
  Divider,
  TextField,
  MenuItem,
  FormControlLabel,
  FormControl,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Menu,
  Avatar,
  ListItemAvatar,
  ListItemText,
  CircularProgress
} from "@material-ui/core";
import AddAPhoto from '@material-ui/icons/AddAPhoto';


const styles = theme => ({
  container: {
    height: "40%",
    marginTop: "7%",
    // width: "20%"
  },
  mainText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
    [theme.breakpoints.up('sm') ]: {
      fontSize: 20,
    },
    textAlign: "center",
    color: "#818181",
  }
});
const acceptedFileTypes = "application/*, image/*, video/mp4,video/x-m4v,video/*, text/*, audio/*, document/*, .rtf, .dot"
class DropzonePlugin extends Component {

  onDrop = (file) => {
    this.props.handleFileUpload(file)
  }

  // removeFile = (fileIndex) => {
  //   this.props.removeFile(fileIndex)
  // }

  render() {
    const { classes } = this.props;

    return (
              <ButtonGroup fullWidth variant="outlined" size="large" color="primary" orientation="vertical" aria-label="contained primary button group">
          <Button className={classes.container}>
            {this.props.isLoading && (
              <CircularProgress
                size={20}
                disableShrink
              />
            )}
            <div className={classes.dropzone} style={{ height: "100%", cursor: "pointer" }}>
              <div style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <AddAPhoto style={{ width: 80, height: 80 }} />
                <p  className={classes.mainText}>Grab Page From Open Application</p>
              </div>
            </div>

          </Button>

                     {/* <Button variant="outlined" style={{ paddingBottom: 50, height: "0%", minHeight: 100 }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick}>
                        Grab Page From Open Application
                      </Button>*/}

          <Button className={classes.container}>

      <Dropzone accept={acceptedFileTypes} onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div>
            {this.props.isLoading && (
              <CircularProgress
                size={20}
                disableShrink
              />
            )}
            <div {...getRootProps({ className: 'dropzone' })} style={{ height: "100%", cursor: "pointer" }}>
              <input {...getInputProps()} />
              <div style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <CloudUploadIcon style={{ width: 80, height: 80 }} />
                <p className={classes.mainText}>Drag and drop or click here to upload files</p>
              </div>
            </div>

          </div>

        )}
      </Dropzone>
      </Button>

      </ButtonGroup>
    );
  }
}

export default withStyles(styles)(DropzonePlugin);