//Requires parameter from node module: socket.io
var Chat = function(rooms, agents){
	this.rooms = rooms || [];
	this.agents = agents || [];
	this.clients = [];	
};
Chat.prototype.logger = function(path, method, msg) {	
	var date = new Date();
	var currDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	
	if(method === "" || msg === "" ){
		console.log("[%s][%s]: %s", currDate, path, msg);
	}else {
		console.log("[%s][%s][%s]: %s", currDate, path, method, msg);
	}
}; 
//-----------------------------------------------------------------
//EXAMPLE
////las salas deben almacenar users asociados a los sockets
////los agentes deben estar asociados a diferentes salas con sus sockets
////
//-----------------------------------------------------------------
module.exports = function Asyn(io){

	var _roomsByDefault =[
		{//TEST: cambiar por datos desde db
			id: "room_001",
			name: "Sala 001",
			users:[],// asociar id socket
			sockets:[]
		}
	];
	var chat = new Chat(_roomsByDefault, null);
	var definition = {
		"sockets" : io,
		"chat" : chat		
	}
	//----
	//CONFIGURACION PARA CADA SOCKET
	definition.sockets.on('connection', onConnection);
	//----	
	//----
	console.log("[Socket.io]: Cargado Socket.io");
	//----	
	return definition;
};
//-----------------------------------------------------------------
function onConnection(socket){
	console.log('[Socket.io]: Un usuario se ha conectado');	
	//LISTENERs
	socket.on('contact', onContact);			
	socket.on('error', onError);
	socket.on('disconnect', onDisconnect);
	//EMITTERs
	socket.emit('connected',{msg: "Usuario conectado"});
}

function onContact(data) {
	var response = { msg : "Conectado a la sala "+ chat.rooms[0].name};
	//TODO: buscar una sala valida
	chat.rooms[0].users.push({ id: "cli_001", name: data.name, cc: data.css });
	chat.rooms[0].sockets.push(socket);
	//Genero el canal de comunicacion privado
	socket.join(chat.rooms[0].id);
	//Se informa al cliente que esta conectado al nombre de sala
	socket.broadcast.to(chat.rooms[0].id).emit('assigned', response);
	//---
	console.log("[SOCKET][contact]: %s", response.msg);			
}

function onError(data) {
	console.log("[Socket.io][ERROR]: error en evento recibido| socketID: %s | host: %s", this.client.conn.id,this.client.conn.remoteAddress);
}

function onDisconnect(data){
	console.log('[Socket.io]: Un usuario se ha desconectado');
}
//-----------------------------------------------------------------
function GetFreeAgent(byId){
	var item = null;
	for (var i = 0;i < _agents.length ; i++) {
		if(_agents[i].id === byId){item = _agents[i];}
	}
	return item;
}
function GetFreRoom(argument) {
	for (var i = allRooms.length - 1; i >= 0; i--) {		
		if(_room.isPrivate){
			if(_room.isEmpty){
				return allRooms[i];
			}
		}
	}
}
