import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";

export function ConfirmationDialog(props) {

    function okOperationDialog() {
        props.okOperationDialog()
    }
    function handleClose() {
        props.handleClose()
    }
    return (
        <Dialog
            onClose={handleClose}
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={props.dialogState}
        >
            <DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
            <DialogContent dividers>
                {props.message}
            </DialogContent>
            <DialogActions>

                <Button onClick={handleClose} color="primary">
                    No
  </Button>
                <Button autoFocus onClick={okOperationDialog} color="primary">
                    Yes
  </Button>
            </DialogActions>
        </Dialog>
    );
}



export default ConfirmationDialog
