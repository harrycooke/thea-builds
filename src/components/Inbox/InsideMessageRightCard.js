import React from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  Typography,
  withStyles,
  Modal,
  Fab,
  MobileStepper,
  Button,
  Divider,
  CircularProgress
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import HighlightOff from "@material-ui/icons/HighlightOff";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AttachCard from "./AttachCard";
import { Document, Page, pdfjs } from "react-pdf";
import DiagnosisIcon from "../../assets/icons/DiagnosisIcon.svg";
import { isEmpty, getFileNameFromUrl } from '../../utils/functions';
import DropzonePlugin from "../NewCase/DropzonePlugin";
import { uploadFile, removeFileFromS3 } from '../../utils/s3';
import { getServerUrl } from '../../utils/functions';
import { modifyCase, setCurrentCase } from "../../actions/caseAction";
import Thumbnail from '../SharedComponents/Thumbnail';
import MomentUtils from "@date-io/moment";
import moment from "moment";

const styles = theme => ({
  rightCard: {
    overflow: "auto",
    borderRadius: 0,
    height: "92vh",
    padding: theme.spacing(4)
  },
  rightCardCollapsed: {
    width: theme.spacing(11),
    float: "right",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    display: "flex",
    backgroundColor: "#f2f2f2"
  },
  caseInfoText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
    [theme.breakpoints.up('sm') ]: {
      fontSize: 20,
    },
    color: "#858585",
    marginTop: 10,
  },
  caseInfoDetailsText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('sm') ]: {
      fontSize: 16,
    },
    color: "#000000",
    marginTop: 10,
  },
  additionInfoText: {
    fontSize: 20,
    color: "#848484",
    opacity: 0.4,
    marginLeft: 50
  },
  nameText: {
    fontWeight: "600",
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('sm') ]: {
      fontSize: 24,
    },
    fontSize: 24,
    color: "#454545",
    align: "center"
  },
  modalContainer: {
    minWidth: 350,
    minHeight: 350,
    width: "42%",
    height: "50%",
    outline: "none",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "27%",
  },
  modalCard: {
    width: "100%",
    height: "100%",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 5,
  },
  img: {
    height: '100%',
    overflow: 'hidden',
    display: 'block',
    width: 'auto',
    justifyContent: "center",
    alignItems: "center",
  },
pdfView:{
    [theme.breakpoints.down('sm')]: {
        width: "69%",
    },
    [theme.breakpoints.up('sm')]: {
        width: "100%",
    }, 
    [theme.breakpoints.up('md')]: {
        width: "100%",
    },          
    overflow:'scroll',
    height:"100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    width: '100%',
    height: 38,
    backgroundColor: "#fff",
    marginLeft: "10%",
    paddingLeft: 15,
    paddingRight: 15,
    textTransform: "unset",
    fontSize: 18
  },
  uploadButton: {
    width: '100%',
    height: 38,
    textTransform: "unset",
    [theme.breakpoints.down('sm')]: {
      height: 35,
      fontSize: 15,
    },
    [theme.breakpoints.up('sm') ]: {
      height: 40,
      fontSize: 16,
    },
  },
})

export class InsideMessageRightCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCase: '',
      openUploadFileModal:false,
      files: [],
      fileUrls: [],
      fileName: '',
      pageNumber: 1,
      isLoading: false
    }
    this.removeFile = this.removeFile.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      currentCase: nextProps.currentCase
    })
  }

  __renderViewer = (files) => {
    let viewers = [];
    for (let i = 0; i < files.length; i += 2) {
      viewers.push(
        <Grid container justifycontent={"center"} spacing={3} key={i}>
          {files[i] !== undefined && (
            <Grid item xs={12} sm={6}>
              <AttachCard
                attachName={getFileNameFromUrl(files[i].name)}
                fileObj={files[i]}
                fileIndex={i}
                actionIcon={
                  <IconButton >
                    <HighlightOff style={{ marginLeft: 5, color:"white" }}/>
                  </IconButton>
                }
              />
            </Grid>
          )}
          {files[i + 1] !== undefined && (
            <Grid item xs={12} sm={6}>
              <AttachCard
                attachName={getFileNameFromUrl(files[i + 1].name)}
                fileObj={files[i + 1]}
                fileIndex={i + 1}
              />
            </Grid>
          )}
        </Grid>
      )
    }
    return viewers
  }

  handleFileUpload = async newFile => {
    this.setState({ isLoading: true });
    if (newFile && newFile.length) {
      for (let i = 0; i < newFile.length; i++) {
        const [promiseFile, promiseUrl, promiseName] = await uploadFile(newFile[i]); 
        this.setState({ files: [...this.state.files, promiseFile] });
        this.setState({ fileUrls: [...this.state.fileUrls, promiseUrl] });
        this.setState({ fileName: [...this.state.fileName, promiseName] });
      }
      this.setState({ isLoading: false })
    }
  }

  uploadNewFiles = () =>{
    this.setState({
      openUploadFileModal: true
    })
  }

  printNotNull = () => {
    const { currentCase,  files } = this.state;
    if (currentCase && currentCase.patientData){
      Object.keys(currentCase.patientData)
      for(const item in currentCase.patientData){
        if (currentCase.patientData[item]){
          console.log(`${item}: ${currentCase.patientData[item]}`);
        }
      }
    }
    return "hello"
  }

  handleFileModalClose = () => {
    this.setState({
      openUploadFileModal: false
    })
  }

  handleUploadFiles = () => {
    const { currentCase,  files } = this.state;
    const current_time = new Date();
    const current_timestamp = current_time.getTime();
    let newCaseData = {
      caseId: currentCase.caseData.case_id,
      last_updated_by_id: this.props.userdata.id,
      is_read: true,
      updated_at: current_timestamp,
      questions: currentCase.caseData.questions,
      is_deleted: false
    };

    if(this.props.userdata.user_type === 'PCP'){
      let caseData = currentCase.caseData; 
      let newFiles = [];  
      if(caseData && caseData.id){
        let caseOldFiles = caseData.existedFiles;
        if (files && files.length >= 1 && caseOldFiles && caseOldFiles.length >=1) {
          files.map((file, i) => (
            caseOldFiles.push(file)
          ));
        }else{
          caseOldFiles = files;
        }
        newCaseData['files'] = caseOldFiles
      }
    }
    
    this.props.modifyCase(newCaseData);

    const currentCaseCondition = {
      case_id: currentCase.caseData.case_id,
      currentUserRole: this.props.userdata.user_type
    }
    setTimeout(() => {
      this.props.setCurrentCase(currentCaseCondition);
    }, 100)
    

    this.setState({
      openUploadFileModal: false,
      files: [],
    })
  }

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

  removeFile = async fileIndex => {
    const promiseFile = await removeFileFromS3(this.state.files[fileIndex], fileIndex);

    var array = [...this.state.files]; // make a separate copy of the array
    var index = promiseFile

    var urlArray = [...this.state.fileUrls]; // make a separate copy of the array
    var urlIndex = fileIndex;
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ files: array });

      urlArray.splice(fileIndex, 1);
      this.setState({ fileUrls: urlArray });   
    }
  }

  pdfNext = () => {
    this.setState({pageNumber : this.state.pageNumber + 1});
  }
  pdfPrev = () => {
    this.setState({pageNumber : this.state.pageNumber - 1});
  }

  fileDisplay = (file, fileUrl, fileName) => {
    const pageNumber = 1;
    const fileType = file.type.substring(0, file.type.indexOf("/"));
    let fileExt = file.type.split('/').pop();
    let fileDisplay;

    if (fileType === 'image') {
      fileDisplay = <img src={fileUrl} alt={fileName} style={{ height: '100%', overflow: 'hidden', display: 'block', width: 'auto', justifyContent: "center", alignItems: "center", }} />
    }
    else if (fileType === 'application' && fileExt === 'pdf') {
      fileDisplay = <div><Document
        file={fileUrl}
        alt={fileName}
        style={{ width: "100%", height:"100%", overflow:'scroll', width: "100%", justifyContent: "center", alignItems: "center",}}>
        <Page pageNumber={pageNumber} />
      </Document></div>
    }
    else if (fileType === 'application' && fileExt !== 'pdf') {
      fileDisplay = <h6 style={{ marginLeft: "5%", marginRight: "5%",marginTop: "30%", alignItems: "center", color: "grey", variant: "subtitle2", display:"block",  }}> {fileExt} file </h6>
    }
    else if (fileType === 'video') {
      fileDisplay = <video src={fileUrl} alt={fileName} style={{ width: "100%", height: "100%" }} />                   //Edit this if required
    }
    else {
      fileDisplay = <h6 style={{ marginLeft: "5%", marginRight: "5%",marginTop: "30%", alignItems: "center", color: "grey", variant: "subtitle2", display:"block",  }}> {fileExt} file </h6>
    }
    return fileDisplay;
  }

  render() {
    const { classes, fileObj, expanded, fileIndex } = this.props;
    const { currentCase, openUploadFileModal, uploadedLink, files, fileUrls, fileName, displayModal, pageNumber, numPages, activeStep } = this.state;
    
    let filesUploaded;
    if (files && files.length >= 1) {
      filesUploaded = files.map((file, i) => (
          <img src={this.state.fileUrls[i]} alt={this.state.fileName[i]} style={{ width: "auto", height: "24vh", backgroundColor: "grey" }}  />
      ));
    } else {
      filesUploaded = []
    }

    let uploadButton = '';
    if(this.props.userdata.user_type === 'PCP' && currentCase.caseData && !currentCase.caseData.is_deleted){
      uploadButton = (<div style={{ marginLeft: "auto" }}>
        <Button
            variant="contained"
            color="primary"
            onClick={this.uploadNewFiles}
            className={classes.uploadButton}
          >
            Upload Files
          </Button>
      </div>)
    }
    
    if (expanded) {
      return (
        <Card className={classnames(classes.rightCard, classes.rightCardCollapsed)}>
          <img alt="required" src={DiagnosisIcon} />
        </Card>
      )
    } else {
      return (
        <Card className={classes.rightCard}>
          <div style={{ display: "flex", backgroundColor: "white" }}>
            <Typography className={classes.caseInfoText}>
              Case Information
            </Typography>
            {uploadButton}
          </div>
          
          {/*-----------------Upload case Files ---------------*/}
         <Modal 
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openUploadFileModal}
          onClose={this.handleClose}
          style={{ display: "flex", justifyContent: "center" }}
          >
            <div className={classes.modalContainer}>
              <Card className={classes.modalCard}>
                <div style={{height: "80%", minHeight: 100 }}>
                  <DropzonePlugin
                    removeFile={this.removeFile}
                    handleFileUpload={this.handleFileUpload}
                    files={this.state.files}
                  />
                </div>

                <Divider />

                <aside style={{ maxHeight: 110, overflow: 'auto', backgroundColor: "white", margin: "10px" }}>
                  {this.state.isLoading && (
                    <CircularProgress
                      style={{ marginTop: 10, marginLeft: 32, alignSelf: 'center' }}
                      size={20}
                      disableShrink
                    />
                  )}
                  <GridList className={classes.gridList} cols={3.5}>
                      {files && files.length >= 1 && (
                        filesUploaded = files.map((file, i) => (
                        <GridListTile key={i}>
                          {this.fileDisplay(file,this.state.fileUrls[i],this.state.fileName[i] )}
                          <GridListTileBar
                          //Add styles to the name(title) to display it smaller for complete name viewing
                            title={file.name.slice(13)}                                 //Slices the initial substring of Epoch time (13 char) from the filename
                            titlePosition="top"
                            classes={{
                              root: classes.titleBar,
                              title: classes.title,
                            }}
                            actionIcon={
                              <IconButton aria-label={`star ${file.title}`}>
                                <HighlightOff style={{ marginLeft: 5, color:"white" }} onClick={this.removeFile.bind(this, i)} className={classes.title}/>
                              </IconButton>
                            }
                          />
                        </GridListTile>
                      ))
                    )}
                  </GridList>
                </aside>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleUploadFiles}
                  disabled={!Boolean(filesUploaded.length >= 1)}
                >
                  Upload
                </Button>
              </Card>
              <div style={{
                justifyContent: "center",
                display: "flex",
                paddingTop: 5
              }}>
                <Fab
                  variant="round"
                  className={classes.modalCloseButton}
                  onClick={this.handleFileModalClose}>
                  <CloseIcon />
                </Fab>
              </div>
              
            </div>
          </Modal> 

          <div style={{
            justifyContent: "center",
            display: "flex",
            height: "15%",
            alignItems: "center"
          }}>
            {!isEmpty(currentCase) && (
              <Typography className={classes.nameText}>
                <p>Patient: {currentCase.caseData.patient_name}</p>
                {currentCase.patientData.dob && (<p>DOB: {moment(currentCase.patientData.dob).format('MM/DD/YYYY')}</p>)}
              </Typography>

            )}
          </div>

          <div style={{
            justifyContent: "center",
            display: "flex",
            height: "15%",
            alignItems: "center"
          }}>
            {!isEmpty(currentCase) && (
              <Typography className={classes.nameText}>
                <p>{this.printNotNull}</p>
              </Typography>

            )}
          </div>

          {currentCase.caseData !== undefined && currentCase.caseData.files && currentCase.caseData.files.length >= 1 &&
            this.__renderViewer(currentCase.caseData.files)
          }
        </Card>
      )
    }
  }
}

InsideMessageRightCard.propTypes = {
  currentCase: PropTypes.any.isRequired,
  modifyCase: PropTypes.func.isRequired,
  userdata: PropTypes.object.isRequired,
  setCurrentCase: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentCase: state.case.currentCase,
  errors: state.errors,
  userdata: state.auth.userdata
});

export default connect(
  mapStateToProps,
  {modifyCase, setCurrentCase}
)(withStyles(styles)(InsideMessageRightCard));