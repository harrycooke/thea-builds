import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  //LinearProgress,
  Modal,
  Fab,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import _ from "../../@lodash";
import { uploadFile, removeFileFromS3 } from '../../utils/s3';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
    flexDirection: "column",
    margin: "1.5em"
  },
  avatar: {
    marginBottom: 20,
    height: 130,
    width: 130,
    flexShrink: 10,
    flexGrow: 0
  },
  progress: {
    marginTop: 20
  },
  uploadButton: {
    marginRight: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12  
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 15
    },
  },
  modalContainer: {
    minWidth: 450,
    width: "42%",
    height: "60%",
    outline: "none",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "27%"
  },
  modalCard: {
    width: "92%",
    height: "90%",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  modalCloseButton: {
    backgroundColor: "#ffffff"
  },
  modalCardTitle: {
    width: "60%",
    marginBottom: "10%",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#454545"
  },
  modalCardDetail: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#595959",
    marginTop: "10%"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); //comment for text editor 

const AccountProfile = props => {
  const { className, auth, modifyUserData, setLoader, isAvatarLoader, ...rest } = props;
  const classes = useStyles();

  const [displayavatarModal, setModalValue] = React.useState(false);
  const [oldFileList, setOldFileList] = React.useState([]);
  const [filePaths, setfilePaths] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [filesUploaded, setFilesUploaded] = React.useState([]);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const user = {
    name: auth.firstName+' '+auth.lastName,
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: auth.avatar ? auth.avatar.name : '../../assets/images/alice.png'
  }

  const acceptedAvatarImg = "image/*";

  const openavatarModal = () => {
    setModalValue(true);
  }

  const handleClose = () =>{
    setModalValue(false);
    setOldFileList([]);
    setFilesUploaded([]);
    setOpenConfirm(false);
  }


  const uploadavatarFile = async (avatarfile) => {
    setLoader(true);
    setModalValue(false);
    const promise = await Promise.all(avatarfile.map(async (file) => {
      return await uploadFile(file);
    }));
    promise.map(path => avatarfile.push(path));

    let userData = {
      userID: auth.id,
      avatar: avatarfile[1]
    }
    modifyUserData(userData);

    setOldFileList([]);
    setFilesUploaded([]);
  }

  const onDrop = (uploadedFiles) => {
    setIsLoading(true);
    const files = _.uniqBy(uploadedFiles.flat(), function (e) {
      return JSON.stringify(e);
    });
    setOldFileList(files);
    setIsLoading(false)

    let fileNames;
    if (files && files.length >= 1) {
       fileNames = files.map((file, i) => (
        <li key={i} className={classes.list}>
          <span className={classes.listDot}></span>{file.name}
        </li>
      ));
      setFilesUploaded(fileNames);
    }
  }

  const handleRemoveAvatar = () =>{
    if(auth.existedAvatar){
      setOpenConfirm(true);
    }
  }

  const removeAvatar = async () => {
    if(auth.existedAvatar){
      setOpenConfirm(false);
      let userData = {
        userID: auth.id,
        avatar: null
      }
      modifyUserData(userData);
      await removeFileFromS3(auth.existedAvatar, 0);
    }
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="User Information"
      />
        <Divider />

        {/* <CardContent> */}
          {/* <div className={classes.details}>
          { */}
            <div className={classes.details}>
                {isAvatarLoader ? 
                  <CircularProgress className={classes.avatar}
                    style={{ marginTop: 0, marginRight: 0 }}
                    size={10}
                    disableShrink
                  /> :
                  <Avatar
                    className={classes.avatar}
                    src={user.avatar}
                  />
                }
              <Typography >
                Name: {user.name}
              </Typography>
              <Typography>
                Email: {auth.email}
              </Typography>
            </div>
            {/* }
          </div> */}
        
          {/*<div className={classes.progress}>
            <Typography variant="body1">Profile Completeness: 70%</Typography>
            <LinearProgress
              value={70}
              variant="determinate"
            />
          </div> */}
        {/* </CardContent> */}

        <CardActions style={{ marginLeft: '0.5rem', marginBottom: '1rem' }}>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="contained"
            onClick={openavatarModal}
          >
            Upload Picture
          </Button>
          <Button className={classes.uploadButton} variant="contained"
            onClick={handleRemoveAvatar}
          >
            Remove Picture
          </Button>
        </CardActions>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={displayavatarModal}
          onClose={handleClose}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className={classes.modalContainer}>
            <Card className={classes.modalCard}>
              <Typography
                className={classes.modalCardTitle}
              >
                Upload your avatar
              </Typography>
              
              <Dropzone onDrop={onDrop} accept={acceptedAvatarImg}>
                {({ getRootProps, getInputProps }) => (
                  <section className={classes.container}>
                    <div {...getRootProps({ className: 'dropzone' })} style={{ height: "100%" }}>
                      <input {...getInputProps()} />
                      <div className={classes.dropzone} style={{textAlign: "center"}}>
                        <CloudDownloadIcon style={{ width: 80, height: 80 }} />
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>

              <aside style={{ maxHeight: 50, overflow: 'auto' }}>
                  {isLoading && (
                    <CircularProgress
                      style={{ marginTop: 10, marginLeft: 32, alignSelf: 'center' }}
                      size={20}
                      disableShrink
                    />
                  )}
                  {filesUploaded.length >= 1 && (
                    <div>
                      <ul style={{ marginLeft: 32, marginRight: 32, marginBottom: 10, marginTop: 10 }}>
                        {filesUploaded}
                      </ul>
                    </div>
                  )}
              </aside>
              {Boolean(oldFileList.length >= 1) && 
                <div style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: 70,
                  alignItems: "center",
                  padding: 20
                }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={event=> uploadavatarFile(oldFileList)}
                  >
                    Upload
                  </Button>
                </div>
              }
            </Card>
            <div style={{
              justifyContent: "center",
              display: "flex",
              paddingTop: 5
            }}>
              <Fab
                variant="round"
                className={classes.modalCloseButton}
                onClick={handleClose}>
                <CloseIcon />
              </Fab>
            </div>
          </div>
        </Modal>

        <Dialog
          open={openConfirm}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Please confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to remove this avatar image.
            </DialogContentText>
          </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                No
              </Button>
              <Button onClick={removeAvatar} color="primary">
                Yes
              </Button>
            </DialogActions>
        </Dialog>

    </Card>
         
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};



export default AccountProfile;
/*export default connect(
  mapStateToProps
)(AccountProfile);*/
