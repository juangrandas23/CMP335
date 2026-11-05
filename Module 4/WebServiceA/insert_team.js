
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

    let sql = "INSERT INTO teams (name, stadium, city) VALUES ('Arsenal', 'Emirates Stadium', 'London')";

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 team inserted");
        con.end();
    });
});
