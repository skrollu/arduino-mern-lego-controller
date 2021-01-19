const port = process.env.PORT || 5000;

const app = require('express')();
const http = require('http').createServer(app);

const socketIo = require("socket.io");
const io = socketIo(http, {
    cors: {
        origin: "http://localhost:" + port,
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    socket.emit('request', /* … */); // emit an event to the socket
    socket.on('messageReturnFromClient', (data) => { 
        console.log("message Return From the Client: " + data) 
    }); // listen to the event
});

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
//const port = new SerialPort('/dev/ttyACM0') // USB de mon PC portable Linux
const serialPort = new SerialPort('COM4') //USB de mon pc Windows

const parser = serialPort.pipe(new Readline({
    delimiter: '\r\n'
}))

const onOpen = () => {
    console.log("On open...")
}

const onData = (data) => {
    const json = {
        test: "coucou",
        angle: data
    }

    io.sockets.emit('arduino', json); // emit an event to all connected sockets
}

parser.on('open', onOpen);
parser.on('data', onData);


http.listen(port, () => {
    console.log("Server Started on port " + port)
})