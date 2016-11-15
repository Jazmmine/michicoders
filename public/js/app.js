var socket = io();

$(document).ready(function() {
	$("#start-game").click(function(e){
        e.preventDefault();
        $(".fondo-presentacion").slideUp(1000);
        $(".fondo-choose").slideDown(1000);
    });

	$(".cuadrado").click(function(){
		var $cruz = $("<i></i>").text("clear");
		$cruz.addClass("cursor-pointer color-white material-icons large");

		socket.emit("conectando", $cruz);
	});
});

socket.on("yajugo", function (data) {
	$(".cuadrado").append(data);
});