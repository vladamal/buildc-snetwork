

var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    path            = require('path'),
    morgan          = require('morgan'),

    params      = require('./config/params'),
    connection  = require('./config/database');


app.listen(params.port, '0.0.0.0');

console.log('');
console.log(' ... server online on '.green + params.port + ' ... '.green);


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname) + '/webapp'));

app.get('/', function(req, res) {
    res.send(' test ');
});


connection.init('buildc-snetwork');

app.use('/api', require('./server/api'));