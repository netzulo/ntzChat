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
			id: 1,
			name: "Sala 001",
			users:[],// asociar id socket
			sockets:[]
		}
	];
	var _agentsByDefault =[
		{//TEST: cambiar por datos desde db
			id: 500,
			name: "Pablo Garcia",
			roomsIds: []//quiza el control de ids deba ir sobre la sala solamente
		}
	];
	var chat = new Chat(_roomsByDefault, _agentsByDefault);
	var definition = {
		"sockets" : io,
		"chat" : chat		
	}
	//----
	//CONFIGURACION PARA CADA SOCKET
	definition.sockets.on('connection', function(socket){
		console.log('[Socket.io]: Un usuario se ha conectado');

		socket.emit('connected',{msg: "Usuario conectado"});

		socket.on('contact', function (data) {
			var _user = {
				socketId: socket.id,
				name: data.name,
				type:"client",
				cc: data.cc
			};
			//TODO: seleccionar sala valida			
			var _room = {//TEST: cambiar por datos desde db
				id: 1,
				name: "Sala 001",
				users:[],// asociar id socket
				sockets:[]
			};			
			var assignInfo = { user: _user, room: _room };
			//---		

			//TODO: buscar una sala valida
			chat.rooms[0].users.push(_user);
			chat.rooms[0].sockets.push(socket);
			//Genero el canal de comunicacion privado
			socket.join(chat.rooms[0].id);
			socket.to(chat.rooms[0].id).emit('assigned', { msg : "conectado a la sala"+ chat.rooms[0].name});

			//---
			console.log("[SOCKET][contact]: %s", response.msg);			
		});	
		socket.on('assigned', function(data) {
			var _assignInfo = data;

			var response = {msg : "conectado a la sala"+ _room.name};
			//---



			//---
			console.log("[SOCKET][contact]: %s", response.msg);			
		});	
		//----
		socket.on('error', function(data) {
			console.log("[Socket.io][ERROR]: error en evento recibido| socketID: %s | host: %s", this.client.conn.id,this.client.conn.remoteAddress);
		});
		//---
	 	socket.on('disconnect', function(data){
    		console.log('[Socket.io]: Un usuario se ha desconectado');
  		});
	});
	//----	
	//----
	console.log("[Socket.io]: Cargado Socket.io");
	//----	
	return definition;
};
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

