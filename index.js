var express = require('express');
var webRouter = express.Router();
var wsRouter = express.Router();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//--------------------------------------------------
//SETTINGS ntz
var pages = require('./ntz/ntz-website.js')();
var ws = require('./ntz/ntz-webservice.js')();
var asyn = require('./ntz/ntz-asyn.js')(io);
//--------------------------------------------------
//SETTINGS app
app.use('/api', wsRouter);
app.use('/', express.static(__dirname +'/www'));//Enruta directorio publico hacia la raiz del sitio web
app.use('/libs', express.static(__dirname +'/www/libs'));//Enruta directorio publico hacia las librerias publicas JS
//--------------------------------------------------
//REQUEST app
//---- WebSite
app.get('/', function(req, res) {
	res.send("index.html");
});
//---- WebService
wsRouter.get('/texts', ws.texts);
wsRouter.get('/data', ws.data);
//--------------------------------------------------
var webServer = app.listen(10000);
io.listen(webServer);
//--------------------------------------------------
//TESTING ZONE
console.log("-------------------------------------------------------------------------------------------------");	
console.log("Pages functions: ");	
console.log(pages);
console.log("-------------------------------------------------------------------------------------------------");	
console.log("WebService functions: ");	
console.log(ws);
console.log("-------------------------------------------------------------------------------------------------");	
console.log("Chat functions: ");	
console.log(asyn.chat);
console.log("-------------------------------------------------------------------------------------------------");
