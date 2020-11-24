import React from 'react';
import {
    Dialog,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    dialogOverflow: {
        '& .MuiDialog-paper': {
            overflowY: 'visible'
        },
        
        '& .MuiPaper-root':{
            backgroundColor: 'transparent',
        },
        '& .MuiPaper-elevation24':{
            boxShadow:'none',
        }
    }
}));
function CircularProgressComponent(props) {
    const classes = useStyles();
    return (
        <Dialog
            disableEscapeKeyDown
            disableBackdropClick
            open={props.isLoading}
            keepMounted
            className={classes.dialogOverflow}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        ><CircularProgress className={classes.progress} /></Dialog>
    );
}

export default CircularProgressComponent
