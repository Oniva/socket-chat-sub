import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import socket from 'socket.io-client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


let io = socket();


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msgValue: "",
      messages: [],
      username: ""
    }
    
    io.on('message', msg => this.setState({ messages: [...this.state.messages, '\n' + msg] }) );
    
    this.handleChange = this.handleChange.bind(this);
    this.addMsg = this.addMsg.bind(this);
  }

  componentWillMount(){
    this.setState({username: prompt("What's your alias?")});
    
  }

  handleChange(event) {
    this.setState({ msgValue: event.target.value });
    event.preventDefault();
  }

  addMsg(event){
    if(this.state.msgValue !== "" && this.state.msgValue.length <= 150){
      io.emit('chat message', `${this.state.username}: ${this.state.msgValue}`);
      
      event.preventDefault();
      this.setState({ msgValue: "" });
    }
    else{
      event.preventDefault();
      alert('fuck you');
      this.setState({ msgValue: "" });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          <ul id="messages">
            {
              this.state.messages.map(function(msg, i){
              return <li key={i}>{msg}</li>
              })
            }
          </ul>
          <form action="" method="get">
            <TextField className="TextField" id="m" value={this.state.msgValue} onChange={this.handleChange}/>
            <Button className="Button" type="submit" onClick={this.addMsg} variant="contained">Send</Button>
          </form>
      </div>
    );
  }
}

export default App;