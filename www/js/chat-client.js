var Chat = function (io){
	var instance = this;
	this.Io = io || null;

	if(io != null){
		this.room = undefined || null;
		this.user = undefined || null;	
	}
	

	this.Io().on('connected', function(data) {
		instance.logger("chat-server","connected","Se recibe evento 'connected' desde el servidor");
		instance.logger("chat-server","connected","response: "+JSON.stringify(data));		
	});
};

//Mejorar infiriendo en un login con tokens
Chat.prototype.connect = function() {
	this.Io.connect();
	this.logger("chat","connection","Se envia evento 'connection' al socket");
};
Chat.prototype.disconnect = function() {
	this.Io().emit('disconnect',{});
	this.logger("chat","disconnect","Se envia evento 'disconnect' al socket");
};

//Need: NAME, CODIGO DE COMERCIO
Chat.prototype.contact = function(_name, _cc) {
	this.Io().emit('contact',{name: _name, cc:_cc });
	this.logger("chat","contact","Se envia evento 'contact' al socket");
};

Chat.prototype.send = function(_text) {
	this.Io().emit('message',{msg : _text});
	this.logger("chat","contact","Se envia evento 'message' al socket");
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