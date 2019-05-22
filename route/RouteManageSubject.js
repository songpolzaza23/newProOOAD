const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/loadDataSubjects", (req, res) => {
    console.log("loadDataSubjects")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Subjects").find({}).toArray((err, result) => {
            if (err) {
                console.log('error bBuy line 20')
                res.status(404).send('false');
            } else {
                res.send(result)
                    // console.log(result)
            }
        })
    });
})

app.post("/api/insertDataSubjects", (req, res) => {
    console.log("insertDataSubjects")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Subjects").find({ subjectID: data.subjectID }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                var newvalues = { subjectID: data.subjectID, nameSubject: data.nameSubject, numSuject: data.numSuject };
                dbo.collection("Subjects").insertOne(newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 insert! Subjects");
                });
                res.send('true')
            }
        })
    });
})

app.post("/api/initSubjects", (req, res) => {
    console.log("initSubjects")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body.subjectID
        console.log(data)
        dbo.collection("Subjects").find({ subjectID: data }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                res.send(result)
            }
        })
    });
})

app.post("/api/updateSubject", (req, res) => {
    console.log("updateSubject")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Subjects").find({ subjectID: data.path }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                var data2 = result[0]._id
                var newvalues = { $set: { subjectID: data.subjectID, nameSubject: data.nameSubject, numSuject: data.numSuject } };
                dbo.collection("Subjects").updateOne({ _id: data2 }, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                    res.send('true')
                });
            }
        })
    });
})

app.post("/api/deleteToTableSubject", (req, res) => {
    console.log("deleteToTableSubject")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Subjects").deleteOne({ subjectID: data.subjectID }, function(err, result) {
            if (err) {
                res.sendStatus(404)
                console.log("delete : -> " + result)
                res.send('false')
                db.close();
            } else {
                // console.log(result)
                // if (result.length > 0) {
                // res.send(result)
                db.close();
                // } else {
                res.send('true')
                    // }
            }
        })
    });
})

module.exports = app;