const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/initDataToExam", (req, res) => {
    console.log("initDataToExam")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        array = []
        dbo.collection("Crouses").find({}).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                array.push(result)
                dbo.collection("Rooms").find({}).toArray((err, result) => {
                    if (err) {
                        console.log('error')
                        res.status(404).send('false');
                    } else {
                        array.push(result)
                        dbo.collection("Teachers").find({}).toArray((err, result) => {
                            if (err) {
                                console.log('error')
                                res.status(404).send('false');
                            } else {
                                array.push(result)
                                dbo.collection("Staffs").find({}).toArray((err, result) => {
                                    if (err) {
                                        console.log('error')
                                        res.status(404).send('false');
                                    } else {
                                        array.push(result)
                                        res.send(array)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    });
})

app.post("/api/selectCourse", (req, res) => {
    console.log("selectCourse")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Crouses").find({ subjectID: data.subjectID, nameSubject: data.nameSubject, group: data.group }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                console.log(result[0].student_ID)
                res.send(result[0].student_ID)
            }

        })
    });
})

app.post("/api/selectRoom", (req, res) => {
    console.log("selectRoom")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Rooms").find({ room_ID: data.room_ID }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                console.log(result[0].numberOfTable)
                res.send(result[0].numberOfTable)
            }

        })
    });
})

app.post("/api/insertDataExam", (req, res) => {
    console.log("insertDataExam")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        var newvalues = { course: data.course, room_ID: data.room_ID, date: data.date, timeStart: data.timeStart, timeEnd: data.timeEnd, staff: data.staff, seat: data.seat };
        dbo.collection("Exams").insertOne(newvalues, function(err, result) {
            if (err) throw err;
            console.log("1 insert! Crouses");
        });
        res.send('true')
    });
})

app.post("/api/LoadDataExam", (req, res) => {
    console.log("LoadDataExam")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Exams").find({}).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                res.send(result)
            }

        })
    });
})

module.exports = app;