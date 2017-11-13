
var db     = require('mongoose'),
    config = require('./params'),
    colors = require('colors'),
    connection;

function initDbConnection(dbName) {

    db.connect(
        config.database.address
        ,dbName
        ,config.database.port
    );

    connection = db.connection;
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.on('connected', function () {

        console.log(colors.bgGreen(' [mongo] Connected '));

    });
    return connection;
}


module.exports.init = initDbConnection;

