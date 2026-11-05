
let mysql = require('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "customerdb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    let sql = "CREATE TABLE IF NOT EXISTS teams (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, stadium VARCHAR(255), city VARCHAR(255))";

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Teams table created");
        con.end();
    });
});
