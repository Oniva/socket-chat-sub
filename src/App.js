import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import openSocket from 'socket.io-client';
const  socket = openSocket(process.env.PORT || '3000');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msgValue: "",
      messages: []
    }
    
    socket.on('message', msg => this.setState({ messages: [...this.state.messages, '\n' + msg] }) );

    this.handleChange = this.handleChange.bind(this);
    this.addMsg = this.addMsg.bind(this);
  }

  handleChange(event) {
    this.setState({ msgValue: event.target.value });
  }

  addMsg(event){
    socket.emit('chat message', this.state.msgValue);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <body>
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
        </body>
      </div>
    );
  }
}

export default App;