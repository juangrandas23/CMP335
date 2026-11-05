
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

    let sql = "INSERT INTO teams (name, stadium, city) VALUES ?";

    let values = [
        ['Liverpool', 'Anfield', 'Liverpool'],
        ['Chelsea', 'Stamford Bridge', 'London'],
        ['Manchester City', 'Etihad Stadium', 'Manchester'],
        ['Manchester United', 'Old Trafford', 'Manchester']
    ];

    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " teams inserted");
        con.end();
    });
});
