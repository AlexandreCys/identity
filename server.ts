import * as io from 'socket.io-client';

const socket = io.connect(`${Config.base.url}:${Config.base.port}`, {
  reconnect: true,
  query: "type=authenticate",
});

socket.on('connect', () => { 
  console.log('Authenticate service connected')

  socket.emit('action', new getterMessageTransferObject('services', ['authenticate', 1]));
});