const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";

app.use(bodyParser.json());
app.post("/login", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var user = {
            "username": req.body.username,
            "password": req.body.password,
        }
        var infoResult = {
            "username": "",
            "firstName": "",
            "lastName": "",
            "type": "",
            "year": "2562"
        }
        console.log(user)
        dbo.collection("Users").find(user).toArray(function(err, resultUser) {
            if (err) {
                res.sendStatus(404)
                console.log(resultUser)
            } else {
                console.log(resultUser)

                infoResult.username = resultUser[0].username
                infoResult.type = resultUser[0].type

                if (resultUser[0].type == 'Student') {
                    dbo.collection("Students").find({ "student_ID": resultUser[0].username }).toArray(function(err, result) {
                        if (err) {
                            res.sendStatus(404)
                            console.log(result)
                        } else {
                            console.log(result)

                            if (result.length > 0) {
                                infoResult.firstName = result[0].firstName
                                infoResult.lastName = result[0].lastName
                                res.send(infoResult)
                            } else {
                                res.send('false')
                            }
                        }
                    })
                } else if (resultUser[0].type == 'Teacher') {
                    dbo.collection("Teachers").find({ "teacher_ID": resultUser[0].username }).toArray(function(err, result) {
                        if (err) {
                            res.sendStatus(404)
                            console.log(result)
                        } else {
                            console.log(result)

                            if (result.length > 0) {
                                infoResult.firstName = result[0].firstName
                                infoResult.lastName = result[0].lastName
                                res.send(infoResult)
                            } else {
                                res.send('false')
                            }
                        }
                    })
                } else if (resultUser[0].type == 'Staff') {
                    dbo.collection("Staffs").find({ "staff_ID": resultUser[0].username }).toArray(function(err, result) {
                        if (err) {
                            res.sendStatus(404)
                            console.log(result)
                        } else {
                            console.log(result)

                            if (result.length > 0) {
                                infoResult.firstName = result[0].firstName
                                infoResult.lastName = result[0].lastName
                                res.send(infoResult)
                            } else {
                                res.send('false')
                            }
                        }
                    })
                } else if (resultUser[0].type == 'Admin') {
                    res.send(infoResult)
                } else {
                    if (result.length > 0) {
                        res.send(result)
                    } else {
                        res.send('false')
                    }
                }
            }
        })
    });
})
module.exports = app;