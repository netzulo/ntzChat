//-----------------------------------------------------------------
module.exports = function Pages(){
	var definition = {
		PageHome : PHome ,
		PageChat : PChat
	};

	return definition;
};
//-----------------------------------------------------------------
function PHome(req, res){
	res.sendFile("index.html");
}

function PChat(req, res){
	res.send("<h1>DIUSCHAT</h1>");
}