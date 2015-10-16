var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('add item', function(msg){
    socket.broadcast.emit('add item', msg);
  });

  socket.on('remove item', function(msg) {
    socket.broadcast.emit('remove item', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});
