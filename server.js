const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const express = require('express');
const cors = require('cors')
const app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

const connectDB = require('./API/configs/db');

connectDB();


app.set('views', __dirname + '/views'); //select the view directory
app.set('view engine', 'ejs'); //set the ejs as a html rendering engine
app.engine('html', require('ejs').renderFile); //set the ejs as a html rendering engine

var server = app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(express.static('public')); //select the static files' path to public directory

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "/public/upload"));
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

var crudRouter = require('./API/routes/Crud');
var mainRouter = require('./API/routes/main'); //select the router file
var userRouter = require('./API/routes/User');


app.use('/', mainRouter);
app.use('/crud/', crudRouter);
app.use('/api/v1', userRouter);
app.use('/crud/', crudRouter);







