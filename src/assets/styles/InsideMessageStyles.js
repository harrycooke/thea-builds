const styles = theme => ({
  container: {
    width: "100%",
    height: "100%",
    // padding: 20,
    // overflow: "auto"
  },
  mainBody: {
    [theme.breakpoints.down('sm')]: {
        paddingTop: 5,
        // padding: 10
      },
      [theme.breakpoints.up('sm') ]: {
        padding: 20
      },
      // paddingTop: 20, 
      // paddingtBottom: 20, 
      height: "100%",
      marginBottom: 20

  },
  addButton: {
    backgroundColor: "#fff",
    [theme.breakpoints.down('sm')]: {
      width: 35,
      height: 35,
      // fontSize: 14,
    },
    [theme.breakpoints.up('sm')]: {
      width: 38,
      height: 38,
      // fontSize: 18,
    },
  },
  backFAB: {
    margin: 5, 
    marginLeft: 10,
    // variant: "h4",
    
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    },

  },
  closeButton: {
    width: '100%',
    backgroundColor: "#secondary",
    marginLeft: "0%",
    // paddingLeft: 15,
    // paddingRight: 15,
    // textAlign: "center",
    textTransform: "unset",
    [theme.breakpoints.down('sm')]: {
      height: 35,
      fontSize: 15,
    },
    [theme.breakpoints.up('sm') ]: {
      height: 38,
      fontSize: 16,
    },
    [theme.breakpoints.up('md')]: {
      height: 38,
      fontSize: 17.5,
    },

  },
  reopenButton: {
    height: 38,
    backgroundColor: "#fff",
    marginLeft: "10%",
    paddingLeft: 15,
    paddingRight: 15,
    textTransform: "unset",
    fontSize: 18
  },
  leftCard: {
    // height: "100%",
  },
  rightBottomCard: {
    height: "6vh"
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
    height: "auto",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  modalDocumentContainer: {
    minWidth: 450,
    outline: "none",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: 50,
    marginBottom: 50
  },
  modalCloseButton: {
    backgroundColor: "#ffffff"
  },
  closeCaseButtonInModal: {
    width: "60%",
    height: 62,
    backgroundColor: "#89F5A1",
    paddingLeft: 25,
    paddingRight: 25,
    textTransform: "unset",
    fontSize: 22,
    fontWeight: "bold"
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
})

export default styles