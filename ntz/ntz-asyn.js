//Requires parameter from node module: socket.io
//-----------------------------------------------------------------
//EXAMPLE
////si isPrivate es verdadero, la sala es privada
////si isPrivate es falso, la sala es publica
////si isEmpty es verdadero, entonces el agent debe entrar en la sala y marcarla ocupada
////si isEmpty es falso, entonces no se puede ocupar esa sala

var allRooms = [	
	{
		id: 1,
 		name: "Sala_001",
 		desc:"At. al cliente 001",
 		isPrivate: true,
 		isEmpty: true,
 		msgs: [],
 		users:[],
 		sockets:[]
 	}
];

var _agents = [
	{id: '500', name:"Luna", priority:1},
	{id: '520', name:"Estela", priority:2},
	{id: '542', name:"Pablo", priority:3}
];

//-----------------------------------------------------------------
module.exports = function Asyn(io){
	var definition = {
		sockets : io		
	}
	//----
	definition.sockets.on('connection', function(socket){
		console.log('[Socket.io]: Un usuario se ha conectado');


		//Handlers
		//TODO: entrar a una sala con una seleccion web

		//TODO: generacion de ids de usuario statico, de momento
		socket.on('contact', function (socketId,data) {
			var _user = {
				id: socketId,
				name: data.name,
				type:"client",
				cc: data.cc
			};
			var _agent = GetFreeAgent(data.id);
			var _room = GetFreRoom();
			//--- Rellena la sala
			_room.users.push(_agent);
			_room.users.push(_user);
			//-- Crea el canal de comunicacion
			//TODO:
			socket.join(_room.name);
			//-- Envia mensaje: ON a los dos extremos
			//TODO: emite mensaje roomenabled
			socket.to(_room.name).emit('connectedroom', {msg : "conectado a la sala"+ _room.name});

			//
			console.log("[SOCKET][client message]: %s", msg);			
		});
		//Emitters


	 	socket.on('disconnect', function(){
    		console.log('[Socket.io]: Un usuario se ha desconectado');
  		});
	});
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