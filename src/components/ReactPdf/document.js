import React from 'react';
import moment from 'moment';
//import 'moment-timezone';
import {
  Typography,
  Button,
  Divider
} from '@material-ui/core';
import { decodeString } from '../../utils/functions';
import { withStyles } from '@material-ui/styles';
import html2pdf from "html2pdf.js";

// Create classes
const styles = theme => ({
  body: {
    paddingTop: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  buttonDiv: {
    paddingTop: 0,
    paddingBottom: 10,
    textAlign: 'right',
  },
  title: {
    paddingTop: 0,
    marginTop: 0,
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  author: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 0,
  },
  demo: {
    fontSize: 13,
    textAlign: 'left',
    marginTop: 12,
    marginBottom: 24,
  },
  legal: {
    textAlign: 'center',
    fontSize: 20,
    //width: "90%",
    alignSelf: "center",
    fontFamily: 'Times-Roman'
  },
  detail: {
    fontSize: 10,
    margin: 5,
    fontFamily: 'Times-Roman'
  },
  text: {
    margin: 5,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    margin: 10,
    height: 300,
    width: "48%",
    //float:"left"
  },
  hide: { display: 'none' },
  show: {
    display: ''
  },
  docContainer:{
    width:'98%',
    height:'auto',
    float:'left'
  },
  closedCasePdfCl:{
    paddingTop: 0,
    marginTop: 0,
    overflow:'auto',
    width:'95%'
  }
});


// Create Document Component
class MyDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCase: this.props.currentCase,
      readedMessages: this.props.readedMessages,
      userData: this.props.userData,
      downloadPdfButton: false
    }
    this.downloadPdf = this.downloadPdf.bind(this)
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  downloadPdf() {
    this.setState({ downloadPdfButton: true }, () => {
      var element = document.getElementById('closedCasePdf');
      html2pdf(element, {
        margin: 1,
        filename: this.props.currentCase && this.props.currentCase.caseData ? this.props.userData.firstName + "_" + this.props.userData.lastName + "_" + this.props.currentCase.caseData.specialty : 'TempFile',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
          dpi: 300, letterRendering: true, useCORS: true, onrendered: function (canvas) {
          }
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { before: ['.pg-break-before'], after: ['.pg-break-after'] },
        // examples
        // Avoid page-breaks on all elements, and add one before #page2el.
        //pagebreak: { mode: 'avoid-all', before: '#page2el' }
        // Enable all 'modes', with no explicit elements.
        //pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        // No modes, only explicit elements.
        //pagebreak: { before: '.beforeClass', after: ['#after1', '#after2'], avoid: 'img' },
      });
      setTimeout(() => {
        this.setState({ downloadPdfButton: false })
      }, 500)

      // download extra file with pdf
      const { currentCase } = this.state;
      if(currentCase.caseData.files && currentCase.caseData.files.length > 0){
        let files = currentCase.caseData.files;
        files.forEach(function(file){
          let url = file.name;
          let ftype = file.type.substring(0, file.type.indexOf("/"));
          if(ftype && ftype !== 'image'){
            fetch(url, {
              method: "GET",
              headers: {}
            })
            .then(response => {
              response.arrayBuffer().then(function(buffer) {
                let ext = response.url.split('.').pop().split(/\#|\?/)[0];
                let fileName = 'file_' + new Date().getTime() + '.' + ext;
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
              });
            })
          }
        });
      }
    })
  }



  //test comment here 

  _renderChatting(chats) {
    const {
      currentCase,
      userData
    } = this.state;
    const { classes } = this.props;
    let firstName = currentCase && currentCase.senderData && currentCase.senderData.firstName;
    let lastName = currentCase && currentCase.senderData && currentCase.senderData.lastName;
    return chats.map((message, key) => {
      return (
        <div key={key + 1} className={{ marginTop: 12 }}>
          <Typography className={classes.detail}>
            {message.sender_id === userData.id
              ? `${userData.firstName} ${userData.lastName}`
              : `${firstName} ${lastName}`
            }
            {`at `}
            {moment.utc(message.created).format('YYYY-MM-DD HH:mm')}
          </Typography>
          <Typography className={classes.text}>
            {decodeString(message.content)}
          </Typography>
        </div>
      )
    })
  }
  toDataUrl = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  };
  _renderImages(images) {
    const { classes } = this.props;
    return images.map((image, key) => {
      this.toDataUrl(image.name, (myBase64) => {
      });
      return (
        <img
          alt=""
          key={key}
          className={classes.image}
          src={image.name}
        />
      )
    });
  }



  _renderblank() {
    return (
      <div></div>
    )
  }
  UNSAFE_componentWillReceiveProps(nextProps) {

    if (nextProps.currentCase !== this.props.currentCase) {
      this.setState({
        currentCase: nextProps.currentCase
      })
    }
  }//

  render() {
    const { classes } = this.props;
    const {
      currentCase,
      readedMessages,
      userData,
      downloadPdfButton
    } = this.state;
    let patient_name = currentCase && currentCase.caseData && currentCase.caseData.patient_name;
    let firstName = currentCase && currentCase.senderData && currentCase.senderData.firstName;
    let lastName = currentCase && currentCase.senderData && currentCase.senderData.lastName;
    let specialty = currentCase && currentCase.caseData && currentCase.caseData.specialty;
    return (
      <div id="closedCasePdf" className={classes.closedCasePdfCl}>

        <div className={classes.body}>
          <Typography className={classes.title}>
            Patient Demographics
          </Typography>
          <Typography className={classes.demoTitle}>
            Patient Information
          </Typography>
          <Divider />
          <Typography className={classes.demo}>
            {currentCase && currentCase.patientData && currentCase.patientData.fullName && (<p>Patientss Name: {(currentCase.patientData.fullName)}</p>) && (<p>Patient Name: {(currentCase.patientData.fullName)}</p>)}

            {currentCase && currentCase.patientData && currentCase.patientData.dob && (<p>Date of Birth: {moment(currentCase.patientData.dob).format('MM/DD/YYYY')}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.gender && (<p>Gender: {(currentCase.patientData.gender)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.ssn && (<p>SSN: {(currentCase.patientData.ssn)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.marital_status && (<p>Marital Status: {(currentCase.patientData.marital_status)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.address && currentCase.patientData.city && currentCase.patientData.state && (<p>Address:</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.address && (<p>{(currentCase.patientData.address)}</p>)}

            {currentCase && currentCase.patientData && currentCase.patientData.city && currentCase.patientData.state && (<p>{(currentCase.patientData.city)}, {(currentCase.patientData.state)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.zip && (<p>{(currentCase.patientData.zip)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.mobile_no && (<p>Mobile Phone: {(currentCase.patientData.mobile_no)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.homephone && (<p>Home Phone: {(currentCase.patientData.homephone)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.email && (<p>Email: {(currentCase.patientData.email)}</p>)}
          </Typography>
          <Typography className={classes.demoTitle}>
            {currentCase && currentCase.patientData && currentCase.patientData.guarantor_frstnm && (<p> Guarantor Information </p>)}
          </Typography>
          {currentCase && currentCase.patientData && currentCase.patientData.guarantor_frstnm && (<Divider />)}
          <Typography className={classes.demo}>
            {currentCase && currentCase.patientData && currentCase.patientData.guarantor_frstnm && currentCase.patientData.guarantor_lastnm && (<p>Guarantor Name: {(currentCase.patientData.guarantor_frstnm)} {(currentCase.patientData.guarantor_lastnm)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.guarantor_addr && currentCase.patientData.guarantor_city &&(<p>Address:</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.guarantor_addr && currentCase.patientData.guarantor_city &&(<p>{(currentCase.patientData.guarantor_addr)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.guarantor_city && currentCase.patientData.guarantor_state && (<p>{(currentCase.patientData.guarantor_city)}, {(currentCase.patientData.guarantor_state)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.guarantor_zip && (<p>{(currentCase.patientData.guarantor_zip)}</p>)}
          </Typography>
          <Typography className={classes.demoTitle}>
            Primary Insurance Information
          </Typography>
          <Divider />
          <Typography className={classes.demo}>
            {currentCase && currentCase.patientData && currentCase.patientData.primary_ins_name && (<p>Primary Insurance: {(currentCase.patientData.primary_ins_name)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.primary_ins_id && (<p>Primary Subscriber Id: {(currentCase.patientData.primary_ins_id)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.primary_grp_no && (<p>Primary Group Number: {(currentCase.patientData.primary_grp_no)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.primary_ins_addr && currentCase.patientData.primary_ins_id && (<p>Primary Address:</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.primary_ins_addr && currentCase.patientData.primary_ins_id && (<p>{(currentCase.patientData.primary_ins_addr)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.primary_ins_city && currentCase.patientData.primary_ins_state && (<p>{(currentCase.patientData.primary_ins_city)}, {(currentCase.patientData.primary_ins_state)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.primary_ins_zip && (<p>{(currentCase.patientData.primary_ins_zip)}</p>)}
          </Typography>
          <Typography className={classes.demoTitle}>
            {currentCase && currentCase.patientData && currentCase.patientData.secondary_ins_name && currentCase.patientData.secondary_ins_id && (<p>Secondary Insurance Information</p>)}
          </Typography>
          {currentCase && currentCase.patientData && currentCase.patientData.secondary_ins_name && currentCase.patientData.secondary_ins_id && (<Divider />)}
          <Typography className={classes.demo}>
            {currentCase && currentCase.patientData && currentCase.patientData.secondary_ins_name && currentCase.patientData.secondary_ins_id && (<p>Secondary Insurance: {(currentCase.patientData.secondary_ins_name)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.secondary_ins_id && currentCase.patientData.secondary_ins_id && (<p>Secondary Subscriber Id: {(currentCase.patientData.secondary_ins_id)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.secondary_grp_no && (<p>Secondary Group Number: {(currentCase.patientData.secondary_grp_no)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.secondary_ins_addr && currentCase.patientData.secondary_ins_id && (<p>Secondary Address:</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.secondary_ins_addr && currentCase.patientData.secondary_ins_id && (<p>{(currentCase.patientData.secondary_ins_addr)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.secondary_ins_city && currentCase.patientData.secondary_ins_state && (<p>{(currentCase.patientData.secondary_ins_city)}, {(currentCase.patientData.secondary_ins_state)}</p>)}
            {currentCase && currentCase.patientData && currentCase.patientData.secondary_ins_zip && (<p>{(currentCase.patientData.secondary_ins_zip)}</p>)}
          </Typography>






          <Typography variant="h1" className={`${classes.title} pg-break-before`}>
            {specialty} Consult Report for {patient_name}
          </Typography>
          <Typography className={classes.author}>
            Requesting Provider: {userData.firstName} {userData.lastName} {`\n\n`} <br />
            Responding Provider: {firstName} {lastName} {`\n\n`}
          </Typography>

          <Typography className={classes.demo}>
            {userData && userData.npi	&& (<p>NPI: {(userData.npi)}</p>)}
            {userData && userData.licenseNumber	&& (<p>License Number: {(userData.licenseNumber)}</p>)}
          </Typography>


          <Typography className={classes.legal}>
            Patient has verbally consented to this consultation including any financial responsibilities that may arise from the consultation.
          </Typography>
          {readedMessages && readedMessages.length >= 1
            ? this._renderChatting(readedMessages)
            : this._renderblank()
          }
          <div className={classes.docContainer}>
          {currentCase && currentCase.caseData && currentCase.caseData.files && currentCase.caseData.files.length >= 1 && (patient_name !== "Christopher Puzio")
            ? this._renderImages(currentCase.caseData.files)
            : this._renderblank()
          }
          <Divider />
          </div>
          <Button id="downloadButton" className={downloadPdfButton ? classes.hide : classes.show} variant="contained" color="primary" style={{ marginRight: 32, marginTop: 20, float:'right' }} onClick={this.downloadPdf}>
            <Typography className={classes.sendButton}>
              Download Pdf
            </Typography>
          </Button>
        </div>
      </div>
    )
  }
};
export default withStyles(styles)(MyDocument)
