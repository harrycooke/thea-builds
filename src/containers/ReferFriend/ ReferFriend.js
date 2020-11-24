import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { sendCase, setSnackbar, getUserPatients } from "../../actions/caseAction";
import { saveDraft, modifyDraft } from "../../actions/draftActions";
import {
  Grid,
  Typography,
  Button,
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
  CircularProgress
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Document, Page, pdfjs } from "react-pdf";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import socket from "../../socket";
import DropzonePlugin from "../../components/NewCase/DropzonePlugin";
import { specialtyFullList } from "../../utils/constant";
import { isEmpty, getFileNameFromUrl, generateCaseID, encodeString, decodeString } from "../../utils/functions";
import { sendAmplitudeData } from "../../utils/amplitude";
import styles from "../../assets/styles/NewCaseStyles";
import { uploadFile, removeFileFromS3, getSignedUrl } from '../../utils/s3';
import HighlightOff from "@material-ui/icons/HighlightOff";
import CircularProgressCustom from '../../components/SharedComponents/CircularProgress';
import Thumbnail from '../../components/SharedComponents/Thumbnail';
import { getServerUrl } from '../../utils/functions';
import axios from 'axios';


import MomentUtils from "@date-io/moment";
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns'; //TODO convert date-fns to moment
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export class ReferFriend extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.goBack = this.goBack.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  getInitialState = () => {
    const initialState = {
      patient_id: '',
      specialist_id: '',
      specialty: '',
      patientName: '',
      dob: null,
      question: '',
      files: [],
      fileUrls: [],
      pageNumber: 1,
      labelWidth: 0,
      errors: {},
      success: false,
      isSubmitting: false,
      client: socket(),
      isChecked: false,
      isDraft: false,
      draftId: '',
      isLoading: false,
      patientList: []

      //openAlert: false,
    }
    return initialState;
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    sendAmplitudeData('Open new case page')
    if (id === undefined) {
      this.setState(this.getInitialState())
    } else {
      console.log(`id===`, this.props.currentDraft)
    }
    
    const currentUserData = {
      currentUserId: this.props.auth.id,
      curretnUserRole: this.props.auth.user_type
    }

    setTimeout(() => {
      console.log("getting patients")
      this.props.getUserPatients(currentUserData);
    }, 500)

    // window.addEventListener("beforeunload", (ev) => {
    //   ev.preventDefault();
    //   const { specialty, specialist_id, patientName, question, files, fileUrls, isChecked } = this.state;
    //   if (specialty !== '' || patientName !== '' || question !== '' || isEmpty(files) === false) {
    //     // this.handleSaveDraft();
    //     return ev.returnValue = 'Are you sure you want to close?';
    //   }
    // });

    if(this.props.case.patientList && this.props.case.patientList.length != 0){
      this.setState({patientList: this.props.case.patientList});
      console.log("got patients");
      // console.log(this.props.case.patientList);
      // console.log(this.state.patientList);

    } else{
      console.log("didn't get patients")

    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentDraft !== this.props.currentDraft) {
      //let draftFiles = [];

      const { currentDraft } = nextProps;
      if (currentDraft.draftData.files) {
        for (let i = 0; i < currentDraft.draftData.files.length; i++) {
          //draftFiles[i] = JSON.parse(currentDraft.draftData.files[i]);
          //console.log(draftFiles[i])
          // console.log("draft file " + i + " " + currentDraft.draftData.files[i])
          // console.log(currentDraft.draftData.files[i])

          this.getThumbnail(currentDraft.draftData.files[i])
        }


      } else {
        console.log("no draft data files");

      }
      this.setState({
        isDraft: true,
        draftId: currentDraft.draftData.case_id && currentDraft.draftData.case_id,
        specialist_id: currentDraft.draftData.specialist_id && currentDraft.draftData.specialist_id,
        specialty: currentDraft.draftData.specialty && currentDraft.draftData.specialty,
        patientName: currentDraft.draftData.patient_name && currentDraft.draftData.patient_name,
        question: currentDraft.draftData.questions && decodeString(currentDraft.draftData.questions),
        files: currentDraft.draftData.files,
        fileUrls: [],
        labelWidth: 0,
        //errors: {},
        success: false,
        isSubmitting: false,
        client: socket(),
        isChecked: currentDraft.draftData.patient_consent_given && currentDraft.draftData.patient_consent_given
      })
      //console.log("current draftdata files " + currentDraft.draftData.files);

      //console.log(currentDraft.draftData.files);
    }

    if (nextProps.patientList) {
      this.setState({
        patientList: nextProps.patientList
      })
    }
    if (Object.keys(nextProps.errors).length > 0) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentWillUnmount() {
    const { specialty, patientName, question, files } = this.state;
    if (specialty !== '' || patientName !== '' || question !== '' || isEmpty(files) === false) {
      this.handleSaveDraft();
    }
  }

  getThumbnail = async (file) => {
    // console.log("getting Thumbnail" );
    // console.log("getting Thumbnail " + file);
    // console.log("getting Thumbnail " + file.name);


    const fileResponse = await getSignedUrl('get', file.name) //import get signed url from utils/s3.js

    const url = fileResponse.data.url;
    // console.log("got url " + url);
    // console.log(url);

    this.setState({ fileUrls: [...this.state.fileUrls, url] });
  }
  

  handleSaveDraft = async event => {
    const { specialty, specialist_id, patientName, files, question, isChecked, isDraft, draftId, dob, patient_id } = this.state;
    const current_time = new Date();
    const current_timestamp = current_time.getTime();
    const provider_id = this.props.auth.id;
    const case_id = isDraft ? draftId : generateCaseID(patientName, current_timestamp);

    const newDraft = {
      case_id: case_id,
      provider_id: provider_id,
      specialist_id: specialist_id,
      patient_id: patient_id,
      specialty: specialty,
      patient_name: patientName,
      questions: question === '' ? '' : encodeString(question),
      files: files,
      is_completed: false,
      created_at: current_timestamp,
      updated_at: current_timestamp,
      patient_consent_given: isChecked
    };
    if (isDraft) this.props.modifyDraft(newDraft)
    else this.props.saveDraft(newDraft)
  }

  handleSpecialtyChange = e => {
    e.preventDefault();
    let specialist_id;
    switch (e.target.value) {
      case 'Dermatology':
        specialist_id = 26
        break;
      case 'Endocrinology':
        specialist_id = 22
        break;
      case 'Ophthalmology':
        specialist_id = 21
        break;
      case 'Neurology':
        specialist_id = 23
        break;
      case 'Orthopedics':
        specialist_id = 100
        break;
      default:
        break;
    }
    this.setState({
      specialty: e.target.value,
      specialist_id: specialist_id
    })
  }



handlePatientNameChange = (e, opt) => {

     /*this.setState({
        patientName: e.target.value
    })      });*/
    //console.log('opt', opt);
    // console.log(opt);

    if(opt.id !== ''){
      this.setState({
        patient_id: opt.id,
        patientName: opt.fullName,
      });
      if(opt.dob !== ''){
        // console.log(opt.dob);
        // console.log(typeof opt.dob);

        this.setState({
          dob: opt.dob
        });
        // console.log(this.state.dob);
      }
    } 
  } 

  setDOB(event, date){
    // console.log('event:', event, ' date:', date);

    // console.log(typeof date);
    this.setState({
      dob: date
    })
  }

//----- Check patient -----//
  handleOnBlur = (e) =>{

    // console.log('blur', e.target.value);    

    let patientData = {
      fullName: e.target.value
    }
    /*axios.post(getServerUrl() + '/api/v1/patient/savePatient', patientData)
      .then(res => {
        console.log(res.data,'=======', res.status)
      })
      .catch(err => {
        console.log(err,'-------')
      })*/

    this.setState({
      patientName: e.target.value
    });
  }

  handleQuestionChange = e => {
    e.preventDefault();
    this.setState({
      question: e.target.value
    })
  }

  handleFileUpload = async newFile => {
    this.setState({ isLoading: true })
    //sendAmplitudeData('Add images to a case');
    if (newFile && newFile.length) {
      for (let i = 0; i < newFile.length; i++) {
        const [promiseFile, promiseUrl] = await uploadFile(newFile[i]);
        this.setState({ files: [...this.state.files, promiseFile] });
        this.setState({ fileUrls: [...this.state.fileUrls, promiseUrl] });
      }
      this.setState({ isLoading: false })

    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { specialist_id, specialty, patientName, question, files, isChecked, isDraft, draftId, dob, patient_id } = this.state;

    if (specialist_id !== '' && specialty !== '' && patientName !== '' && dob !== '' && isChecked === true) {
      this.setState({ isSubmitting: true })
      const provider_id = this.props.auth.id;
      //const practice_id = this.props.auth.practice_id;

      const current_time = new Date();
      const current_timestamp = current_time.getTime();
      const case_id = generateCaseID(patientName, current_timestamp);

      // const promise = await Promise.all(files.map(async (file) => {
      //   return await uploadFile(file);
      // }));
      // promise.map(path => fileUrls.push(path))

      const newCase = {
        case_id: case_id,
        provider_id: provider_id,
        patient_id: patient_id,
        specialist_id: specialist_id,
        specialty: specialty,
        patient_name: patientName,
        dob: dob,
        questions: encodeString(question),
        files: files && files.length ? files : null,
        is_read: true,
        created_at: current_timestamp,
        updated_at: current_timestamp,
        is_deleted: false,
        patient_consent_given: isChecked,
        email: this.props.auth ? this.props.auth.email : ''
      };
      this.props.sendCase(newCase);
      
      if (isDraft) { 
        this.props.modifyDraft({
          case_id: draftId,
          is_completed: true
        });
      }

      this.setState(this.getInitialState(), () => {
        this.props.setSnackbar(true);
        this.goBack();
      });
      // this.setState({
      //   files: [],
      //   fileUrls: []
      // });
      //this.setState({ isSubmitting: false})
      
    } else {
      if (specialty === '') {
        let errors = {
          specialty: "Specialty field is required."
        }
        this.setState({ errors })
      } else if (patientName === '') {
        let errors = {
          patient_name: "Patient name field is required."
        }
        this.setState({ errors })
      } else if (dob === null || dob === '') {
        let errors = {
          patient_name: "Patient DOB field is required."
        }
        this.setState({ errors })
      } else if (isChecked === false) {
        let errors = {
          patient_consent_given: "Patient consent is required."
        }
        this.setState({ errors })
      }
    }
  }

  goBack() {
    this.props.history.push("/inbox/cases");
  }

  handleClose = () => {
    //this.setState({ openAlert: false });
    //this.setState({ setOpen: false });
    //this.goBack();
  }

  removeFile = async fileIndex => {
    const promiseFile = await removeFileFromS3(this.state.files[fileIndex], fileIndex);

    var array = [...this.state.files]; // make a separate copy of the array
    var index = promiseFile;

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

  fileDisplay = (file, fileUrl) => {
    // console.log("file: " + file);
    // console.log(file);
    // console.log("file name: " + file.name);
    // console.log(file.name);

    // console.log("file type: " + file.type);
    // console.log(file.type);

    const pageNumber = 1;
    const fileType = file.type.substring(0, file.type.indexOf("/"));
    let fileExt = file.type.split('/').pop();
    let fileDisplay;

    if (fileType === 'image') {
      fileDisplay = <img src={fileUrl} alt="Uploaded Image" style={{ height: '14vh', overflow: 'hidden', display: 'block', width: 'auto', justifyContent: "center", alignItems: "center", }} />
    }
    else if (fileType === 'application' && fileExt === 'pdf') {
      fileDisplay = <div><Document
        file={fileUrl}
        alt="Uploaded application/document"
        style={{ width: "100%", height:"14vh", overflow:'scroll', width: "100%", justifyContent: "center", alignItems: "center",}}>
        <Page pageNumber={pageNumber} />
      </Document></div>
    }
    else if (fileType === 'application' && fileExt !== 'pdf') {
      fileDisplay = <h6 style={{ marginLeft: "5%", marginRight: "5%",marginTop: "30%", alignItems: "center", color: "grey", variant: "subtitle2", display:"block",  }}> {fileExt} file </h6>
    }
    else if (fileType === 'video') {
      fileDisplay = <video src={fileUrl} alt="Uploaded video" style={{ width: "100%", height: "14vh" }} />                   //Edit this if required
    }
    else {
      fileDisplay = <h5 style={{ marginLeft: "5%", marginRight: "5%",marginTop: "30%", alignItems: "center", color: "grey", display:"block",  }}> {fileExt} file </h5>
    }
    return fileDisplay;
  }

  render() {
    const { classes, fileObj, expanded, fileIndex } = this.props;
    const {
      specialty,
      patientName,
      errors,
      //openAlert,
      files,
      fileUrls,
      patientList,


    } = this.state;
    // console.log(patientList);

    let fileDisplay;
    let fileType;
    let filesUploaded;

    if (files && files.length >= 1) {
      filesUploaded = files.map((file, i) => (
          <img src={this.state.fileUrls[i]} style={{ width: "auto", height: "24vh", backgroundColor: "grey" }}  />
      ));
    } else {
      filesUploaded = []
    }




    // if (files && files.length >= 1) {
    //   filesUploaded = files.map((file, i) => (
    //     <li key={i} className={classes.list}>
    //       <span className={classes.listDot}></span>{file.name}
    //       {/* <img src={this.state.file}/> */}
    //       <HighlightOff style={{ marginLeft: 5 }} onClick={this.removeFile.bind(this, i)} />
    //     </li>
    //   ));
      ///comment to make sublime happy

    let loader = this.props.auth.loading ? this.props.auth.loading : false
    return (
      <div className={classes.root}>
        <Grid container justify="center">

          <div className={classes.arrowBackWrapper}>
            
          </div>
          {/* <Grid container justify="center" margin="40"> */}
          <Grid item xs={12} md={10} sm={12} lg={8} xl={8} style={{ height: "100%", margin: "200" }}>
            <Paper className={classes.paper} elevation={3} >

              {/* TODO: Reduce marginLeft for mobile size */}
              <Typography className={classes.headText}>
                Create Case                                                     
              </Typography>
              <Divider />
              {/* <Card className={classes.contentPaper}> */}
                <div style={{
                  paddingRight: "3em",
                  paddingBottom: 0,
                  paddingTop: 20,
                  height: "30%",
                  minHeight: 130
                }}>
                  <div style={{ display: "flex", margin: "0.5em" }}>

                    {/* TODO: Increase marginLeft for normal size */}
                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      <TextField                                                
                        select
                        variant="filled"
                        required
                        fullWidth
                        id="specialty"
                        label="Select Specialty"
                        name="specialty"
                        autoComplete="specialty"
                        value={specialty}
                        onChange={this.handleSpecialtyChange}
                        className={classnames(classes.specialItem, {
                          invalid: errors.specialty,
                        })}
                      >
                        {specialtyFullList.map(specialty => (
                          <MenuItem key={specialty.value} value={specialty.value}>{specialty.label}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    </div>
                    <Typography
                      color="error"
                      className={classes.errorText}
                    >
                      {errors.specialty} 
                    </Typography>
                    <div style={{ display: "flex", margin: "0.5em" }}>
                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      <Autocomplete
                        freeSolo
                        disableClearable
                        onChange={this.handlePatientNameChange}
                        options={this.props.case ? this.props.case.patientList : []}
                        getOptionLabel={option => option.fullName}
                        renderOption={
                          (option) => <Typography noWrap>{option.fullName} {option.dob ? '('+ moment(option.dob).format('MM/DD/YYYY')+')' : ''}</Typography>
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            id="patientName"
                            label="Type Patient Name"
                            name="patientName"
                            value={patientName}
                            onBlur={this.handleOnBlur}
                            className={classnames(classes.specialItem, {
                              invalid: errors.patient_name
                            })}
                            InputProps={{ ...params.InputProps, type: 'search' }}
                          />
                        )}
                      />
                    </Grid>
                  </div>
                  <div style={{ display: "flex", margin: "0.5em" }}>
                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          autoOk
                          inputVariant="filled"
                          required
                          fullWidth
                          disableFuture
                          className={classnames(classes.specialItem, {
                          itemnvalid: errors.specialty,
                          })}                         
                          placeholder="09/09/1990"
                          format="MM/DD/YYYY"
                          label="Type Patient DOB"
                          InputAdornmentProps={{ position: "start" }}
                          value={this.state.dob}
                          onChange={(date, event) => this.setDOB(event, date)}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </div>
                   <Typography
                      color="error"
                      className={classes.errorText}
                    >
                      {errors.specialty} 
                    </Typography>
                  {/*<div style={{ display: "flex", margin: "0.5em" }}>
                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      <Autocomplete
                        id="select-pt"
                        freeSolo
                        disableClearable
                        //options={patientList.map((option) => option.fullName)}
                        options={top100Films.map((option) => option.title)}

                        onChange={this.handlePatientNameChange}
                        options={patientList}
                        getOptionLabel={option => option.fullName}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            variant="filled"
                            label="Type Patient Name"
                            //InputProps={{ ...params.InputProps, type: 'search' }}
                          />
                        )}
                      />
                    </Grid>
                  </div>*/}
                  <Typography
                    color="error"
                    className={classes.errorText}
                  >
                    {errors.patient_name} 
                  </Typography>

                </div>

                {/* <Divider /> */}
                <Card className={classes.mainNewCaseWrapper} elevation={0} margin={0} padding={0}>
                  <div style={{ paddingLeft: 10, height: "30%", minHeight: 50 }}>
                    <TextField
                      multiline
                      fullWidth
                      rows={5}
                      required
                      rowsMax="7"
                      value={this.state.question}
                      placeholder={"Type a specific question for the specialist here"}
                      onChange={this.handleQuestionChange}
                      className={classes.textField}
                      margin="normal"
                      variant="filled"
                      
                    />
                  </div>
                </Card>
                
                <Card elevation={3} margin={0} padding={0} >
                  <div style={{ paddingBottom: 50, height: "0%", minHeight: 180 }}>
                    <DropzonePlugin
                      removeFile={this.removeFile}
                      handleFileUpload={this.handleFileUpload}
                      files={this.state.files}
                    />
                  </div>

                  <Divider />
                  <aside style={{ maxHeight: 250, overflow: 'auto', backgroundColor: "white", margin: "10px" }}>
                    {this.state.isLoading && (
                      <CircularProgress
                        style={{ marginTop: 10, marginLeft: 32, alignSelf: 'center' }}
                        size={20}
                        disableShrink
                      />
                    )}
                    <GridList className={classes.gridList} cols={5.5}>
                      {files && files.length >= 1 && (
                        // {tileData.map((tile) => (
                        filesUploaded = files.map((file, i) => (
                        <GridListTile key={i}>
                          {this.fileDisplay(file,this.state.fileUrls[i] )}

                          <GridListTileBar
                            //Add styles to the name(title) to display it smaller for complete name viewing
                            title={file.name.slice(13)}
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
                </Card>

                <div style={{
                    paddingLeft: 30,
                    // marginTop: 30,
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    height: "8%",
                    justifyContent: "center"
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="remember"
                          color="primary"
                          onChange={() => this.setState({ isChecked: !this.state.isChecked })}
                        />}
                      label="Patient has verbally consented to this consultation including any financial obligations that arise from it.*"
                    />
                    <Typography style={{marginLeft:0}}
                      color="error"
                      className={classes.errorText}
                    >
                      {errors.patient_consent_given}
                    </Typography>
                  </div>
                {/* <Divider /> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: 80,
                    minHeight: 90
                  }}>
                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      <Button
                        variant="contained"
                        // color="primary"
                        backgroundColor= "#fff"
                        aria-label="add"
                        style={{ marginLeft: 30, flexDirection: "row", display: "flex", justifyContent: "auto"}}
                        className={classes.addButton}
                        onClick={this.goBack}
                      >
                        <ArrowBackIcon color="inherit" fontSize="small" marginRight="10"/>                    
                          <Typography>
                            Back
                          </Typography>
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      <Button 
                        variant="contained" 
                        className={`${classes.sendButtonRightAlign} ${classes.addButton}`} 
                        disabled={!this.state.isLoading ? false : true} 
                        color="primary" 
                        backgroundColor="primary" 
                        style={{ marginLeft: 30, flexDirection: "row", display: "flex", justifyContent: "auto"}} 
                        onClick={this.handleSubmit} >
                        <Typography >
                          Send
                        </Typography>
                      </Button>
                    </Grid>
                  {/* </div> */}
                </div>
                <CircularProgressCustom isLoading={loader} />

            </Paper>
          </Grid>
        </Grid>

        {/*<Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Case sent successfully.</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" variant="contained" style={{margin: 'auto'}}>
              OK
            </Button>
          </DialogActions>
        </Dialog>*/}
      </div>
    );
  }
}

ReferFriend.propTypes = {
  auth: PropTypes.object.isRequired,
  case: PropTypes.object.isRequired,
  errors: PropTypes.any.isRequired,
  sendCase: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  modifyDraft: PropTypes.func.isRequired,
  getUserPatients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.userdata,
  case: state.case,
  currentDraft: state.draft.currentDraft,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { sendCase, saveDraft, modifyDraft, setSnackbar, getUserPatients }
)(withStyles(styles)(ReferFriend))