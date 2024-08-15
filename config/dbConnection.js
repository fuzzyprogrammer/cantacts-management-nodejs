const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async () => {
    const connected = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`DB has successfully connected:`, connected.connection.host, connected.connection.name);
});

module.exports = connectDB;