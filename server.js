var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

var posiciones = [[0,0,0],
				  [0,0,0],
				  [0,0,0]];

function encontrarGanador(arreglo, jugador) {
	var mensaje = false;

	if(arreglo[0][0] == jugador && arreglo[0][1] == arreglo[0][0] && arreglo[0][2] == arreglo[0][0]){
		mensaje = true;
	}
	else
	if(arreglo[1][0] == jugador && arreglo[1][1] == arreglo[1][0] && arreglo[1][2] == arreglo[1][0]){
		mensaje = true;
	}
	else
	if(arreglo[2][0] == jugador && arreglo[2][1] == arreglo[2][0] && arreglo[2][2] == arreglo[2][0]){
		mensaje = true;
	}
	else
	if(arreglo[0][0] == jugador && arreglo[1][0] == arreglo[0][0] && arreglo[2][0] == arreglo[0][0]){
		mensaje = true;
	}
	else
	if(arreglo[0][1] == jugador && arreglo[1][1] == arreglo[0][1] && arreglo[2][1] == arreglo[0][1]){
		mensaje = true;
	}
	else
	if(arreglo[0][2] == jugador && arreglo[1][2] == arreglo[0][2] && arreglo[2][2] == arreglo[0][2]){
		mensaje = true;
	}
	else
	if(arreglo[0][0] == jugador && arreglo[1][1] == arreglo[0][0] && arreglo[2][2] == arreglo[0][0]){
		mensaje = true;
	}
	else
	if(arreglo[0][2] == jugador && arreglo[1][1] == arreglo[0][2] && arreglo[2][0] == arreglo[0][2]){
		mensaje = true;
	}
	return mensaje;
	// if(mensaje == true){
	// 	socket.broadcast.emit("validar", mensaje);
	// }
}

io.on("connection", function(socket) {
	socket.on("jugadacli",function(data){
		console.log(data);

		var row = data.x;
		var col = data.y;

		posiciones[row][col] = data.valor;
		// console.log(posiciones);

		socket.broadcast.emit("jugadaserver", data);

		var ganador = encontrarGanador(posiciones, data.valor);
		console.log(ganador);
		if(ganador == true){
			socket.emit("validar", ganador);
			posiciones = [[0,0,0],
				  [0,0,0],
				  [0,0,0]];
		}	

	});
});

//HEROKU
app.set('port', (process.env.PORT || 1511));
app.get('/', function(req, res) {
  res.render("index.html");
});
server.listen(app.get('port'), function(){
  console.log("encendido");
});
