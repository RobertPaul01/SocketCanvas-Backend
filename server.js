var app = require('http').createServer()
app.listen(3000)

var users = []
var userCount = 0
var fs=require('fs');
var clearRequests=0;

var count = 0

function Chat() {
  this.io = require('socket.io')(app)
  console.log('Running on port 3000')
  this.addHandlers()
}

Chat.prototype.addHandlers = function() {
  var chat = this
  
  this.io.sockets.on('connection', function(socket) {
    console.log('a user connected')
	userCount++;
	socket.on('clearReady', function(){
	  clearRequesets++;
	  if (clearRequests>(userCount/2)) {
	  	//TODO make a new log
	  }
	})
	
	socket.on('clearUnready', function(){
	  clearRequests--;
	})
	
	socket.on
    socket.on('drawLineFrom', function(data) {
      console.log(data)
      count++
      fs.appendFile('log.txt',JSON.stringify(data)+"\n", function(err){
	    if(err) return console.log(err);
	  });
      chat.io.sockets.emit('drawLineFrom', data)
    })

    socket.on('disconnect', function(socket) {
      console.log('a user disconnected')
    })
    //send log contents to the user
    var LineByLineReader=require('line-by-line'),lr=new LineByLineReader('log.txt', 
      {
        start: (count < 1000) ? 0 : count - 1000 
      }
    );
    lr.on('error', function(err){
      console.log(err)
    });
    lr.on('line',function(line){
      //need to finish this
      socket.emit('drawLineFrom', JSON.parse(line))
    });

    lr.on('end', function(){
      //do something
    });
  })
}

var chat = new Chat()
