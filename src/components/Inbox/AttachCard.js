import React from 'react';
import axios from 'axios';
import {
  Card,
  CardActions,
  Modal,
  Fab,
  MobileStepper,
  Button,
  Link
} from "@material-ui/core";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from '@material-ui/styles';
import { Document, Page, pdfjs } from "react-pdf";
import { uploadFile } from '../../utils/s3';
import { getServerUrl } from '../../utils/functions';
import styles from "../../assets/styles/AttachCardStyles";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export class AttachCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      attachName: this.props.attachName,
      displayModal: false,
      numPages: null,
      pageNumber: 1,
      activeStep:0,
      imageStatus: true
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    // console.log("Got here: ", numPages);
  }

  handleImageLoaded = () => {
    this.setState({ imageStatus: false });
  }
  
  handleCardClick = (fileIndex) => {
    this.setState({
      displayModal: true,
      activeStep: fileIndex
    })
  }

  handleClose = () => {
    this.setState({
      displayModal: false
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

  handleNext = () => {
    this.setState({activeStep : this.state.activeStep + 1});
  };

  handleBack = () => {
    this.setState({activeStep : this.state.activeStep - 1});
  };

  pdfNext = () => {
    this.setState({pageNumber : this.state.pageNumber + 1});
  }
  pdfPrev = () => {
    this.setState({pageNumber : this.state.pageNumber - 1});
  }

  downloadFile = (url) => {
    fetch(url, {
      method: "GET",
      headers: {}
    })
    .then(response => {
      response.arrayBuffer().then(function(buffer) {
        let ext = response.url.split('.').pop().split(/\#|\?/)[0];
        let fileName = 'file_' + new Date().getTime() + '.' + ext;
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { uploadedLink, displayModal, pageNumber, numPages, activeStep, files } = this.state;
    const { classes, fileObj, currentCase, fileIndex } = this.props;
    const caseFiles = currentCase.caseData ? currentCase.caseData.files : [];
    const maxSteps = caseFiles.length;

    let filesUploaded;
    if (files && files.length >= 1) {
      filesUploaded = files.map((file, i) => (
          <img src={this.state.fileUrls[i]} alt={this.state.fileName[i]} style={{ width: "auto", height: "24vh", backgroundColor: "grey" }}  />
      ));
    } else {
      filesUploaded = []
    }


    let fileDisplay;
    let fileType = fileObj.type.substring(0, fileObj.type.indexOf("/"));
    let fileExt = fileObj.type.split('/').pop();
    
    if (fileType === 'image') {
      fileDisplay = <>{this.state.imageStatus && "Loading image"}<img src={fileObj.name} onLoad={()=>this.handleImageLoaded(this)} alt="Uploaded image" style={{ width: "auto", height: "24vh" }} /> 
      </>
    }
    else if (fileType === 'application' && fileExt === 'pdf') {
      fileDisplay = <div><div><Document
        file={fileObj.name} alt="Uploaded document"
        onLoadSuccess={this.onDocumentLoadSuccess.bind(this)} style={{ width: "auto", height: "24vh" }}
        >
        <Page pageNumber={pageNumber} />
      </Document></div>
      </div>
    }
    else if (fileType === 'application' && fileExt !== 'pdf') {
      fileDisplay = <p style={{ width: "70%", alignItems: "center", color: "grey" }}><b>Download to view</b><br/> {fileExt} file  </p>
    }
    else if (fileType === 'video') {
      fileDisplay = <><video src={fileObj.name} alt="Uploaded video" controls style={{ width: "auto", height: "24vh" }} /> 
      </>                 
    }
    else if (fileType === 'text') {                         
      fileDisplay = <p style={{ width: "70%", alignItems: "center", color: "grey" }}><b>Download to view</b><br/> {fileExt} file  </p>
    }
    else {                         //Not required this elseif but added as a safety net for any filetype
      fileDisplay = <p style={{ width: "70%", alignItems: "center", color: "grey" }}><b>Download to view</b><br/> {fileExt} file  </p>
    }



    /*===================*/
    let viewFiles = '';
    let fileTypeData = caseFiles[activeStep].type;
    let fileTypeRes = fileTypeData.substring(0, fileTypeData.indexOf("/"));
    let fileExtRes = fileTypeData.split('/').pop();
    
    if(fileTypeRes === 'image'){
      viewFiles = <>{this.state.imageStatus && "Loading file"}<img
                className={classes.img}
                onLoad={()=>this.handleImageLoaded(this)}
                src={caseFiles[activeStep].name}
                alt={caseFiles[activeStep].type}
              /></>
    }
    else if(fileTypeRes === 'application' && fileExtRes === 'pdf'){
      viewFiles = <Document
                    file={caseFiles[activeStep].name}
                    onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <p className={classes.textAlign}>
                      <Button size="small" className={classes.floatLeft} onClick={this.pdfPrev} disabled={pageNumber === 1}>
                        {styles.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Prev page
                      </Button>
                      Page {pageNumber} of {numPages}
                      <Button size="small" className={classes.floatRight} onClick={this.pdfNext} disabled={pageNumber === numPages}>
                        Next page
                        {styles.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </Button>
                    </p>
                    <Page pageNumber={pageNumber} className={classes.pdfView}/>
                  </Document>
    }
    else if(fileTypeRes === 'application' && fileExtRes !== 'pdf'){
      viewFiles = <h1 style={{ width: "70%", alignItems: "", color: "grey", marginTop:"20%" }}>{fileExtRes} file </h1>
    }
    else if (fileTypeRes === 'video') {
      viewFiles = <video src={caseFiles[activeStep].name} controls style={{ width: "100%", height: "100%" }} />
    }
    else if (fileTypeRes === 'text') {
      viewFiles = <h1 style={{ width: "70%", alignItems: "", color: "grey", marginTop:"30vh" }}>{fileExtRes} file</h1>
    }
    else {
      viewFiles = <h1 style={{ width: "70%", alignItems: "", color: "grey", marginTop:"30vh" }}>{fileExtRes} file</h1>
    }
     
    
    return (
      <div>
        <div className={classes.container}>
          <Card className={classes.contentCard} >
            <CardActions
              className={classes.cardAction} 
              onClick={event => this.handleCardClick(fileIndex) }
              // key={fileObj.type} style={ width= {fileObj.type === 'application' ? "24vh" : "auto" }}
              >
              {fileDisplay}
            </CardActions>

            <div>
              {/* {files && files.length >= 1 && (
                  filesUploaded = files.map((file, i) => (
                    <p>{file.name.slice(13)}Case</p>                                 //Slices the initial substring of Epoch time (13 char) from the filename
                ))
              )} */}

              <p>
                {/*<Link href={fileObj.name} download target="_blank" style={{ float: "right" }} >*/}
                <Link onClick={() => this.downloadFile(fileObj.name)} style={{ float: "right" }} >
                  {/* {console.log("this is the file" + fileObj.name)} */}
                  <IconButton >
                    <GetAppIcon style={{ marginLeft: 5, color:"#004866" }} className={classes.title} />
                  </IconButton>
                </Link>
              </p>
            </div>
          </Card>
        </div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={displayModal}
          onClose={this.handleClose}
          BackdropProps={{ style: { top: 64, left: "0%" } }}                //The grey Modal background when a file is opened
        >
          <div className={classes.modalContainer}>
            <Card className={classes.modalCard} style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
              {viewFiles}
            </Card>

            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1} style={{ color:"#fff" }}>
                  Next
                  {styles.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0} style={{ color:"#fff" }}>
                  {styles.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
            <div style={{
              justifyContent: "center",
              display: "flex",
              paddingTop: 5
            }}>
              <Fab
                variant="round"
                className={classes.closeButton}
                onClick={this.handleClose}>
                <CloseIcon />
              </Fab>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentCase: state.case.currentCase
});


export default connect(
  mapStateToProps,{}
)(withStyles(styles)(AttachCard));