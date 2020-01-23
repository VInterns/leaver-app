import React, { Component } from "react";
import './Chat.css';
import '../w3Schools.css';
import axios from 'axios'
import {StoreMessage} from '../api/Api'
import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:4000');
class App extends Component {

  componentDidMount(){
    document.title = "Chat Room"
  }

  constructor() {
    super();
    /* User Name */
    this.userName = 'name';
  }

 
  
  /* sending messages */
  send = () => {
    var myMsgInput = document.getElementById("msgInp").value;
    if(myMsgInput.length > 0){
      var name = this.userName;
      var message = {'msg':myMsgInput,'name':name, 'time': getMsgTime()};
      axios.post('http://localhost:4000/api/chat', message, function(err, msg){
          if (err){
              throw err
          }else{
              console.log('Message Stored', msg)
          }
      })
      socket.emit('message', message);
      /* add my new message to the chat box */
      addMyMsg(myMsgInput);
      document.getElementById("msgInp").value = '';
    }else{

    }
    
  }

   /* receive messages from WebSocket */ 
   work = () =>{
    socket.on('commingMsg', (data) => {
      /* add the received message to the chat box */
      addRecMsg(data);
    });
   }
  
   /* take user name and start the chat room */ 
  join = () => {
    var nameInput = document.getElementById("nameInp").value;
    if( nameInput != null && nameInput.length > 1 ){
        this.userName = nameInput;
        this.work();
        document.getElementById('nameForm').remove();
    }else{
    }
  }
 

  nameKeyPressed = (event) =>{
    if (event.key === "Enter") {
      this.join();
    }
  }
  chatKeyPressed = (event) =>{
    if (event.key === "Enter") {
      this.send();
    }
  }
  

  render() {
    return (
      <div className="App">
        <section className="App-cont">
          <div id="nameForm">
            <div>
              <center>
              <input className="w3-input w3-border w3-round-large" onKeyPress={this.nameKeyPressed} placeholder='Enter Your Name' type="text" id='nameInp'/>
              <br/>
              <button className='w3-button w3-blue btnSend' onClick={() => this.join()}> Join Chat Room </button>
              </center>
            </div>   
          </div>
          <div id='divCon' className='bigCont'>
            <div className='chatDiv' id='chatHeader'> 
              <center><h3>Chat Room</h3></center>
            </div>
          </div>
          <br/>
          <div id="formInputs">
          <input className="w3-input w3-border w3-round-large" onKeyPress={this.chatKeyPressed} placeholder='Type Your Message' type="text" id='msgInp'/>
          <br/>
          <button className='w3-button w3-blue btnSend' onClick={() => this.send()}> Send </button>
          </div>
        </section>
      </div>
    )
  }
}
export default App;



/* get the time of sending or receiving messages */
function getMsgTime() {
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var time = hours +':'+min;
  return time;
}
/* add my new message to the chat box */
function addMyMsg(data ='here is the msg') {
  var msgTime = getMsgTime();
  var elm = '<div class="chatBox"><div class="inContainer own"><div class="ownDiv own">me: '+ data +'</div></div><span class="own">'+msgTime+'</span></div>';
  document.getElementById("chatHeader").insertAdjacentHTML("beforeend",elm);
  var elementDiv = document.getElementById("chatHeader");
  elementDiv.scrollTop = elementDiv.scrollHeight;
}
/* add the received message to the chat box */
function addRecMsg(data ='here is the msg') {
  var msgTime = getMsgTime();
  var elm2 = '<div class="chatBox"><div class="inContainer"><div class="otherDiv other">'+ data.name +': '+data.msg+'</div></div><span class="other">'+msgTime+'</span></div>';
  document.getElementById("chatHeader").insertAdjacentHTML("beforeend",elm2);
  var elementDiv2 = document.getElementById("chatHeader");
  elementDiv2.scrollTop = elementDiv2.scrollHeight;
}

