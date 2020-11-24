import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import _ from "../../@lodash";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide  
} from "@material-ui/core";
import { fetchUserData } from "../../actions/authActions";
import { modifyCase } from "../../actions/caseAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: "none",
  },
  table: {
    // minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableCellBold: {
    color: "#1C1C1C",
    fontSize: 20,
    fontWeight: 500,
  },
  tableCellLight: {
    color: "#1c1c1c",
    fontSize: 18,
    fontWeight: "normal"
  }
}));

//This is not that imp in terms of testing

export function ConsultList(props) {
  const classes = useStyles();
  const [order] = React.useState('desc');
  const [orderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedConsult, setSelected] = React.useState(props.selectedConsult);
  const [selectedtemp, setSelectedtemp] = React.useState(null);
  const [emailTo, setEmailTo] = React.useState(null);

  let rows = [], rowsLength = 0;
  if (props.rows) {
    rows = props.rows;
    rowsLength = rows.length;
  }
  //Confirm Dialog 
  const [open, setOpen] = React.useState(false);
  const [unassignmodal, setUnassignmodal] = React.useState(false);

  const handleConfirmDialog = (e, id, emailOfSpecialist) => {
    setSelectedtemp(id);
    setEmailTo(emailOfSpecialist);
    setOpen(true);
  };

  const handleClose = () => {
    setEmailTo(null);
    setOpen(false);
  };

  const assignConsultant = (e, consultId, emailTo, caseData) => {
    if(consultId){
      const { case_id } = props.params;
      const current_time = new Date();
      const current_timestamp = current_time.getTime();
      const newCaseData = {
        caseId: case_id,
        last_updated_by_id: props.userdata.id,
        updated_at: current_timestamp,
        specialist_id: consultId,
        emailTo: emailTo
      };
      let readByOthers = caseData.is_read_by_other ? caseData.is_read_by_other : [];
      let ifIndex = _.indexOf(readByOthers, props.userdata.id);
      if(ifIndex < 0){
        readByOthers.push(props.userdata.id);
        newCaseData['is_read_by_other'] = readByOthers;
      }
      props.modifyCase(newCaseData);
      setSelected(consultId);
      setEmailTo(null);
      setOpen(false);
    }
  };

  const handleUnassignDialog = (e, id) => {
    setSelectedtemp(id);
    setUnassignmodal(true);
    setOpen(true);
  };

  const unassignConsultant = (e, consultId ) => {
    if(consultId === 0){
      const { case_id } = props.params;
      const current_time = new Date();
      const current_timestamp = current_time.getTime();
      const newCaseData = {
        caseId: case_id,
        last_updated_by_id: props.userdata.id,
        updated_at: current_timestamp,
        specialist_id: consultId
      };
      props.modifyCase(newCaseData);
      setSelected(null);
      setUnassignmodal(false);
      setOpen(false);
    }
  }  

  const handleUnassignClose = () => {
    setUnassignmodal(false);
    setOpen(false);
  };

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" align="center">Select Specialist</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Specialty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (

                    <TableRow
                      hover
                      selected={selectedConsult === row.id ? true: false}
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell align="center" padding="checkbox">
                        <div>
                        {selectedConsult === row.id ?
                          <Button variant="contained" color="primary" onClick={event => handleUnassignDialog(event, 0)}>Unassign</Button>
                          :
                          <Button variant="outlined" onClick={event => handleConfirmDialog(event, row.id, row.email)}>Assign</Button>
                        }
                        </div>
                      </TableCell>

                      <TableCell align="center" className={classes.tableCellBold}>
                        {row.firstName ? row.firstName : null}
                      </TableCell>

                      
                      <TableCell
                        align="center"
                        className={classes.tableCellBold}
                      >
                        {row.lastName ? row.lastName : null}
                      </TableCell>
                      
                      <TableCell align="center"  className={classes.tableCellBold}>
                      {row.specialty ? row.specialty : null}
                      </TableCell>
                    </TableRow>
                  );
                })}

              {rowsLength === 0 && (
                <TableRow style={{ height: 49 }}>
                  <TableCell colSpan={6}> No Consult.. </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={unassignmodal ? handleUnassignClose: handleClose }
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Please confirm"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to {unassignmodal ?  'unassign': 'assign'} this specialist {unassignmodal ?  'from': 'to'} {props.patientName}?
              </DialogContentText>
            </DialogContent>
            {unassignmodal ?
              <DialogActions>
                <Button onClick={handleUnassignClose} color="primary">
                  No
                </Button>
                <Button onClick={event => unassignConsultant(event, selectedtemp)} color="primary">
                  Yes
                </Button>
              </DialogActions>
            :
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button onClick={event => assignConsultant(event, selectedtemp, emailTo, props.currentCaseData)} color="primary">
                  Yes
                </Button>
              </DialogActions>
            }
          </Dialog>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

ConsultList.propsTypes = {
  fetchUserData: PropTypes.func.isRequired,
  userdata: PropTypes.object.isRequired,
  modifyCase: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata
})

export default connect(
  mapStateToProps,
  { fetchUserData, modifyCase }
)(ConsultList)
