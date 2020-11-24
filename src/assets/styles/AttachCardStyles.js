import { red } from "@material-ui/core/colors";

const styles = theme => ({
    // root: {
    //     --main-bg-color: coral;  
    // },
    container: {
        padding: theme.spacing(0),
        // backgroundColor: "grey",
        alignItems: "center"
    },
    attachName: {
        fontSize: 20,
        color: "#0B0B0B",
        marginLeft: 10
    },
    cardWrapper: {
        width: "100%"
    },
    contentCard: {
        // [theme.breakpoints.down('sm')]: {
        //     width: "100%",
        //     height: "25vh",
        // },
        // [theme.breakpoints.up('sm')]: {
        //     width: "90%",
        //     height: "25vh",
        // }, 
        // width: "90%",
        // height: "25vh",
        // margin: 10,
        // cursor: "pointer",
        // alignItems: "center",

        // maxWidth: "53vh",
        // minWidth: "43vh",

        // height: "31vh",
        // minHeight:"30vh",

        backgroundColor: "white",
        // backgroundColor: "green",
    },
    // imageDisplay:{
    //     [theme.breakpoints.down('sm')]: {
    //         padding: '25px 0px 5px 15px',    
    //         },
    //         [theme.breakpoints.up('md')]: {
    //         padding: '40px 0px 20px 30px',    
    //         },           
    // },
    cardAction: {
        // width: "auto",
        // height: "auto",
        // width: "100%",
        // minWidth: "43vh",
        maxWidth: "90vw",

        height: "24vh",
        // minHeight:"25vh",

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        cursor: "pointer",

        // borderStyle: solid,
        // margin: theme.spacing(.2),
        // backgroundColor: "red",
    },
    modalContainer: {                               //Edit this to resize image viewer modal
        [theme.breakpoints.down('sm')]: {
            top: "5%",
            left: "2%",
            right: "2%",
            width: "96%",
            // maxHeight: "100%",
            // height: "23vh"
        },
        [theme.breakpoints.up('sm')]: {
            top: "12%",
            left: "4%",
            right: "4%",
            width: "92%",
            // maxHeight: "30%",
        }, 
        [theme.breakpoints.up('md')]: {
            top: "0%",
            left: "0%",
            // bottom: "90%",
            width: "100%",
            height: "100%",
            // maxHeight: "30%",
        },          
        position: "absolute",
        outline: 'none',
        alignItems: "center",
        // backgroundColor: "green",

    },
    // modalName: {
    //     color: "#ffffff",
    //     fontSize: 32,
    //     fontWeight: "600",
    //     marginLeft: 10
    // },
    modalCard: {
        width: "100%",
        maxWidth: "100%",
        height: "82%",
        marginTop: 5,
        justifyContent: "center",
        display: "flex",
        // overflow:'scroll',
    },
    closeButton: {
        backgroundColor: "#ffffff",
        //marginBottom: 500
    },
    viewButton: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    root: {
        maxWidth: 600,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
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
    floatLeft:{
        float:'left'
    },
    floatRight:{
        float:'right'
    },
    textAlign:{
        textAlign: 'center'
    }

})

export default styles;