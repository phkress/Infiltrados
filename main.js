const Express = require('express');
const Http = require('http');
const SocketIo = require('socket.io');
const {join} = require('path');
const app = Express()
const Server = Http.createServer(app);
const Io = SocketIo(Server)

app.use(Express.static(join(__dirname, '/')));
Server.listen(3000, '0.0.0.0');
Io.sockets.on('connection', function (socket) {
  console.log(socket.id);
});
