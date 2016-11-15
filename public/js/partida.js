var socket = io();
$(document).ready(function() {
    var valorPagina = $("#valor-pagina").val();
    console.log(valorPagina);
socket.connect();

var valorPaginaJson = {
    id: valorPagina
}
socket.emit("valor",valorPaginaJson);
 


});
socket.on("seconecto", function(data){
    console.log("rpta: ");
    console.log(data);
    console.log("rpta: " + data);
});
