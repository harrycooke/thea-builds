import React from 'react'

const styles = theme => ({
    cardAction: {
        // width: "auto",
        // height: "auto",
        width: "100%",
        maxWidth: "49vh",
        height: "25vh",
        justifyContent: "center",
        alignItems: "center",
        // borderStyle: solid,
        // margin: theme.spacing(.2),
        // backgroundColor: "red",
    },
})

class Thumbnail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

// hmtl
// <input id="fileItem" type="file"> 
// js
// var file = document.getElementById('fileItem').files[0];

  render() {
    const { classes } = this.props;
    return (
      <div style={{ backgroundColor: 'white'}} >
        <input style={{ backgroundColor: 'red'}} type="file" onChange={this.handleChange}/>
        {/* <img src={this.state.file}/> */}
        <br />
        <img style={{ width: "auto", height: "12vh", backgroundColor: 'grey' }} src={this.state.file}/>

      </div>
    );
  }
}
export default Thumbnail
