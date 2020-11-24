import { red } from "@material-ui/core/colors"

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    display: "flex",
    overflow: "auto",
    margin: "auto"
  },
  arrowBackWrapper: {
    width: 0,
    heigth: "100%",
    paddingTop: 0
  },
  addButton: {
    width: "100%",
    height: "2.5em",
    fontWeight: "800",
    display:"block",
    whiteSpace:"nowrap",
    alignItems: "center",
    align: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 15,
    },
  },
  backFAB: {
    marginLeft: 25,  
    [theme.breakpoints.down('sm')]: {
      width: 35,
      height: 25,  
      marginRight: 1, 
    },
    [theme.breakpoints.up('sm')]: {
      width: 40,
      height: 40, 
      marginRight: 5,  
    },
    [theme.breakpoints.up('md')]: {
      width: 40,
      height: 40,  
      marginRight: 10, 
    },
  },
  arrowBackIcon: {
    color:"action",
    [theme.breakpoints.down('sm')]: {
      fontSize:"inherit",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize:"large",
    },
  },
  backToInboxText: {
    fontWeight:"800", 
    whiteSpace:"nowrap",
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 15,
    },
  },
  sendButtonRightAlign: {
    float: 'right',
    marginRight: 25,
    width: "40%",
  },
  mainNewCaseWrapper: {
    width: "100%",
    height: "100%",
    // overflow: "auto",
    borderRadius: 0,
    backgroundColor: "#fff",
    paddingTop: theme.spacing(2.5),
    paddingRight: theme.spacing(3.5),
    paddingLeft: theme.spacing(2.5),
    paddingBottom: theme.spacing(4)
  },
  headText: {
    fontSize: 30,
    fontWeight: 500,
    color: "#1D1D1D",
    marginLeft: "0.4em",
    marginTop: theme.spacing(10.5),
    padding: theme.spacing(1.5)
  },
  contentPaper: {
    marginTop: 25,
    minHeight: 620
  },
  dropdownRoot: {
    width: "38%",
    height: 52,
    marginLeft: 10
  },
  dropdownPlaceholder: {
    fontSize: 24,
    color: "#1D1D1D",
  },
  dropdownArrow: {
    top: 24
  },
  specialItem: {
    fontSize: 24,
    color: "#1D1D1D",
    marginLeft: "1.4rem",
    marginTop: "0.5rem",
    marginBottom:"0rem"
  },
  consultation: {
    fontSize: 22,
    fontWeight: "450",
    color: "#2C2C2C",
  },
  textField: {
    height: '100%',
    margin: 0,
    marginTop: 5,
    padding: 0
  },
  sendButton: {
    fontWeight: "100",
    fontSize: 22,
    color: "#FFFFFF",
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: theme.spacing(10)
  },
  dialogOverflow: {
    '& .MuiDialog-paper': {
      overflowY: 'visible'
    }
  },
  listDot: {
    height: 6,
    width: 6,
    borderRadius: '50%',
    backgroundColor: 'black',
    marginRight: 5
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex'
  },

})

export default styles