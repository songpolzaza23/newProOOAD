const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/loadDataStudents", (req, res) => {
    console.log("loadDataStudents")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Students").find({}).toArray((err, result) => {
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

app.post("/api/insertDataStudents", (req, res) => {
    console.log("insertDataStudents")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Students").find({ student_ID: data.student_ID }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                console.log(result)
                if (result == "") {
                    var newvalues = { student_ID: data.student_ID, firstName: data.firstName, lastName: data.lastName, facultry: data.facultry, major: data.major, tel: data.tel, email: data.email };
                    dbo.collection("Students").insertOne(newvalues, function(err, result) {
                        if (err) throw err;
                        console.log("1 insert! Students");
                        var newvalues2 = { username: data.student_ID, password: data.lastName, type: "Student", person_id: data.student_ID };
                        dbo.collection("Users").insertOne(newvalues2, function(err, result) {
                            if (err) throw err;
                            console.log("1 insert! User");
                            db.close();
                        });
                    });
                }
                res.send('true')
            }
        })
    });
})

app.post("/api/initStudents", (req, res) => {
    console.log("initStudents")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body.student_ID
        console.log(data)
        dbo.collection("Students").find({ student_ID: data }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                res.send(result)
            }
        })
    });
})

app.post("/api/updateStudent", (req, res) => {
    console.log("updateStudent")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Students").find({ student_ID: data.path }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                var data2 = result[0]._id
                var newvalues = { $set: { student_ID: data.student_ID, firstName: data.firstName, lastName: data.lastName, facultry: data.facultry, major: data.major, tel: data.tel, email: data.email } };
                dbo.collection("Students").updateOne({ _id: data2 }, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                    res.send('true')
                });
            }
        })
    });
})

app.post("/api/deleteToTableStudent", (req, res) => {
    console.log("deleteToTableStudent")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Students").deleteOne({ student_ID: data.student_ID }, function(err, result) {
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