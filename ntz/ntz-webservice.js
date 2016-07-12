//-----------------------------------------------------------------
module.exports = function WS(){
	var definition = {
		texts : WsText,
		data : WsData 
	};

	return definition;
};
//-----------------------------------------------------------------
function WsText(req, res){
	res.send("<h1 style='color:green'>DIUSCHAT</h1>");
}

function WsData(req, res){
	var obj = {
		id: 1,
		msgs: []
	};
	obj.msgs.push({msg: "Soy un mensaje"});


	res.send(obj);
}




