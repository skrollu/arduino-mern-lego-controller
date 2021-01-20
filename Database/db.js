const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/arduino";

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection  = mongoose.connection;

connection.once("open", () => {
    console.log('MongoDB connection estabished successfully')
})

connection.on('error', (err) => {
    console.log("MongoDB Error: " + err)
})

module.exports = connection;