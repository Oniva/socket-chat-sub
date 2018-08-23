'use strict';

const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 5000;
var path = require('path');

const app = express()
  .use('/build', express.static('/build'))
  .use((req, res) => res.sendFile(path.join(__dirname+'/build/index.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(app);

io.on('connection', (client) => {
    client.on('chat message', msg => {
      console.log(msg);
      io.emit('message', msg);
    });
  });