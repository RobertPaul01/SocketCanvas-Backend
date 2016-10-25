var Socketiop2p = require('socket.io-p2p');
var io = require('socket.io-client');
var p2p = new P2P(socket);

var temp = 'test'

function init () {
  var socket = io()
  var opts = {peerOpts: {trickle: false}, autoUpgrade: false}
  var p2psocket = new Socketiop2p(socket, opts, function () {
    p2psocket.emit('peer-obj', 'Hello there. I am ' + p2psocket.peerId)
  })
}