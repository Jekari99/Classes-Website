// Require express and create an instance of it
var http = require("http");
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/classes.db');

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile('./index.html');
});

app.get('*', function (req, res) {
    res.status(404).send("Error 404 occured!");
});

db.run('CREATE TABLE IF NOT EXISTS classes(class_category TEXT, class_number TEXT, professor TEXT)');

app.post('/add', function (req, res) {
    db.serialize(() => {
        db.run('INSERT INTO classes(class_category, class_number, professor) VALUES(?,?,?)', [req.body.class_category, req.body.class_number, req.body.professor], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log("New class has been added");
        });
    });
});
// db.close((err) => {
//     if (err) return console.error(err.message);
// });




// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});
