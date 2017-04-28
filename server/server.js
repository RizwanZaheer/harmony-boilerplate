// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var routes     = require('./src/routes');
var config     = require('./src/config');
var path 	   = require('path');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

if(config.useMongo){
  var mongoose   = require('mongoose');
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongo.dbUrl); // connect to our database  
}


// SQL
if(config.useSql){
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize(config.sql.db, config.sql.user, config.sql.pass);
}


// REGISTER OUR ROUTES -------------------------------
require('./src/routes').default(app);

app.use(express.static(path.join(__dirname, '..','client')));

// API FALLBACK
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname ,'..','/client/index.html'));
});
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// uncaughtException
process.on('uncaughtException', function (err) {
  console.log(err);
})