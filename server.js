const port = process.env.PORT || 5000;

const express = require('express')
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

const doorRoutes = require('./routes/door');
app.use("/", doorRoutes);

const http = require('http').createServer(app);

/*************************************** MongoDB ****************************************************/

const db = require('./Database/db');
const Door = require('./Database/models/door')

/*************************************** socketIo ****************************************************/

const socketIo = require("socket.io");
const io = socketIo(http, {
    cors: {
        origin: "http://localhost:" + port,
        methods: ["GET", "POST"]
    }
});

/*************************************** ARDUINO ****************************************************/


const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
//const port = new SerialPort('/dev/ttyACM0') // USB de mon PC portable Linux
const serialPort = new SerialPort('COM4') //USB de mon pc Windows

//On établit la connection avec le client Socket.io
io.on('connection', socket => {

    //A la réception d'un message du client on communique via le serial port
    socket.on('client', (data) => {
        console.log("From Client: " + data.open);
        
        if(data.open){
            serialPort.write('1') //Ouverte
        } else {
            serialPort.write('0') //Fermée 
        }
    });
});

const parser = serialPort.pipe(new Readline({
    delimiter: '\r\n'
}))

parser.on('open', () => {
    console.log("On open...")
});

//Chaque serial.println("...") dans le code de l'arduino envoie des données sur le canal data
//Nous communiquons ces données au client.
parser.on('data', (data) => {
    console.log("From Arduino: " + data)

    const newDoor = new Door({
        open: data == "1" ? true : false
    })

    newDoor.save().then((door) => {
        console.log(door);
        if(door) {
            io.sockets.emit('arduino', door); // emit an event to all connected sockets
        } else {
            io.sockets.emit('arduino', "Error: save in database didn't work.."); // emit an event to all connected sockets
        }
    }).catch(err => console.log("Error catched: " + err));
});


http.listen(port, () => {
    console.log("Server started on port " + port)
})