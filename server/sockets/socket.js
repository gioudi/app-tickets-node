const { io } = require('../server');
const { TicketControl } = require('../class/ticket-control');

const ticketcontrol = new TicketControl();
io.on('connection', (client) => {

    client.on('sgteTicket', (data, callback) => {
        let sgte = ticketcontrol.siguienteTicket();
        console.log(sgte);

        callback(sgte);
    });

    client.emit('estadoActual', {
        actual: ticketcontrol.getUltimoTicket(),
        utimos4: ticketcontrol.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }


        let atenderTicket = ticketcontrol.atenderUltimoTicket(data.escritorio);


        callback(atenderTicket);

    });


    client.broadcast.emit('ultimos4', {
        ultimos4: ticketcontrol.getUltimos4()
    });

});