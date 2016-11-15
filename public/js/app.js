$(document).ready(function() {
	$("#start-game").click(function(e){
        e.preventDefault();
        $(".fondo-presentacion").slideUp(1000);
        $(".fondo-choose").slideDown(1000);
    });
});

