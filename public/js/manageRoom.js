var check = 0;
var keep = "";
var array = []

function loadDataRooms() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/loadDataRooms",
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer.length);
            console.log(result);
            if (JSON.stringify(customer) != 'false') {
                alert("Load Successful!")
                for (var i = 0; i < customer.length; i++) {
                    var table = document.getElementById("listTable");
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    cell1.innerHTML = '<td >' + customer[i].room_ID + '</td>';
                    cell2.innerHTML = '<td >' + customer[i].ID_Building + '</td>';
                    cell3.innerHTML = '<td >' + customer[i].nameBuilding + '</td>';
                    cell4.innerHTML = '<td >' + customer[i].sumaryTable + '</td>';
                    cell5.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="selectDataUpdateRoom()">' + '<span>' + 'Edit' + '</span>' + '</button>' + '</td>';
                    cell6.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="deleteToTableRoom()">' + '<span>' + 'Delete' + '</span>' + '</button>' + '</td>';
                    check = check + 1;
                }
            } else {
                alert("Load Incorrect!");
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function initRoom() {

    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initRoom",
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            console.log(customer[0].ID_Building)
            if (JSON.stringify(customer) != 'false') {
                alert("init Successful!")
                var x = document.getElementById("ID_Building");
                for (var i = 0; i < customer.length; i++) {
                    var option = document.createElement("option");
                    option.text = customer[i].ID_Building + " " + customer[i].nameBuilding;
                    x.add(option);
                }
            } else {
                alert("inti Incorrect!");
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function insertDataRoom() {

    var query = document.getElementById("ID_Building").value
    var dataText = query.split(" ")
    $('#userText').text(dataText[0] + ": " + dataText[1])

    var ar1 = dataText[0]
    var ar2 = dataText[1]

    var ID_Building = ar1
    var nameBuilding = ar2

    console.log(dataText)

    var room_ID = document.getElementById("room_ID").value;
    var row = document.getElementById("row").value;
    var column = document.getElementById("column").value;
    var sumaryTable = row * column;
    var numberOfTable = [];

    for (var i = 1; i <= column; i++) {
        for (var j = 1; j <= row; j++) {
            if (i == 1) {
                numberOfTable.push("A" + j)
            } else if (i == 2) {
                numberOfTable.push("C" + j)
            } else if (i == 3) {
                numberOfTable.push("D" + j)
            } else if (i == 4) {
                numberOfTable.push("E" + j)
            } else if (i == 5) {
                numberOfTable.push("F" + j)
            } else if (i == 6) {
                numberOfTable.push("G" + j)
            } else if (i == 7) {
                numberOfTable.push("H" + j)
            } else if (i == 8) {
                numberOfTable.push("I" + j)
            } else if (i == 9) {
                numberOfTable.push("J" + j)
            } else if (i == 10) {
                numberOfTable.push("K" + j)
            }
        }
    }

    if (ID_Building == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (nameBuilding == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (room_ID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (row == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (column == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {
        var data = {
            ID_Building: ID_Building,
            nameBuilding: nameBuilding,
            room_ID: room_ID,
            row: row,
            column: column,
            sumaryTable: sumaryTable,
            numberOfTable: numberOfTable
        }
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/insertDataRoom",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("Insert Successful!")
                        // window.location.
                    window.location.href = "/main/manageRoom/manaageRoom.html"
                } else {
                    alert("Insert Incorrect!");
                }
            },
            error: function(e) {
                console.log("ERROR: ", e);
            }
        });
    }
}

function selectDataUpdateRoom() {
    array = [];
    var table = document.getElementById("listTable"),
        rIndex;
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 4; j++) {
                array.push(this.cells[j].innerHTML)
            }
            console.log(array[0])
            alert("เข้าหน้าบันทึกแก้ไขข้อมูล")
            window.location.href = "/main/manageRoom/manaageRoomEdit.html?" + array[0];
        }
    }
}

function initRoom() {
    var room_ID = location.search.substring(1);
    console.log(room_ID)
    var data = {
        room_ID: room_ID
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initDataRoom",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            if (JSON.stringify(customer) != 'false') {
                alert("init Successful!")
                var x = document.getElementById("ID_Building");
                for (var i = 0; i < customer[1].length; i++) {
                    var option = document.createElement("option");
                    option.text = customer[1][i].ID_Building + " " + customer[1][i].nameBuilding;
                    x.add(option);
                }
                document.getElementById("room_ID").value = customer[0][0].room_ID;
                document.getElementById("row").value = customer[0][0].row;
                document.getElementById("column").value = customer[0][0].column;
            } else {
                alert("inti Incorrect!");

            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function initRoomAdd() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initRoomAdd",
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            if (JSON.stringify(customer) != 'false') {
                alert("init Successful!")
                var x = document.getElementById("ID_Building");
                for (var i = 0; i < customer.length; i++) {
                    var option = document.createElement("option");
                    option.text = customer[i].ID_Building + " " + customer[i].nameBuilding;
                    x.add(option);
                }
            } else {
                alert("inti Incorrect!");

            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function updateRoom() {

    var path = location.search.substring(1);

    var query = document.getElementById("ID_Building").value
    var dataText = query.split(" ")
    $('#userText').text(dataText[0] + ": " + dataText[1])

    var ar1 = dataText[0]
    var ar2 = dataText[1]

    var ID_Building = ar1
    var nameBuilding = ar2

    console.log(dataText)

    var room_ID = document.getElementById("room_ID").value;
    var row = document.getElementById("row").value;
    var column = document.getElementById("column").value;
    var sumaryTable = row * column;
    var numberOfTable = [];

    for (var i = 1; i <= column; i++) {
        for (var j = 1; j <= row; j++) {
            if (i == 1) {
                numberOfTable.push("A" + j)
            } else if (i == 2) {
                numberOfTable.push("C" + j)
            } else if (i == 3) {
                numberOfTable.push("D" + j)
            } else if (i == 4) {
                numberOfTable.push("E" + j)
            } else if (i == 5) {
                numberOfTable.push("F" + j)
            } else if (i == 6) {
                numberOfTable.push("G" + j)
            } else if (i == 7) {
                numberOfTable.push("H" + j)
            } else if (i == 8) {
                numberOfTable.push("I" + j)
            } else if (i == 9) {
                numberOfTable.push("J" + j)
            } else if (i == 10) {
                numberOfTable.push("K" + j)
            }
        }
    }
    if (ID_Building == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (nameBuilding == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (room_ID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (row == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (column == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {

        var data = {
            path: path,
            ID_Building: ID_Building,
            nameBuilding: nameBuilding,
            room_ID: room_ID,
            row: row,
            column: column,
            sumaryTable: sumaryTable,
            numberOfTable: numberOfTable
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/updateRoom",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("updateRoom Successful!")
                    window.location.href = "/main/manageRoom/manaageRoom.html"
                } else {
                    alert("updateRoom Incorrect!");

                }
            },
            error: function(e) {
                console.log("ERROR: ", e);
            }
        });
    }
}

function deleteToTableRoom() {
    array = [];
    var table = document.getElementById("listTable"),
        rIndex;
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 5; j++) {
                array.push(this.cells[j].innerHTML)
            }
            alert("ลบข้อมูลที่ต้องการลบ")
            var data = {
                room_ID: array[0]
            }
            console.log(data)
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8000/api/deleteToTableRoom",
                data: JSON.stringify(data),
                dataType: 'json',
                success: function(customer) {
                    var result = JSON.stringify(customer);
                    console.log(result);
                    if (JSON.stringify(customer) != 'false') {
                        alert("deleteToTableRoom Successful!")
                        window.location.href = "/main/manageRoom/manaageRoom.html"
                    } else {
                        alert("deleteToTableRoom Incorrect!");
                    }
                },
                error: function(e) {
                    console.log("ERROR: ", e);
                }
            });
        }
    }
}