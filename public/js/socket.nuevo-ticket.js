//Comando pa establecer la conexion



var socket = io();

var label = $('#lblNuevoTicket');

socket.on("connect", function() {
    console.log('Creando nuevo ticket');
});

socket.on("disconnect", function() {
    console.log('Cayo la creacion del ticket');
});



socket.on("estadoActual", function(res) {
    label.text(res.actual);
});

$('button').on('click', function() {
    socket.emit('sgteTicket', null, function(sgteTicket) {

        label.text(sgteTicket);
    });
});