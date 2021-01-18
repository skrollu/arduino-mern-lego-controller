const express = require('express')
const app = express();

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0')

const parser = port.pipe(new Readline({
    delimiter: '\r\n'
}))

const onOpen = () => {
    console.log("On open...")
}

const onData = (data) => {
    console.log("data: " + data);
}

parser.on('open', onOpen);
parser.on('data', onData);

app.listen('4000', () => {
    console.log("Server Started !")
})