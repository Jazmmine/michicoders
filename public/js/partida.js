var socket = io();
var valorPagina;
var prueba;
var turno;

$(document).ready(function() {
  valorPagina = $("#valor-pagina").val();
  //console.log(valorPagina);
  socket.connect();

  var valorPaginaJson = {
      id: valorPagina
  }
  socket.emit("valor",valorPaginaJson);
   
  $(".cuadrado").click(function(){
    var divSeleccionado = $(this).attr("id");
    var posX = $(this).attr("data-x");
    var posY = $(this).attr("data-y");

    var divSeleccionadoJson = {
      id: divSeleccionado,
      x: posX,
      y: posY,
      valor: valorPagina
    }
    socket.emit("jugada",divSeleccionadoJson);

    if(valorPagina == "X"){
      $(this).addClass("classX");   
    }
    else if(valorPagina == "O"){
      $(this).addClass("classO");
    }
  });

});

socket.on("seconecto", function(data){
    // console.log("rpta: ");
    // console.log(data);
    // console.log("rpta: " + data);
});

socket.on("jugada", function(divSeleccionadoJson){
    console.log(divSeleccionadoJson);
    // var clase = "";
    if(divSeleccionadoJson.valor == "X"){
      $("#" + divSeleccionadoJson.id).addClass("classX");
    }
    else if(divSeleccionadoJson.valor == "O"){
      $("#" + divSeleccionadoJson.id).addClass("classO");
    }
});

socket.on("validar", function(mensaje){
  alert("GANASTE!!");
});

