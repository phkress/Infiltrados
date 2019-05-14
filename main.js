const Express = require('express');
const Http = require('http');
const SocketIo = require('socket.io');
const {join} = require('path');
const app = Express()
const Server = Http.createServer(app);
const Io = SocketIo(Server)

app.use(Express.static(join(__dirname, '/')));
Server.listen(3000, '0.0.0.0');

var usernames = {};
var salas = ['Lob', 'Iniciante'];

Io.sockets.on('connection', function (socket) {

  socket.on('addUsuario', function(username){
  	socket.username = username;
  	socket.room = 'Lob';
  	usernames[username] = username;
  	socket.join('Lob');
  	socket.emit('atualizarSalas', salas, 'Lob');
  });
  
  socket.on('trocarSala', function(novaSala) {
	
	socket.leave(socket.room);
	if(numUsuariosSala(socket.room) < 1 && socket.room != 'Lob'){
		salas.splice(salas.indexOf(socket.room),1);
	}		  
	socket.join(novaSala);
  	socket.room = novaSala;
	   socket.emit('atualizarSalas', salas, novaSala);
	   socket.broadcast.emit('atualizarListaSalas', salas);
	  
  })
  socket.on('novaSala', function(novaSala){
	  salas.push(novaSala);
	  socket.leave(socket.room);
  		socket.join(novaSala);
  		socket.room = novaSala;
	   socket.emit('atualizarSalas', salas, novaSala);
	   socket.broadcast.emit('atualizarListaSalas', salas);
  });
  socket.on('disconnect', function () {
      socket.emit('disconnected');
  });
});

function numUsuariosSala(sala){
	let raiz = '/'
	let numClients;
	try {
		let clients = Io.nsps[raiz].adapter.rooms[sala].sockets;
		numClients = Object.keys(clients).length
	} catch (error) {
		numClients = 0
	}	
	return numClients
}

