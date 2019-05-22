var check = 0;
var keep = "";
var array = []

function loadDataBuilding() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/loadDataBuilding",
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
                    cell1.innerHTML = '<td >' + customer[i].ID_Building + '</td>';
                    cell2.innerHTML = '<td >' + customer[i].nameBuilding + '</td>';
                    cell3.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="selectDataUpdateBuilding()">' + '<span>' + 'Edit' + '</span>' + '</button>' + '</td>';
                    cell4.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="deleteToTableBuilding()">' + '<span>' + 'Delete' + '</span>' + '</button>' + '</td>';
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

function insertDataBuilding() {

    var ID_Building = document.getElementById("ID_Building").value;
    var nameBuilding = document.getElementById("nameBuilding").value;
    var room_ID = [];

    if (ID_Building == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (nameBuilding == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {
        var data = {
            ID_Building: ID_Building,
            nameBuilding: nameBuilding,
            room_ID: room_ID
        }
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/insertDataBuilding",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("Insert Successful!")
                    window.location.href = "/main/manageBuliding/manageBuliding.html";
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

function selectDataUpdateBuilding() {
    array = [];
    var table = document.getElementById("listTable"),
        rIndex;
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 2; j++) {
                array.push(this.cells[j].innerHTML)
            }
            console.log(array[0])
            alert("เข้าหน้าบันทึกแก้ไขข้อมูล")
            window.location.href = "/main/manageBuliding/manageBulidingEdit.html?" + array[0];
        }
    }
}

function initBuilding() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    var ID_Building = location.search.substring(1);
    console.log(ID_Building)
    var data = {
        ID_Building: ID_Building
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initBuilding",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            console.log(customer[0].ID_Building)
            if (JSON.stringify(customer) != 'false') {
                alert("init Successful!")
                document.getElementById("ID_Building").value = customer[0].ID_Building;
                document.getElementById("nameBuilding").value = customer[0].nameBuilding;
            } else {
                alert("inti Incorrect!");

            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function updateBuilding() {
    var path = location.search.substring(1);
    var ID_Building = document.getElementById("ID_Building").value;
    var nameBuilding = document.getElementById("nameBuilding").value;

    if (ID_Building == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (nameBuilding == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {
        var data = {
            path: path,
            ID_Building: ID_Building,
            nameBuilding: nameBuilding
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/updateBuilding",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("updateStudent Successful!")
                    window.location.href = "/main/manageBuliding/manageBuliding.html";
                } else {
                    alert("updateStudent Incorrect!");

                }
            },
            error: function(e) {
                console.log("ERROR: ", e);
            }
        });
    }
}

function deleteToTableBuilding() {
    array = [];
    var table = document.getElementById("listTable"),
        rIndex;
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 2; j++) {
                array.push(this.cells[j].innerHTML)
            }
            alert("ลบข้อมูลที่ต้องการลบ")
            var data = {
                ID_Building: array[0]
            }
            console.log(data)
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8000/api/deleteToTableBuilding",
                data: JSON.stringify(data),
                dataType: 'json',
                success: function(customer) {
                    var result = JSON.stringify(customer);
                    console.log(result);
                    if (JSON.stringify(customer) != 'false') {
                        alert("deleteToTable Successful!")
                        window.location.href = "/main/manageBuliding/manageBuliding.html";
                    } else {
                        alert("deleteToTable Incorrect!");
                    }
                },
                error: function(e) {
                    console.log("ERROR: ", e);
                }
            });
        }
    }
}