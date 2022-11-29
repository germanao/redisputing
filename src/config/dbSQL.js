const mysql = require("mysql");

const db = mysql.createPool({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "reforms",
    host: "redisputing-mysql.caddiitiwl8g.sa-east-1.rds.amazonaws.com",
    user: "admin",
    password: "b82681cfc76a9d3d1b542c49894d25a2",
    database: "sys",
    
});

module.exports = db;

// mysql://bddb70a528a7dd:79d7872f@us-cdbr-east-05.cleardb.net/heroku_b45188a33c49306?reconnect=true

// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "reforms",
// });