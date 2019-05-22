const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://admin:admin123@ds145669.mlab.com:45669/ooad";
app.use(bodyParser.json());

app.post("/api/loadDataRooms", (req, res) => {
    console.log("loadDataRooms")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Rooms").find({}).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                res.send(result)
                    // console.log(result)
            }
        })
    });
})

app.post("/api/initRoom", (req, res) => {
    console.log("initRoom")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Building").find({}).toArray((err, result) => {
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

app.post("/api/insertDataRoom", (req, res) => {
    console.log("insertDataRoom")
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
                console.log(result)
                if (result == "") {
                    var newvalues = { room_ID: data.room_ID, ID_Building: data.ID_Building, nameBuilding: data.nameBuilding, row: data.row, column: data.column, sumaryTable: data.sumaryTable, numberOfTable: data.numberOfTable };
                    dbo.collection("Rooms").insertOne(newvalues, function(err, result) {
                        if (err) throw err;
                        console.log("1 insert! Rooms");
                        var newvalues = { $set: { ID_Building: data.ID_Building, nameBuilding: data.nameBuilding, room_ID: [data.room_ID] } };
                        dbo.collection("Building").updateOne({ ID_Building: data.ID_Building }, newvalues, function(err, result) {
                            if (err) throw err;
                            console.log("1 document updated");
                        });
                    });
                }
                res.send('true')
            }
        })
    });
})

app.post("/api/initDataRoom", (req, res) => {
    console.log("initDataRoom")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body.room_ID
        console.log(data)
        var array = []
        dbo.collection("Rooms").find({ room_ID: data }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                array.push(result)
                console.log(result)
                dbo.collection("Building").find({}).toArray((err, result) => {
                    if (err) {
                        console.log('error')
                        res.status(404).send('false');
                    } else {
                        array.push(result)
                        console.log(result)
                        res.send(array)
                    }
                })
            }
        })
    });
})

app.post("/api/initRoomAdd", (req, res) => {
    console.log("initRoomAdd")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("Building").find({}).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                res.send(result)
            }
        })
    });
})

app.post("/api/updateRoom", (req, res) => {
    console.log("updateRoom")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Rooms").find({ room_ID: data.path }).toArray((err, result) => {
            if (err) {
                console.log('error')
                res.status(404).send('false');
            } else {
                var data2 = result[0]._id
                var newvalues = { $set: { room_ID: data.room_ID, ID_Building: data.ID_Building, nameBuilding: data.nameBuilding, row: data.row, column: data.column, sumaryTable: data.sumaryTable, numberOfTable: data.numberOfTable } };
                dbo.collection("Rooms").updateOne({ _id: data2 }, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                    res.send('true')
                });
            }
        })
    });
})

app.post("/api/deleteToTableRoom", (req, res) => {
    console.log("deleteToTableRoom")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = req.body
        console.log(data)
        dbo.collection("Rooms").deleteOne({ room_ID: data.room_ID }, function(err, result) {
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