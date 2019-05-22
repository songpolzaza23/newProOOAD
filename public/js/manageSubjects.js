var check = 0;
var keep = "";
var array = [];
var arrayInit = [];

function loadDataSubjects() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/loadDataSubjects",
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




                    cell1.innerHTML = '<td >' + customer[i].subjectID + '</td>';
                    cell2.innerHTML = '<td >' + customer[i].nameSubject + '</td>';
                    cell3.innerHTML = '<td >' + customer[i].numSuject + '</td>';




                    cell4.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="selectDataUpdateSubject()">' + '<span>' + 'Edit' + '</span>' + '</button>' + '</td>';
                    cell5.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="deleteToTable()">' + '<span>' + 'Delete' + '</span>' + '</button>' + '</td>';
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

function insertDataSubjects() {

    var subjectID = document.getElementById("subjectID").value;
    var nameSubject = document.getElementById("nameSubject").value;
    var numSuject = document.getElementById("numSuject").value;





    if (subjectID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (nameSubject == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (numSuject == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")








    } else {
        var data = {
            subjectID: subjectID,
            nameSubject: nameSubject,
            numSuject: numSuject,




        }
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/insertDataSubjects",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("Insert Successful!")
                    window.location.href = "/main/manageSubject/manageSubject.html";
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

function initSubject() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    var subjectID = location.search.substring(1);
    console.log(subjectID)
    var data = {
        subjectID: subjectID
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initSubjects",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            if (JSON.stringify(customer) != 'false') {
                alert("init Successful!")
                document.getElementById("subjectID").value = customer[0].subjectID
                document.getElementById("nameSubject").value = customer[0].nameSubject
                document.getElementById("numSuject").value = customer[0].numSuject




            } else {
                alert("inti Incorrect!");

            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function selectDataUpdateSubject() {
    array = [];
    var table = document.getElementById("listTable"),
        rIndex;
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 3; j++) {
                array.push(this.cells[j].innerHTML)
            }
            console.log(array[0])
            alert("เข้าหน้าบันทึกแก้ไขข้อมูล")
            window.location.href = "/main/manageSubject/manageSubjectEdit.html?" + array[0];
        }
    }
}

function deleteToTable() {
    array = [];
    var table = document.getElementById("listTable"),
        rIndex;
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 3; j++) {
                array.push(this.cells[j].innerHTML)
            }
            alert("ลบข้อมูลที่ต้องการลบ")
            var data = {
                subjectID: array[0]
            }
            console.log(data)
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8000/api/deleteToTableSubject",
                data: JSON.stringify(data),
                dataType: 'json',
                success: function(customer) {
                    var result = JSON.stringify(customer);
                    console.log(result);
                    if (JSON.stringify(customer) != 'false') {
                        alert("deleteToTable Successful!")
                        window.location.href = "/main/manageSubject/manageSubject.html";
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

function updateSubject() {
    var path = location.search.substring(1);
    var subjectID = document.getElementById("subjectID").value;
    var nameSubject = document.getElementById("nameSubject").value;
    var numSuject = document.getElementById("numSuject").value;



    if (subjectID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (nameSubject == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (numSuject == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {

        var data = {
            path: path,
            subjectID: subjectID,
            nameSubject: nameSubject,
            numSuject: numSuject,


        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/updateSubject",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("updateStudent Successful!")
                    window.location.href = "/main/manageSubject/manageSubject.html";
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