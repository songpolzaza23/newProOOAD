const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/insertDataTerms", (req, res) => {
    console.log("insertDataTerms")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("ManageYears").find({ year: data.year }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                console.log(result)
                if (result == "") {
                    var newvalues = { year: data.year, term: data.term };
                    dbo.collection("ManageYears").insertOne(newvalues, function(err, result) {
                        if (err) throw err;
                        console.log("1 insert! term and year");
                        db.close();
                    });
                    res.send('true')
                }
                res.send('true')
            }
        })
    });
})

module.exports = app;