const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res, next) =>
  res.sendFile(__dirname +'./index.html'));

io.on('connection', (client) => {
  client.on('chat message', msg => {
    console.log(msg);
    io.emit('message', msg);
  });
});

server.listen(port);
