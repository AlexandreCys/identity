const config = require('../../config/config');
const io = require('socket.io-client');
const socket = io.connect(`${config.base.url}:${config.base.port}`, {
  reconnect: true,
  query: "type=authenticate",
});

socket.on('connect', () => { 
  console.log('Authenticate service connected')
});