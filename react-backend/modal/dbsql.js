var mysql_package = require('mysql');

var connection_data = mysql_package.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'ecomreact',
});

module.exports=connection_data;