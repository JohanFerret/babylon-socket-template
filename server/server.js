const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('../client'));
app.get('/',function(req, res) {
    res.sendFile(__dirname + '../client/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat', function(msg){
    io.emit('chat', msg);
    console.log(msg);
  });
  socket.on('pos', function(pos){
    io.emit('pos', pos);
    console.log(pos);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});