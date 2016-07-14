var chat = null;
//----------------------------------------
function Init(){
	chat = new Chat(io);
	chat.connect();
	//LOAD events
	$("#addClass").click(function (e) {
		var name = $("#txtName").val();
		var cc = $("#txtCC").val();
		//TODO: validate fields
		chat.contact(name, cc);
    	$('#qnimate').addClass('popup-box-on');
    });
          
    $("#removeClass").click(function (e) {
    	$('#qnimate').removeClass('popup-box-on');
    });


    $("#btnMsg").on('click', function(e) {
    	var input = $("#status_message");
    	var _text = input.text();

    	//TODO: emitir mensaje    	
    });
}
//----------------------------------------
$(document).ready(Init);

//########################################
function AppInfo(){
	console.log("---------------------------------");
	console.log("CHAT: " + JSON.stringify(chat));
	console.log("---------------------------------");
}
//########################################