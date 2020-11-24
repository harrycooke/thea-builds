import { fade } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,    
    },
    [theme.breakpoints.up('md')]: {
      padding: 20,    
    },
    margin: 0,
    width: "100%",
    justifyContent: "row",
    height: "100%",
    // backgroundColor: "#000"
  },
  mainInbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: `calc(100% - 250px)`
  },
  cardContainer: {
    height: `calc(100% - (70px))`,
    fallbacks: [
      { height: `-moz-calc(100% - (70px))` },
      { height: `-webkit-calc(100% - (70px))` },
      { height: `-o-calc(100% - (70px))` },
    ],
    [theme.breakpoints.up('lg')]: {
      height: "100%"
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    marginRight: 0,
    marginTop: theme.spacing(1.5),
    width: '50%'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    marginTop: theme.spacing(-1),
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: "100%",
    paddingBottom: "0.6em",
    fontSize: 10
  },
  inputRoot: {
    color: 'inherit',
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    width: 150
  },
})

export default styles