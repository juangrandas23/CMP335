
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

    let sql = "DELETE FROM teams WHERE name = 'Manchester United'";

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " team deleted");
        con.end();
    });
});
