var app = require('http').createServer()
app.listen(3000)

var users = []
var userCount = 0
var fs=require('fs');
function Chat() {
  this.io = require('socket.io')(app)
  console.log('Running on port 3000')
  this.addHandlers()
}

Chat.prototype.addHandlers = function() {
  var chat = this

  this.io.sockets.on('connection', function(socket) {
    console.log('a user connected')

    socket.on('drawLineFrom', function(data) {
      console.log(data)
      fs.appendFile('log.txt',JSON.stringify(data)+"\n", function(err){
	    if(err) return console.log(err);
	  });
      chat.io.sockets.emit('drawLineFrom', data)
    })

    socket.on('disconnect', function(socket) {
      console.log('a user disconnected')
    })
  })
}

var chat = new Chat()
