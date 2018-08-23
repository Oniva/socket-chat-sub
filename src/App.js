import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import socket from 'socket.io-client';
let io = socket();


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msgValue: "",
      messages: []
    }
    
    io.on('message', msg => this.setState({ messages: [...this.state.messages, '\n' + msg] }) );

    this.handleChange = this.handleChange.bind(this);
    this.addMsg = this.addMsg.bind(this);
  }

  handleChange(event) {
    this.setState({ msgValue: event.target.value });
  }

  addMsg(event){
    io.emit('chat message', this.state.msgValue);
    event.preventDefault();
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
          <form action="">
            <input id="m" value={this.state.msgValue} onChange={this.handleChange}/>
            <button onClick={this.addMsg}>Send</button>
          </form>
      </div>
    );
  }
}

export default App;