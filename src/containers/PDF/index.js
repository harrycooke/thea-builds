import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CircularProgress
} from "@material-ui/core";
import { readMessages } from '../../actions/chatActions';
import { setCurrentCase } from '../../actions/caseAction';
import MyDocument from '../../components/ReactPdf/document';

class PDF extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      channel_id: '',
      currentCase: '',
      readedMessages: [],
      isLoading: true,
      readedMessagesWasSetted: false,
      currentCaseWasSetted: false
    }
    this.callDownloadPDF = this.callDownloadPDF.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { channel_id } = this.props;
    this.setState({ channel_id, isLoading: true });
  }

  componentDidMount() {
    if(this.props && typeof this.props.onRef === 'function'){
      this.props.onRef(this);
    }
    this.setState({
      userdata: this.props.userdata
    });
    const { channel_id } = this.props;
    const currentCaseCondition = {
      case_id: channel_id,
      currentUserRole: this.props.userdata.user_type
    }
    const channelData = {
      channel_id: channel_id,
      type: "message"
    };
    this.props.setCurrentCase(currentCaseCondition);
    this.props.readMessages(channelData);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: true })
    if (nextProps.readedMessages !== this.props.readedMessages) {
      this.setState({
        readedMessages: nextProps.readedMessages,
        isLoading: false,
        readedMessagesWasSetted: true
      })
    }
    if (nextProps.currentCase !== this.props.currentCase) {
      this.setState({
        currentCase: nextProps.currentCase,
        isLoading: false,
        currentCaseWasSetted: true
      })
    }
  }

  callDownloadPDF = () => {
    this.child.downloadPdf();
  }

  render() {
    const {
      currentCase,
      readedMessages,
      userdata,
      isLoading,
      readedMessagesWasSetted,
      currentCaseWasSetted
    } = this.state;
    if (!isLoading && readedMessagesWasSetted && currentCaseWasSetted) {
      return (
        // <PDFViewer style={{ width: "100%", height: "100%" }}>
        <MyDocument
          userData={userdata}
          currentCase={currentCase}
          readedMessages={readedMessages}
          onRef={ref => (this.child = ref)}
        />
        // </PDFViewer>
      );
    } else {
      return (
        <div>
          <CircularProgress
            disableShrink
            style={{
              zIndex: 100,
              position: "relative",
              top: "-50vh",
              left: "50%"
            }}
          />
        </div>
      )
    }
  }
}

PDF.propTypes = {
  userdata: PropTypes.object.isRequired,
  readedMessages: PropTypes.array.isRequired,
  readMessages: PropTypes.func.isRequired,
  setCurrentCase: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata,
  currentCase: state.case.currentCase,
  readedMessages: state.chat.readMessages,
})

export default connect(
  mapStateToProps,
  { readMessages, setCurrentCase }
)(PDF)