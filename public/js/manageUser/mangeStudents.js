var check = 0;
var keep = "";
var array = [];
var arrayInit = [];

function loadDataStudents() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/loadDataStudents",
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
                    var cell7 = row.insertCell(6);
                    var cell8 = row.insertCell(7);
                    var cell9 = row.insertCell(8);
                    cell1.innerHTML = '<td >' + customer[i].student_ID + '</td>';
                    cell2.innerHTML = '<td >' + customer[i].firstName + '</td>';
                    cell3.innerHTML = '<td >' + customer[i].lastName + '</td>';
                    cell4.innerHTML = '<td >' + customer[i].facultry + '</td>';
                    cell5.innerHTML = '<td >' + customer[i].major + '</td>';
                    cell6.innerHTML = '<td >' + customer[i].tel + '</td>';
                    cell7.innerHTML = '<td >' + customer[i].email + '</td>';
                    cell8.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="selectDataUpdateStudent()">' + '<span>' + 'Edit' + '</span>' + '</button>' + '</td>';
                    cell9.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="deleteToTable()">' + '<span>' + 'Delete' + '</span>' + '</button>' + '</td>';
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

function insertDataStudents() {

    var student_ID = document.getElementById("student_ID").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var facultry = document.getElementById("facultry").value;
    var major = document.getElementById("major").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("email").value;

    if (student_ID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (firstName == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (lastName == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (facultry == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (major == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (tel == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (email == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {
        var data = {
            student_ID: student_ID,
            firstName: firstName,
            lastName: lastName,
            facultry: facultry,
            major: major,
            tel: tel,
            email: email
        }
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/insertDataStudents",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("Insert Successful!")
                    window.location.href = "/main/manageUsers/manageStudent/manageStudent.html";
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

function initStudent() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    var student_ID = location.search.substring(1);
    console.log(student_ID)
    var data = {
        student_ID: student_ID
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initStudents",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            if (JSON.stringify(customer) != 'false') {
                alert("init Successful!")
                document.getElementById("student_ID").value = customer[0].student_ID
                document.getElementById("firstName").value = customer[0].firstName
                document.getElementById("lastName").value = customer[0].lastName
                document.getElementById("facultry").value = customer[0].facultry
                document.getElementById("major").value = customer[0].major
                document.getElementById("tel").value = customer[0].tel
                document.getElementById("email").value = customer[0].email
            } else {
                alert("inti Incorrect!");

            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function selectDataUpdateStudent() {
    array = [];
    var table = document.getElementById("listTable"),
        rIndex;
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 7; j++) {
                array.push(this.cells[j].innerHTML)
            }
            console.log(array[0])
            alert("เข้าหน้าบันทึกแก้ไขข้อมูล")
            window.location.href = "/main/manageUsers/manageStudent/manageStudentEdit.html?" + array[0];
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
            for (var j = 0; j < 7; j++) {
                array.push(this.cells[j].innerHTML)
            }
            alert("ลบข้อมูลที่ต้องการลบ")
            var data = {
                student_ID: array[0]
            }
            console.log(data)
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8000/api/deleteToTableStudent",
                data: JSON.stringify(data),
                dataType: 'json',
                success: function(customer) {
                    var result = JSON.stringify(customer);
                    console.log(result);
                    if (JSON.stringify(customer) != 'false') {
                        alert("deleteToTable Successful!")
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

function updateStudent() {

    var path = location.search.substring(1);
    var student_ID = document.getElementById("student_ID").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var facultry = document.getElementById("facultry").value;
    var major = document.getElementById("major").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("email").value;

    if (student_ID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (firstName == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (lastName == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (facultry == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (major == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (tel == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (email == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {
        var data = {
            path: path,
            student_ID: student_ID,
            firstName: firstName,
            lastName: lastName,
            facultry: facultry,
            major: major,
            tel: tel,
            email: email
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/updateStudent",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("updateStudent Successful!")
                    window.location.href = "/main/manageUsers/manageStudent/manageStudent.html";
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