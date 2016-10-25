var app = require('http').createServer()
app.listen(3000)

var users = []

var userCount = 0

function User(socket) {

}

function Chat() {
  this.io = require('socket.io')(app)
  console.log('Running on port 3000')
  this.addHandlers()
}

Chat.prototype.addHandlers = function() {
  var chat = this

  this.io.sockets.on('connection', function(socket) {
    console.log('a user connected')
    new User(socket)
    socket.on('disconnect', function(socket) {
      console.log('a user disconnected')
    })
  })
}

var chat = new Chat()
