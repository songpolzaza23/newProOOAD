const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/initShowExam", (req, res) => {
    console.log("initShowExam")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body.student
        dbo.collection("Exams").find({}).toArray(function(err, result) {
            if (err) {
                res.sendStatus(404)
                console.log(result)
            } else {
                res.send(result)
            }
        })
    });
})

app.post("/api/loadDataSearchExamRoom", (req, res) => {
    console.log("loadDataSearchExamRoom")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body.student
        dbo.collection("Exams").find({}).toArray(function(err, result) {
            if (err) {
                res.sendStatus(404)
                console.log(result)
            } else {
                res.send(result)
            }
        })
    });
})



//ManageStudent
app.post("/main/manageUser/pageManageStudent", (req, res) => {
    console.log("pageManageStudent")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var user = {
            "username": req.body.username,
            "type": req.body.type,
        }
        console.log(user)
        dbo.collection("user").find(user).toArray(function(err, result) {
            if (err) {
                res.sendStatus(404)
                console.log(result)
            } else {
                console.log(result)
                if (result.length > 0) {
                    res.send(result)
                } else {
                    res.send('false')
                }
            }
        })
    });
})
app.post("/main/manageUser/pageAddStudent", (req, res) => {
    console.log("pageAddStudent")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var user = {
            "username": req.body.username,
            "type": req.body.type,
        }
        console.log(user)
        dbo.collection("user").find(user).toArray(function(err, result) {
            if (err) {
                res.sendStatus(404)
                console.log(result)
            } else {
                console.log(result)
                if (result.length > 0) {
                    res.send(result)
                } else {
                    res.send('false')
                }
            }
        })
    });
})
app.post("/main/manageUser/pageEditStudent", (req, res) => {
    console.log("pageEditStudent")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var user = {
            "username": req.body.username,
            "type": req.body.type,
        }
        console.log(user)
        dbo.collection("user").find(user).toArray(function(err, result) {
            if (err) {
                res.sendStatus(404)
                console.log(result)
            } else {
                console.log(result)
                if (result.length > 0) {
                    res.send(result)
                } else {
                    res.send('false')
                }
            }
        })
    });
})

//teacher
app.post("/main/manageUser/pageManageTeacher", (req, res) => {
    console.log("pageManageTeacher")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var user = {
            "username": req.body.username,
            "type": req.body.type,
        }
        console.log(user)
        dbo.collection("user").find(user).toArray(function(err, result) {
            if (err) {
                res.sendStatus(404)
                console.log(result)
            } else {
                console.log(result)
                if (result.length > 0) {
                    res.send(result)
                } else {
                    res.send('false')
                }
            }
        })
    });
})

app.post("/main/manageUser/pageManageStaff", (req, res) => {
    console.log("pageManageStaff")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var user = {
            "username": req.body.username,
            "type": req.body.type,
        }
        console.log(user)
        dbo.collection("user").find(user).toArray(function(err, result) {
            if (err) {
                res.sendStatus(404)
                console.log(result)
            } else {
                console.log(result)
                if (result.length > 0) {
                    res.send(result)
                } else {
                    res.send('false')
                }
            }
        })
    });
})

module.exports = app;