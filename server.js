//var express = require('express'); 
//var app = express(); 
var Sequelize = require('sequelize'); 
//var port = 3000 
//var bodyParser = require('body-parser'); 
var connection = new Sequelize('conjug', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

var Article = connection.define('article', {
    title: Sequelize.STRING,
    body: Sequelize.STRING
});  
console.log("bonjour");
connection.sync();
