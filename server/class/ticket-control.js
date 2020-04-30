const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0; //Ultimo ticke , reinicio diario 
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos_cuatro = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            //Continuar el trabajo
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos_cuatro = data.ultimos_cuatro;

            this.siguienteTicket();
        } else {
            //Reiniciar ticket
            this.reiniciarConteo();
        }

    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {

        return `Ticket 4 ${this.ultimos4}`;
    }

    atenderUltimoTicket(escritorio) {

        if (this.tickets.length === 0) {
            return "No hay tickets pendientes";
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos_cuatro.unshift(atenderTicket);

        if (this.ultimos_cuatro.length > 4) {
            this.ultimos_cuatro.splice(-1, 1); // Borra el ultimo numero
        }

        console.log('Ultimos cuatro', this.ultimos_cuatro);

        this.grabarArchivo();
        return atenderTicket;


    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos_cuatro = [];
        console.log('Se reinicio el sistema');
        this.grabarArchivo();
    }


    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos_cuatro: this.ultimos_cuatro

        };
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }





}

module.exports = {
    TicketControl
}