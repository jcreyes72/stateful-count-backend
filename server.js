//importing our packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api')

// Mongoose connection
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stateful_count', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected");
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
    origin: 'https://statefulcount-front.onrender.com',
    optionsSuccessStatus: 200
  }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes)



app.listen(PORT, console.log(`Server is starting at ${PORT}`))