import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import _ from "../../@lodash";
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Hidden,
  Tooltip,
  Zoom
} from "@material-ui/core";
import { decodeString, convertTimeStampToDateAndTime } from "../../utils/functions";
import { fetchUserData } from "../../actions/authActions";
import CircularComponent from "../SharedComponents/CircularComponent";
import Delete from "@material-ui/icons/Delete";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

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

                      console.log("Order is:", order) 

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
    paddingBottom: theme.spacing(3),
    boxShadow: "none",
  },
  table: {
    // minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableCellBold: {
    color: "#000",
    // fontSize: 20,
    fontSize: 16,
    fontWeight: 500,
  },
  tableCellLight: {
    color: "#000",
    fontSize: 16,
    fontWeight: "normal"
  }
}));

//Sort of the same as ConsultList and should be having same tests implemented

export function MessageList(props) {
  const classes = useStyles();
  const [order] = React.useState('desc');
  const [orderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  let rows = [], rowsLength = 0;
  if (props.rows) {
    rows = props.rows;
    rowsLength = rows.length;
  }
  
  function handleClick(event, id, isDraft, caseData) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    props.isTrClicked(id, isDraft, caseData);
  }

  function removeDraft(event, draftData) {
    props.openDraftDialog(draftData)
  }

  // Assign case to Specialty
  function assignSpecialty(event, caseData){
    props.assignConsult(caseData.case_id, caseData.specialty);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function checkReaded(userId, caseData) {
    const casePCP = (props.userdata.user_type === "PCP") && caseData.is_read;
    if (casePCP) {
      return true;
    } else if (props.userdata.user_type === "Specialty" || props.userdata.user_type === "Admin") {
      if(caseData.is_read_by_other && (_.indexOf(caseData.is_read_by_other, userId) >= 0)){
        return true;
      }
    } else {
      return false;
    }
  }

  const isSelected = name => selected.indexOf(name) !== -1;
  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.draftData ? row.draftData.id : row.caseData.id);
                  const isReaded = row.draftData ? false : checkReaded(props.userdata.id, row.caseData)
                  return (

                    <TableRow
                      
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" onClick={event => handleClick(event, row.draftData ? row.draftData.case_id : row.caseData.case_id, row.draftData ? true : false, row.caseData && row.caseData)}>
                        <div
                           >
                          <CircularComponent
                            size={12}
                            backgroundColor={row.draftData ? "#ff6600" : isReaded ? null: "#57C8E1"}
                            fontSize={18}
                            lineHeight={2.2}
                            text={''} />
                        </div>
                      </TableCell>

                      <TableCell onClick={event => handleClick(event, row.draftData ? row.draftData.case_id : row.caseData.case_id, row.draftData ? true : false, row.caseData && row.caseData)} align="left" className={classes.tableCellBold} style={{ color: row.draftData ? '#ff6600' : '#1C1C1C' }}>
                        {row.draftData
                          ? 'Draft '
                          : `${props.userdata.user_type === "PCP" ? row.caseData.specialty + " " : row.senderData.firstName + " " + row.senderData.lastName}`
                        }
                      </TableCell>
                      
                      <TableCell
                        onClick={event => handleClick(event, row.draftData ? row.draftData.case_id : row.caseData.case_id, row.draftData ? true : false, row.caseData && row.caseData)}
                        align="left"
                        
                        className={classes.tableCellBold}
                      >
                        {/* {row.draftData ? row.draftData.patient_name : row.caseData.patient_name} {row.draftData ? row.draftData.specialty : row.caseData.specialty} Consultation */}
                        {row.draftData ? row.draftData.patient_name : row.caseData.patient_name} 
                      </TableCell>
                      <Hidden xsDown>
                        <Hidden smDown>
                          <TableCell
                            onClick={event => handleClick(event, row.draftData ? row.draftData.case_id : row.caseData.case_id, row.draftData ? true : false, row.caseData && row.caseData)}
                            align="left"
                            
                            className={classes.tableCellLight}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: 100
                            }}>
                            {/* Question: {decodeString(row.draftData ? row.draftData.questions : row.caseData.questions)}  */}
                            {decodeString(row.draftData ? row.draftData.questions : row.caseData.questions)} 
                          </TableCell>
                        </Hidden>
                        <TableCell
                          onClick={event => handleClick(event, row.draftData ? row.draftData.case_id : row.caseData.case_id, row.draftData ? true : false, row.caseData && row.caseData)}
                          align="right"
                          className={classes.tableCellLight}>
                          {/* TimeStamp: {convertTimeStampToDateAndTime(row.draftData ? row.draftData.updated_at : row.caseData.updated_at)} */}
                          {convertTimeStampToDateAndTime(row.draftData ? row.draftData.updated_at : row.caseData.updated_at)}
                        </TableCell>
                      </Hidden>
                      <TableCell align="right"  className={classes.tableCellBold} >
                        {row.draftData &&
                          <Delete onClick={event => removeDraft(event, row.draftData)}
                          />}
                        {
                          props.userdata.user_type === "Admin" && !props.isClosedCaseRoute && (!row.caseData.specialist_id || row.caseData.specialist_id ==="0") ? 
                            <Tooltip TransitionComponent={Zoom} title="Assign Specialist">
                              <AssignmentIndOutlinedIcon color="action" onClick={event => assignSpecialty(event, row.caseData)} style={{ cursor: 'pointer' }} />
                            </Tooltip>
                          :
                          props.userdata.user_type === "Admin" && !props.isClosedCaseRoute && (row.caseData.specialist_id || row.caseData.specialist_id !== "0") ? 
                            <Tooltip TransitionComponent={Zoom} title="Deselect Specialist">
                              <AssignmentIndIcon color="primary" onClick={event => assignSpecialty(event, row.caseData)} style={{ cursor: 'pointer' }} />
                            </Tooltip>
                          :
                            null
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}

              {rowsLength === 0 && (
                <TableRow style={{ height: 49 }}>
                  <TableCell colSpan={6}> You don't have any cases right now. </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[]}
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

MessageList.propsTypes = {
  fetchUserData: PropTypes.func.isRequired,
  userdata: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata
})

export default connect(
  mapStateToProps,
  { fetchUserData }
)(MessageList)
