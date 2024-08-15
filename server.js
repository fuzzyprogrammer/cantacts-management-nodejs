const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/dbConnection');
require('dotenv').config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use('/api/contacts', require('./routes/contactRouter'));
app.use('/api/users', require('./routes/userRouter'));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});