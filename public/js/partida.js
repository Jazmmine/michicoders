var socket = io();
var valorPagina;
var prueba;

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
    //console.log(divSeleccionado)
    var divSeleccionadoJson = {
        id: divSeleccionado,
        name: valorPagina
    }
    socket.emit("jugada",divSeleccionadoJson);

    if(valorPagina == "X"){
        $(this).addClass("classX");
    }
    else if(valorPagina == "O"){
         $(this).addClass("classO");
    }

    if(($(this).hasClass("classX")) && 
       ($(this).prev().hasClass("classX")) &&
       ($(this).prev().prev().hasClass("classX"))){
      alert("GANASTE");
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
    if(divSeleccionadoJson.name == "X"){
        $("#" + divSeleccionadoJson.id).addClass("classX");
    }
    else if(divSeleccionadoJson.name == "O"){
         $("#" + divSeleccionadoJson.id).addClass("classO");
    }   
});
