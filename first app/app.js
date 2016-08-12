var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket) {
  
  socket.on('join', function(data) {
    socket.username = data.username;
    io.sockets.emit('userJoined', {username: socket.username});
    
  });

  socket.on('ping', function(data, done) {
      socket.get('username', function(err, username) {
        io.sockets.emit('pong', {username: username});
        done('ack');
      });
      
    });
  
});