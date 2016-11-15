var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on("coneccion", function(socket) {
	socket.on("turnando", function (data) {
		socket.broadcast.emit("yajugo", data)
	});
});
server.listen(1511, function() {
	console.log("El servidor ha iniciado en el puerto 1511");
});