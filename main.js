const Express = require('express');
const Http = require('http');
const SocketIo = require('socket.io');
const {join} = require('path');
const app = Express()
const Server = Http.createServer(app);
const Io = SocketIo(Server)

app.use(Express.static(join(__dirname+'/public', '/')));
Server.listen(3000, '0.0.0.0');
