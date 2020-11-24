import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { sendCase, setSnackbar, getUserPatients } from "../../actions/caseAction";
import { saveDraft, modifyDraft } from "../../actions/draftActions";
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
import { washingtonList, pennsylvaniaList, californiaList } from "../../utils/constant";
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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const {remote, desktopCapturer, shell, nativeImage} = window.require('electron');

const {getAppIconListByPid} = require('node-mac-app-icon');
const {getWindows, activateWindow} = require('mac-windows');


//Delete??
const getOpenWindows = async () => {
  const {getWindowList} = remote.require('./windows');
  var path = require('path');
  console.log(path.resolve('./electron/windows.js'));
  const windows = await getWindowList();
  return windows
};

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemAvatar-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


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


export class NewCase extends React.Component {

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
      patientList: [],
      addToCase: false,
      open: false,
      anchorEl: null,
      windows: [],
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
    getOpenWindows();
    this.getWindowsList();
    if(this.props.case.patientList && this.props.case.patientList.length != 0){
      this.setState({patientList: this.props.case.patientList});
      console.log("got patients");
    } else{
      console.log("didn't get patients")

    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentDraft !== this.props.currentDraft) {
      const { currentDraft } = nextProps;
      if (currentDraft.draftData.files) {
        for (let i = 0; i < currentDraft.draftData.files.length; i++) {
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
        patient_id: currentDraft.draftData.patient_id && currentDraft.draftData.patient_id,
        patientName: currentDraft.draftData.patient_name && currentDraft.draftData.patient_name,
        dob: currentDraft.draftData.dob && currentDraft.draftData.dob,
        question: currentDraft.draftData.questions && decodeString(currentDraft.draftData.questions),
        files: currentDraft.draftData.files,
        fileUrls: [],
        labelWidth: 0,
        success: false,
        isSubmitting: false,
        client: socket(),
        isChecked: false
      })
    }

    if (nextProps.case.patientList) {
      this.setState({
        patientList: nextProps.case.patientList
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
    const fileResponse = await getSignedUrl('get', file.name) //import get signed url from utils/s3.js
    const url = fileResponse.data.url;
    this.setState({ fileUrls: [...this.state.fileUrls, url] });
  }
  

  handleSaveDraft = async event => {
    const { specialty, specialist_id, patientName, files, question, isChecked, isDraft, draftId, dob, patient_id } = this.state;
    const current_time = new Date();
    const current_timestamp = current_time.getTime();
    const provider_id = this.props.auth.id;
    const case_id = isDraft ? draftId : generateCaseID(patientName, current_timestamp);

    let dateofbirth = '';
    if(dob && dob !== ''){
      dateofbirth = moment(dob).format('YYYY-MM-DD');
    }

    const newDraft = {
      case_id: case_id,
      provider_id: provider_id,
      specialist_id: specialist_id,
      patient_id: patient_id,
      specialty: specialty,
      patient_name: patientName,
      dob: dateofbirth,
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

  getSpecialtyList = () => {

    if (this.props.auth){
      if (this.props.auth.practice_id === '51' || this.props.auth.practice_id === '18119' ||  this.props.auth.practice_id === '18') {
        return californiaList;
      } else if (this.props.auth.practice_id === '13') {
        return washingtonList;
      } else {
        return pennsylvaniaList;
      }
    }
  }




  handleSpecialtyChange = (e, opt) => {
    e.preventDefault();
    let specialist_id;

    let value = '';
    if(opt && opt.value !== ''){
      value = opt.value;
    }

    switch (value) {
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
      specialty: value,
      specialist_id: specialist_id
    })
  }



  specialtyOnBlur = (e) =>{
    this.setState({
      specialty: e.target.value
    });
  }

  handlePatientNameChange = (e, opt) => {
    if(opt && opt.id !== ''){
      this.setState({
        patient_id: opt.id,
        patientName: opt.fullName,
      });

      if(opt.dob !== ''){
        this.setState({
          dob: opt.dob
        });
      }
    } 
  } 

  onChangeHandle = async value => {
    console.log("logging" + this.props.auth);
    console.log(this.props.auth);

    const currentUserData = {
      currentUserId: this.props.auth.id,
      currentPracticeId: this.props.auth.practice_id,
      currentUserRole: this.props.auth.user_type,
      keyword: value
    }
    await this.props.getUserPatients(currentUserData);
  }

  setDOB(event, date){
    this.setState({
      dob: date
    })
  }

//----- Check patient -----//
  handleOnBlur = (e) =>{
    let patientData = {
      fullName: e.target.value
    }


    this.setState({
      patientName: e.target.value
    });
  }

  handleQuestionChange = e => {
    e.preventDefault();
    this.setState({
      question: e.target.value,
    })
  }

  handleFileUpload = async newFile => {
    this.setState({ isLoading: true })
    if (newFile && newFile.length) {
      for (let i = 0; i < newFile.length; i++) {
        const [promiseFile, promiseUrl] = await uploadFile(newFile[i]);
        console.log("promiseUrl   " + promiseUrl);
        this.setState({ files: [...this.state.files, promiseFile] });
        this.setState({ fileUrls: [...this.state.fileUrls, promiseUrl] });
      }
      this.setState({ isLoading: false })

    }
  }


  handleScreenshot = async (name, event) => {
    //event.preventDefault();
    desktopCapturer.getSources({ 
      types: ['window'],
      thumbnailSize: {
        height: 720,
        width: 1000
      },
      fetchWindowIcons: true
    }).then(async sources => {
      for (const source of sources) {

        if(source.name === name){
          console.log("uploading + " + name)
          this.handleFileUpload([source.thumbnail.toDataURL()]);
          this.setState()
        }
      }
    })
    this.setState({
      anchorEl: null
    })
  }






  handleSubmit = async event => {
    const { specialist_id, specialty, patientName, question, files, isChecked, isDraft, draftId, dob, patient_id, addToCase } = this.state;

    if (specialist_id !== '' && specialty !== '' && patientName !== '' && dob && dob !== '' && isChecked === true) {

      this.setState({ isSubmitting: true })
      const provider_id = this.props.auth.id;
      const practice_id = this.props.auth.practice_id;

      const current_time = new Date();
      const current_timestamp = current_time.getTime();
      const case_id = generateCaseID(patientName, current_timestamp);
      let dateofbirth = moment(dob).format('YYYY-MM-DD');

      const newCase = {
        case_id: case_id,
        provider_id: provider_id,
        practice_id: practice_id,
        patient_id: patient_id,
        specialist_id: specialist_id,
        specialty: specialty,
        patient_name: patientName,
        dob: dateofbirth,
        questions: encodeString(question),
        files: files && files.length ? files : null,
        is_read: true,
        created_at: current_timestamp,
        updated_at: current_timestamp,
        is_deleted: false,
        patient_consent_given: isChecked,
        email: this.props.auth ? this.props.auth.email : '',
        add_to_case: addToCase
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
          dob: "Patient DOB field is required."
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

  handleAddToCase = async event => {
    await this.validateFields();
    const { errors } = this.state;

    if(Object.keys(errors).length === 0){
      this.setState({ addToCase: true});
      this.handleSubmit();
    }
  }

  validateFields() {
    const { specialty, patientName, dob, isChecked } = this.state;
    let errors = {};

    if (specialty === '') {
      errors.specialty = "Specialty field is required.";
    } else if (patientName === '') {
      errors.patient_name = "Patient name field is required.";
    } else if (dob === null || dob === '') {
      errors.dob = "Patient DOB field is required.";
    } else if (isChecked === false) {
      errors.patient_consent_given = "Patient consent is required.";
    }
    this.setState({ errors })
  }

  goBack() {
    this.props.history.push("/inbox/cases");
  }


  handleMenuClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }


  handleMenuItemClick = (name, event) => {
        //this.getWindowsList();
    console.log(name)

    console.log(event.target)
    console.log(event.currentTarget)
    console.log(event.currentTarget.value)




    this.setState({
      anchorEl: null
    })

    console.log("anchorEl = " + this.state.anchorEl);
    //this.getWindowsList();

  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  getWindowsList = async () => {
    //console.log("windows");
    //activateWindow('Finder');
    //const winds = getWindows();
    
    //console.log(winds);
   /* const {getWindowList} = remote.require('./windows');
  //console.log(require.resolve.paths('./electron/windows'));
    
    const windows = await getWindowList();
    this.setState({windows: windows})
    console.log(this.state.windows[0].iconPNG)
    return windows*/
    
    
    const windows = [];
    //probably makes sense to cache these or something or find a way to not take them yet 
    desktopCapturer.getSources({ 
      types: ['window'],
      thumbnailSize: {
        height: 24,
        width: 24
      },
      fetchWindowIcons: true
    }).then(async sources => {
      for (const source of sources) {
        const win = {
          icon: source.appIcon.resize({width: 24, height: 24}).toDataURL(),
          name: source.name
        };
        //console.log(source.appIcon.toDataURL())
        windows.push(win);
      }
      console.log(windows);
    })
    this.setState({windows: windows})

    return windows
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
      open,
      anchorEl,

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

    const loading = open && patientList.length === 0;


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
                <div style={{
                  paddingRight: "3em",
                  paddingBottom: 0,
                  paddingTop: 20,
                  height: "30%",
                  minHeight: 130
                }}>
                  {/* ---------------- SPECIALTY ---------------- */}
                  <div style={{ display: "flex", margin: "0.5em" }}>
                    {/* TODO: Increase marginLeft for normal size */}

                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      {/*<TextField
                        select
                        variant="filled"
                        required
                        fullWidth
                        id="specialty"
                        label="Select Window to grab"
                        name="specialty"
                        autoComplete="specialty"
                        value={specialty}
                        onChange={this.handleSpecialtyChange}
                        className={classnames(classes.specialItem, {
                          invalid: errors.specialty,
                        })}
                      >
                        {this.getSpecialtyList().map(specialty => (
                          <MenuItem key={specialty.value} value={specialty.value}>{specialty.label}</MenuItem>
                        ))}
                      </TextField>*/}


                      <Autocomplete
                        //freeSolo
                        //disableClearable
                        onChange={this.handleSpecialtyChange}
                        options={this.getSpecialtyList()}
                        getOptionLabel={option => typeof option === 'string' ? option : option.label}
                        value={specialty}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            id="specialty"
                            label="Select Specialty"
                            name="specialty"
                            value={specialty}
                            //onBlur={this.specialtyOnBlur}
                            className={classnames(classes.specialItem, {
                              invalid: errors.specialty,
                            })}
                          />
                        )}
                      />
                    </Grid>
                  </div>
                  <Typography
                    color="error"
                    className={classes.errorText}
                  >
                    {errors.specialty} 
                  </Typography>

                  {/* ---------------- PATIENT NAME ---------------- */}
                  <div style={{ display: "flex", margin: "0.5em" }}>
                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      {/*<Autocomplete
                        value={{fullName: this.state.patientName}}
                        freeSolo
                        disableClearable
                        onChange={this.handlePatientNameChange}
                        options={this.props.case && this.props.case.patientList ? this.props.case.patientList : []}
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
                      />*/}
                      <Autocomplete
                        freeSolo
                        open={open}
                        onOpen={() => { this.setState({open: true}) }}
                        onClose={() => { this.setState({open: false}) }}
                        onChange={this.handlePatientNameChange}
                        //getOptionLabel={option => option.fullName}
                        getOptionLabel={option => typeof option === 'string' ? option : option.fullName}
                        options={patientList}
                        loading={loading}
                        renderOption={
                          (option) => <Typography noWrap>{option.fullName} {option.dob ? '('+ moment(option.dob).format('MM/DD/YYYY')+')' : ''}</Typography>
                        }
                        value={this.state.patientName}
                        renderInput={params => (
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
                            onChange={ev => {
                              // dont fire API if the user delete or not entered anything
                              if (ev.target.value !== "" || ev.target.value !== null) {
                                this.onChangeHandle(ev.target.value);
                              }
                            }}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              )
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </div>

                  {/* ---------------- PATIENT DOB ---------------- */}
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
                      {errors.dob}
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

                </div>

                {/* ---------------- DESCRIPTION TEXTBOX ---------------- */}
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
                
                <Card elevation={3} margin={0} padding={0} alignItems="center" >

//add commit here

                  <div style={{ minHeight: 100 }}>
                    <DropzonePlugin
                      removeFile={this.removeFile}
                      handleFileUpload={this.handleFileUpload}
                      files={this.state.files}
                    />
                  </div>
                   <Button variant="outlined" style={{ paddingBottom: 50, height: "0%", minHeight: 100 }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick}>
                        Grab Page From Open Application
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleMenuClose}
                      >

                        {this.state.windows.map(window => (

                          <MenuItem value={window.name} alignItems="center" onClick={(event) =>this.handleScreenshot(window.name, event)}> 
                              <img src={window.icon}/>
                              <ListItemText
                                primary={window.name}
                              />
                          </MenuItem>))}
                      </Menu>
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
                    <Grid item xs={6} md={6} sm={12} lg={6} xl={6}>
                      <div style={{ display: "flex" }}>
                          <Fab
                            color="inherit"           //primary, default, secondary
                            aria-label="add"
                            className={classes.backFAB}
                            onClick={this.goBack}
                          >
                            <ArrowBackIcon className={classes.arrowBackIcon} />
                          </Fab>
                          <Button 
                            disabled
                            float= "right"
                            fontWeight= "900"
                            // variant="contained" 
                            // className={classes.addButton} 
                            // onClick={this.handleSubmit} 
                          >
                            <Typography className={classes.backToInboxText}>
                              Back to Inbox
                            </Typography>
                          </Button>
                      </div>

                    </Grid>
                    <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
                      <Button 
                        variant="contained" 
                        className={`${classes.sendButtonRightAlign} ${classes.addButton}`} 
                        disabled={!this.state.isLoading ? false : true} 
                        color="primary" 
                        backgroundColor="primary" 
                        // style={{ flexDirection: "row", display: "flex", justifyContent: "auto"}}
                        onClick={this.handleSubmit} >
                        <Typography className={classes.addButton}>
                          Send
                        </Typography>
                      </Button>
                      <Button 
                        variant="contained" 
                        className={`${classes.sendButtonRightAlign} ${classes.addButton}`} 
                        disabled={!this.state.isLoading ? false : true} 
                        color="primary" 
                        backgroundColor="primary" 
                        // style={{ flexDirection: "row", display: "flex", justifyContent: "auto"}}
                        onClick={this.getWindowsList} >
                        <Typography className={classes.addButton}>
                          Take Screenshot
                        </Typography>
                      </Button>
                      {/* <Button
                        variant="contained"
                        className={`${classes.sendButtonRightAlign} ${classes.addButton}`}
                        disabled={!this.state.isLoading ? false : true}
                        color="primary"
                        backgroundColor="primary"
                        style={{ flexDirection: "row", display: "flex", justifyContent: "auto"}}
                        onClick={this.handleAddToCase} >
                        <Typography >
                          Add to case
                        </Typography>
                      </Button> */}
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
          onClose={this.handleMenuClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Case sent successfully.</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleMenuClose} color="primary" variant="contained" style={{margin: 'auto'}}>
              OK
            </Button>
          </DialogActions>
        </Dialog>*/}
      </div>
    );
  }
}

NewCase.propTypes = {
  auth: PropTypes.object.isRequired,
  case: PropTypes.object.isRequired,
  errors: PropTypes.any.isRequired,
  sendCase: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  modifyDraft: PropTypes.func.isRequired,
  getUserPatients: PropTypes.func.isRequired        //Euphoria getUserPatients
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
)(withStyles(styles)(NewCase))