import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      msg: [],
      open: false
    };
    this.submit = this.submit.bind(this);
  }

  componentWillMount(){


   }

   handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
};

   submit(){
     var self = this;
     var x1 = document.getElementById('user1').value;
     var x2 = document.getElementById('user2').value;
     var x3 = document.getElementById('user3').value;
     axios.get(`http://localhost:3000/name`,{params: {session: x1.toString()+","+x2.toString()+","+x3.toString()}})
     .then(function(response) {
       console.log("resp"+typeof(response));
       response = response.data;
       self.setState({
         msg: response
       })
     });
   }

  render() {
    var msg = this.state.msg.toString();
    //let imgUrl = 'images/Selena.jpg'
    //backgroundImage: 'url(' + imgUrl + ')',
    let style = {
            height: "400px",
            color: "blue"
      };
    let styleImage = {
              height: "150px",
              width: "250px"
      };
    return (
      <div style={style}>
      <div>
        <Button onClick={this.handleClickOpen} color="primary"><b>How to Use</b></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
      <img src="images/lightfm.png" style={styleImage}/>
      <br/><br/>
      {msg?"":
      <div>
      <div><b>User ID 1:</b>&nbsp;<input type="text" name="User ID 1: " id="user1"/>&emsp;
      <b>User ID 2:</b>&nbsp;<input type="text" name="User ID 2: " id="user2"/>&emsp;
      <b>User ID 3:</b>&nbsp;<input type="text" name="User ID 3: " id="user3"/></div>
      <br/><br/>


      <center><Button variant="contained" color="primary" type="button" onClick={this.submit}>
      CONTINUE
     </Button></center>

      <br/></div>}
      {msg?msg.split('\n,').map(function(item, index) {
        return (
          <span key={index}>
            {item}
            <br/>
          </span>
        )
      }):''}
      </div>
    );
  }
}
