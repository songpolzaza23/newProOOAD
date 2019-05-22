const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/loadDataBuilding", (req, res) => {
    console.log("loadDataBuilding")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Building").find({}).toArray((err, result) => {
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

app.post("/api/insertDataBuilding", (req, res) => {
    console.log("insertDataBuilding")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Building").find({ ID_Building: data.ID_Building }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                console.log(result)
                if (result == "") {
                    var newvalues = { ID_Building: data.ID_Building, nameBuilding: data.nameBuilding, room_ID: data.room_ID };
                    dbo.collection("Building").insertOne(newvalues, function(err, result) {
                        if (err) throw err;
                        console.log("1 insert! Building");
                    });
                }
                res.send('true')
            }
        })
    });
})

app.post("/api/updateBuilding", (req, res) => {
    console.log("updateBuilding")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Building").find({ ID_Building: data.path }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                var data2 = result[0]._id
                var newvalues = { $set: { ID_Building: data.ID_Building, nameBuilding: data.nameBuilding } };
                dbo.collection("Building").updateOne({ _id: data2 }, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                    res.send('true')
                });
            }
        })
    });
})

app.post("/api/initBuilding", (req, res) => {
    console.log("initBuilding")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body.ID_Building
        console.log(data)
        dbo.collection("Building").find({ ID_Building: data }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                res.send(result)
                console.log(result)
            }
        })
    });
})

app.post("/api/deleteToTableBuilding", (req, res) => {
    console.log("deleteToTableBuilding")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Building").deleteOne({ ID_Building: data.ID_Building }, function(err, result) {
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