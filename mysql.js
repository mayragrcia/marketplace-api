const mysql = require ('mysql');

var pool = mysql.createPool({
    "user" : "root",
    "password" : "2409posi",
    "database" : "ecommerce",
    "host" : "localhost", 
    "port" : 3000
});

exports.pool = pool; 