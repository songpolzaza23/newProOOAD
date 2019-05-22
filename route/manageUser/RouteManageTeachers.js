const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/loadDataTeachers", (req, res) => {
    console.log("loadDataTeachers")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Teachers").find({}).toArray((err, result) => {
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

app.post("/api/insertDataTeachers", (req, res) => {
    console.log("insertDataTeachers")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Teachers").find({ teacher_ID: data.teacher_ID }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                if (result == "") {
                    var newvalues = { teacher_ID: data.teacher_ID, firstName: data.firstName, lastName: data.lastName, facultry: data.facultry, major: data.major, tel: data.tel, email: data.email };
                    dbo.collection("Teachers").insertOne(newvalues, function(err, result) {
                        if (err) throw err;
                        console.log("1 insert! Teachers");
                        var newvalues2 = { username: data.teacher_ID, password: data.lastName, type: "Teacher", person_id: data.teacher_ID };
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

app.post("/api/initTeachers", (req, res) => {
    console.log("initTeachers")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body.teacher_ID
        console.log(data)
        dbo.collection("Teachers").find({ teacher_ID: data }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                res.send(result)
            }
        })
    });
})

app.post("/api/updateTeacher", (req, res) => {
    console.log("updateTeacher")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Teachers").find({ teacher_ID: data.path }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                var data2 = result[0]._id
                var newvalues = { $set: { teacher_ID: data.teacher_ID, firstName: data.firstName, lastName: data.lastName, facultry: data.facultry, major: data.major, tel: data.tel, email: data.email } };
                dbo.collection("Teachers").updateOne({ _id: data2 }, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                    res.send('true')
                });
            }
        })
    });
})

app.post("/api/deleteToTableTeacher", (req, res) => {
    console.log("deleteToTableTeacher")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Teachers").deleteOne({ teacher_ID: data.teacher_ID }, function(err, result) {
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