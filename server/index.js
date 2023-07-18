const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected:${socket.id}`);
  //when there is room
  socket.on('join_room', (data) => {
    socket.join(data);
  });
  
  socket.on('send_message', (data) => {
    console.log(data);
    //when there is not room
    // socket.broadcast.emit('recieve_message', data);
    //when there is room
    socket.to(data.room).emit('recieve_message', data);
  });
});
server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
