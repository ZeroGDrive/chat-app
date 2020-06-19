const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const keys = require('../config/keys');

//creating the normal http server is essential to make socketio works
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  // socket.emit('countUpdated', count);
  // socket.on('increment', () => {
  //   count++;
  //   //this one for this only connection
  //   // socket.emit('countUpdated', count);
  //   //this one for all connections
  //   io.emit('countUpdated', count);
  // });
  // the whole socket io thing is about emit to send and on to accept
  // io.emit to send to all and socket.emit to send to one
  io.emit('message');

  socket.broadcast.emit('message', 'A new user has joined');
  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });

  socket.on('sendLocation', ({ lat, lon }) => {
    io.emit('message', `https://google.com/maps?q=${lon},${lat}`);
  });
});

server.listen(keys.port);
