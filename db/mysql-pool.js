const mysql = require('mysql');
const pool  = mysql.createPool({
    connectionLimit : 5,
    user            : 'ernesto',
    password        : '',
    host            : "localhost",
    port            : 3306,
    database        : 'employees'
});

module.exports = pool;
