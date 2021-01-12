const SerialPort = require('serialport')
const Readline = require('@serialport.parser-readline')
const port = new SerialPort('dev/ttyACM0') //list with ls /dev/tty*

const parser = port.pipe(new Readline({
    delimiter: '\r\n'
}));

parser.on('data', console.log)