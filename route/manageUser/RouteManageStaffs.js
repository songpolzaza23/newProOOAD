const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/loadDataStaffs", (req, res) => {
    console.log("loadDataStaffs")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Staffs").find({}).toArray((err, result) => {
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

app.post("/api/insertDataStaffs", (req, res) => {
    console.log("insertDataStaffs")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Staffs").find({ staff_ID: data.staff_ID }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                if (result == "") {
                    var newvalues = { staff_ID: data.staff_ID, firstName: data.firstName, lastName: data.lastName, position: data.position, tel: data.tel, email: data.email };
                    dbo.collection("Staffs").insertOne(newvalues, function(err, result) {
                        if (err) throw err;
                        console.log("1 insert! Staffs");
                        var newvalues2 = { username: data.staff_ID, password: data.lastName, type: "Staff", person_id: data.staff_ID };
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

app.post("/api/initStaffs", (req, res) => {
    console.log("initStaffs")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body.staff_ID
        console.log(data)
        dbo.collection("Staffs").find({ staff_ID: data }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                res.send(result)
            }
        })
    });
})

app.post("/api/updateStaff", (req, res) => {
    console.log("updateStaff")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Staffs").find({ staff_ID: data.path }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                var data2 = result[0]._id
                var newvalues = { $set: { staff_ID: data.staff_ID, firstName: data.firstName, lastName: data.lastName, position: data.position, tel: data.tel, email: data.email } };
                dbo.collection("Staffs").updateOne({ _id: data2 }, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                    res.send('true')
                });
            }
        })
    });
})

app.post("/api/deleteToTableStaff", (req, res) => {
    console.log("deleteToTableStaff")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Staffs").deleteOne({ staff_ID: data.staff_ID }, function(err, result) {
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