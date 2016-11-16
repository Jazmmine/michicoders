var socket = io();
var valorPagina;
var prueba;
var esturno = false;

$(document).ready(function() {
  valorPagina = $("#valor-pagina").val();
  //console.log(valorPagina);
      
    if(valorPagina== "X"){
        alert("Comienza a jugar");
        esturno = true;
    }
    else if(valorPagina == "O"){
        alert("Espera tu turno")
        esturno = false;
    }   
  socket.connect();

 /* var valorPaginaJson = {
      id: valorPagina
  }*/
   
  $(".cuadrado").click(function(){
    if(esturno){
      var divSeleccionado = $(this).attr("id");
      var posX = $(this).attr("data-x");
      var posY = $(this).attr("data-y");

      var divSeleccionadoJson = {
        id: divSeleccionado,
        x: posX,
        y: posY,
        valor: valorPagina,
      }
      socket.emit("jugadacli",divSeleccionadoJson);

      if(valorPagina == "X"){
        $(this).addClass("classX"); 
      }
      else if(valorPagina == "O"){
        $(this).addClass("classO");
      }
      esturno = false;
    }else{
      alert("Espera tu turno");
    }
  
  });

});

socket.on("jugadaserver", function(divSeleccionadoJson){
    console.log(divSeleccionadoJson);
    // var clase = "";
    if(divSeleccionadoJson.valor == "X"){
      $("#" + divSeleccionadoJson.id).addClass("classX");
    }
    else if(divSeleccionadoJson.valor == "O"){
      $("#" + divSeleccionadoJson.id).addClass("classO");
    }
    esturno = true;
});

socket.on("validar", function(mensaje){
  alert("GANASTE!!");
});

