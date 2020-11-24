const styles = theme => ({
    rightCard: {
      overflow: "auto",
      borderRadius: 0,
      // backgroundColor: "#004866",
      height: "92vh",
      padding: theme.spacing(5)
    },
    rightCardCollapsed: {
      width: theme.spacing(11),
      float: "right",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      display: "flex",
      backgroundColor: "#f2f2f2"
    },
    caseInfoText: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
      [theme.breakpoints.up('sm') ]: {
        fontSize: 20,
      },
      color: "#858585",
      marginTop: 10,
    },
    caseInfoDetailsText: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
      [theme.breakpoints.up('sm') ]: {
        fontSize: 16,
      },
      color: "#000000",
      marginTop: 10,
    },
    additionInfoText: {
      fontSize: 20,
      color: "#848484",
      opacity: 0.4,
      marginLeft: 50
    },
    nameText: {
      fontWeight: "600",
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
      [theme.breakpoints.up('sm') ]: {
        fontSize: 24,
      },
      fontSize: 24,
      color: "#454545",
      align: "center"
    },
    modalContainer: {
      minWidth: 350,
      minHeight: 350,
      width: "42%",
      height: "50%",
      outline: "none",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "27%",
      // backgroundColor: "#000",
    },
    modalCard: {
      width: "100%",
      height: "100%",
      outline: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      //alignItems: "center",
      padding: 5,
      // backgroundColor: "#000",
    },
    img: {
        height: '100%',
        overflow: 'hidden',
        display: 'block',
        width: 'auto',
        justifyContent: "center",
        alignItems: "center",
    },
    pdfView:{
        [theme.breakpoints.down('sm')]: {
            width: "69%",
        },
        [theme.breakpoints.up('sm')]: {
            width: "100%",
        }, 
        [theme.breakpoints.up('md')]: {
            width: "100%",
        },          
        overflow:'scroll',
        height:"100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
      width: '100%',
      height: 38,
      backgroundColor: "#fff",
      marginLeft: "10%",
      paddingLeft: 15,
      paddingRight: 15,
      textTransform: "unset",
      fontSize: 18
    },
    uploadButton: {
      width: '100%',
      height: 38,
      textTransform: "unset",
      [theme.breakpoints.down('sm')]: {
        height: 35,
        fontSize: 15,
      },
      [theme.breakpoints.up('sm') ]: {
        height: 40,
        fontSize: 16,
      },
    },
  })