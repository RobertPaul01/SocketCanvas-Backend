var app = require('http').createServer()
app.listen(3000)

var userCount = 0
var fs=require('fs')
var clearRequests=0

var lineCount = 0

function Chat() {
  this.io = require('socket.io')(app)
  console.log('Running on port 3000')
  this.addHandlers()
}

Chat.prototype.addHandlers = function() {
  var chat = this
  
  this.io.sockets.on('connection', function(socket) {
    console.log('a user connected')
  	userCount++

  	socket.on('clearReady', function(){
  	  clearRequests++
  	  if(clearRequests>(userCount/2)) {
  	  	chat.io.sockets.emit('clear', '')
        fs.truncate('log.txt', 0, function(){console.log('Cleared the log file')})
        lineCount = 0
  	  }
  	})
  	
  	socket.on('clearUnready', function(){
  	  clearRequests--
  	})
  	
    socket.on('drawLineFrom', function(data) {
      var str = JSON.stringify(data)
      console.log(str)
      lineCount+=str.length;

      fs.appendFile('log.txt',str+"\n", function(err) {
        if(err) return console.log(err);
      });

      chat.io.sockets.emit('drawLineFrom', data)
    })

    socket.on('disconnect', function(socket) {
      userCount--;
      console.log('a user disconnected')
    })

    //send log contents to the user
    var LineByLineReader = require('line-by-line')
    var lr = new LineByLineReader('log.txt', {start: (lineCount > 50000 ? lineCount-50000 : 0), end: lineCount})

    lr.on('error', function(err){
      console.log(err)
    })

    lr.on('line',function(line){
      try {
        socket.emit('drawLineFrom', JSON.parse(line))
      } catch(err) {
        console.log('we finished the initial emits for new user')
      }
    })

    lr.on('end', function(){
      //do something
    })
  })
}

// truncate the file everytime we start the server
fs.truncate('log.txt', 0, function(){console.log('Cleared the log file')})
var chat = new Chat()
