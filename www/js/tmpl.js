var socket = null;
//----------------------------------------
function Init(){
	socket = io.connect();

	//LOAD events
	$("#addClass").click(function () {
    	$('#qnimate').addClass('popup-box-on');
    });
          
    $("#removeClass").click(function () {
    	$('#qnimate').removeClass('popup-box-on');
    });

	AppInfo();
}
//----------------------------------------
$(document).ready(Init);

//########################################
function AppInfo(){
	console.log("---------------------------------");
	console.log("IO: " + socket);
	console.log("---------------------------------");
}
//########################################