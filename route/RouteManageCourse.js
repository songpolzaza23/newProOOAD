const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/initCourseAdd", (req, res) => {
    console.log("initCourseAdd")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        array = []
        dbo.collection("Subjects").find({}).toArray((err, result) => {
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
                        dbo.collection("ManageYears").find({}).toArray((err, result) => {
                            if (err) {
                                console.log('error')
                                res.status(404).send('false');
                            } else {
                                array.push(result)
                                dbo.collection("Students").find({}).toArray((err, result) => {
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

app.post("/api/loadDataCourse", (req, res) => {
    console.log("loadDataCourse")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Crouses").find({}).toArray((err, result) => {
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

app.post("/api/insertDataCourse", (req, res) => {
    console.log("insertDataCourse")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Crouses").find({ course_ID: data.course_ID }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                console.log(result)
                dbo.collection("Crouses").find({}).count((err, result) => {
                    if (err) {
                        console.log('error')
                        res.status(404).send('false');
                    } else {
                        console.log(result)
                        var countCourse = "CID" + result + 1;
                        var newvalues = { course_ID: countCourse, subjectID: data.subjectID, nameSubject: data.nameSubject, numSuject: data.numSuject, year: data.year, term: data.term, firstNameTeacher: data.firstName, lastNameTeacher: data.lastName, group: data.group, student_ID: data.student_ID };
                        dbo.collection("Crouses").insertOne(newvalues, function(err, result) {
                            if (err) throw err;
                            console.log("1 insert! Crouses");
                        });
                        res.send('true')
                    }
                })
            }
        })
    });
})

app.post("/api/updateCourse", (req, res) => {
    console.log("updateCourse")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Crouses").find({ subjectID: data.path.split("%20")[0], year: data.path.split("%20")[1], term: data.path.split("%20")[2], group: data.path.split("%20")[3] }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                var data2 = result[0]._id
                var newvalues = { $set: { subjectID: data.subjectID, nameSubject: data.nameSubject, numSuject: data.numSuject, year: data.year, term: data.term, firstNameTeacher: data.firstName, lastNameTeacher: data.lastName, group: data.group, student_ID: data.student_ID } };
                dbo.collection("Crouses").updateOne({ _id: data2 }, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                    res.send('true')
                });
            }
        })
    });
})

app.post("/api/deleteToTableCourse", (req, res) => {
    console.log("deleteToTableCourse")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Crouses").deleteOne({ subjectID: data.subjectID, year: data.year, term: data.term, group: data.group }, function(err, result) {
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