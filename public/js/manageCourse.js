var check = 0;
var keep = "";
var array = []

function table1_to_table2() {

    var getListTable = document.getElementById("getListTable")
    var pushListTable = document.getElementById("pushListTable")
    var checkBoxs = document.getElementsByName("check-table1")
    console.log(checkBoxs.length)
    for (var i = 0; i < checkBoxs.length; i++) {
        console.log(checkBoxs.length)
        if (checkBoxs[i].checked) {
            var newRow = pushListTable.insertRow(pushListTable.lenght),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2),
                cell4 = newRow.insertCell(3),
                cell5 = newRow.insertCell(4);

            cell1.innerHTML = '<input type="checkbox" name="check-table2">';
            cell2.innerHTML = getListTable.rows[i + 1].cells[1].innerHTML;
            cell3.innerHTML = getListTable.rows[i + 1].cells[2].innerHTML;
            cell4.innerHTML = getListTable.rows[i + 1].cells[3].innerHTML;
            cell5.innerHTML = getListTable.rows[i + 1].cells[4].innerHTML;

            var index = getListTable.rows[i + 1].rowIndex;
            getListTable.deleteRow(index);
            i--;
        }
    }
}

function table2_to_table1() {
    var getListTable = document.getElementById("getListTable")
    var pushListTable = document.getElementById("pushListTable")
    var checkBoxs = document.getElementsByName("check-table2")
    console.log(checkBoxs.length)
    for (var i = 0; i < checkBoxs.length; i++) {
        console.log(checkBoxs.length)
        if (checkBoxs[i].checked) {
            var newRow = getListTable.insertRow(getListTable.lenght),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2),
                cell4 = newRow.insertCell(3),
                cell5 = newRow.insertCell(4);

            cell1.innerHTML = '<input type="checkbox" name="check-table1">';
            cell2.innerHTML = pushListTable.rows[i + 1].cells[1].innerHTML;
            cell3.innerHTML = pushListTable.rows[i + 1].cells[2].innerHTML;
            cell4.innerHTML = pushListTable.rows[i + 1].cells[3].innerHTML;
            cell5.innerHTML = pushListTable.rows[i + 1].cells[4].innerHTML;

            var index = pushListTable.rows[i + 1].rowIndex;
            pushListTable.deleteRow(index);
            i--;


        }
    }
}

function initCourseAdd() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initCourseAdd",
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            if (JSON.stringify(customer) != 'false') {
                alert("init Successful!")
                var x1 = document.getElementById("subjectID");
                for (var i = 0; i < customer[0].length; i++) {
                    var option = document.createElement("option");
                    option.text = customer[0][i].subjectID + " " + customer[0][i].nameSubject + " " + customer[0][i].numSuject;
                    x1.add(option);
                }
                var x2 = document.getElementById("year");
                for (var i = 0; i < customer[2].length; i++) {
                    var option = document.createElement("option");
                    option.text = customer[2][i].year + " " + "เทอม " + customer[2][i].term;
                    x2.add(option);
                }
                var x3 = document.getElementById("teacher_ID");
                for (var k = 0; k < customer[1].length; k++) {
                    var option = document.createElement("option");
                    option.text = customer[1][k].firstName + " " + customer[1][k].lastName;
                    x3.add(option);
                }
                for (var i = 0; i < customer[3].length; i++) {
                    var table = document.getElementById("getListTable");
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);

                    cell1.innerHTML = '<td >' + '<input type="checkbox" name="check-table1">' + '</td>';
                    cell2.innerHTML = '<td >' + customer[3][i].student_ID + '</td>';
                    cell3.innerHTML = '<td >' + customer[3][i].firstName + " " + customer[3][i].lastName + '</td>';
                    cell4.innerHTML = '<td >' + customer[3][i].facultry + '</td>';
                    cell5.innerHTML = '<td >' + customer[3][i].major + '</td>';
                    check = check + 1;
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

function loadDataCourse() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/loadDataCourse",
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
                    cell1.innerHTML = '<td >' + customer[i].subjectID + " " + customer[i].nameSubject + " หน่วยกิต " + customer[i].numSuject + '</td>';
                    cell2.innerHTML = '<td >' + customer[i].year + " เทอม " + customer[i].term + ' </td>';
                    cell3.innerHTML = '<td >' + customer[i].firstNameTeacher + " " + customer[i].lastNameTeacher + '</td>';
                    cell4.innerHTML = '<td >' + customer[i].group + '</td>';
                    cell5.innerHTML = '<td >' + customer[i].student_ID.length + '</td>';
                    cell6.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="selectDataUpdateCourse()">' + '<span>' + 'Edit' + '</span>' + '</button>' + '</td>';
                    cell7.innerHTML = '<td >' + '<button class="button" style="vertical-align:middle" onclick="deleteToTableCourse()">' + '<span>' + 'Delete' + '</span>' + '</button>' + '</td>';
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

function insertDataCourse() {
    var query1 = document.getElementById("subjectID").value
    var dataText1 = query1.split(" ")
    $('#userText').text(dataText1[0] + ": " + dataText1[1] + ": " + dataText1[2])

    var ar1 = dataText1[0]
    var ar2 = dataText1[1]
    var ar3 = dataText1[2]

    var subjectID = ar1
    var nameSubject = ar2
    var numSuject = ar3

    var query2 = document.getElementById("year").value
    var dataText2 = query2.split(" ")
    $('#userText').text(dataText2[0] + ": " + dataText2[1] + ": " + dataText2[2])

    var y1 = dataText2[0]
    var y2 = dataText2[2]

    var year = y1
    var term = y2

    var query3 = document.getElementById("teacher_ID").value
    var dataText3 = query3.split(" ")
    $('#userText').text(dataText3[0] + ": " + dataText3[1])

    var t1 = dataText3[0]
    var t2 = dataText3[1]

    var firstName = t1
    var lastName = t2

    var group = document.getElementById("group").value

    var student_ID = [];

    var tableLenght = document.getElementById("pushListTable")
    console.log(tableLenght.rows.length - 1)
    for (var i = 1; i < tableLenght.rows.length; i++) {
        rIndex = this.rowIndex;
        student_ID.push(tableLenght.rows[i].cells[1].innerHTML)
    }

    if (subjectID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (year == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (teacher_ID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (group == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {
        var data = {
            subjectID: subjectID,
            nameSubject: nameSubject,
            numSuject: numSuject,
            year: year,
            term: term,
            firstName: firstName,
            lastName: lastName,
            group: group,
            student_ID: student_ID

        }
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/insertDataCourse",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("Insert Successful!")
                        // window.location.
                    window.location.href = "/main/manageCourse/manageCourse.html"
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

function updateCourse() {
    var query1 = document.getElementById("subjectID").value
    var dataText1 = query1.split(" ")
    $('#userText').text(dataText1[0] + ": " + dataText1[1] + ": " + dataText1[2])

    var ar1 = dataText1[0]
    var ar2 = dataText1[1]
    var ar3 = dataText1[2]

    var subjectID = ar1
    var nameSubject = ar2
    var numSuject = ar3

    var query2 = document.getElementById("year").value
    var dataText2 = query2.split(" ")
    $('#userText').text(dataText2[0] + ": " + dataText2[1] + ": " + dataText2[2])

    var y1 = dataText2[0]
    var y2 = dataText2[2]

    var year = y1
    var term = y2

    var query3 = document.getElementById("teacher_ID").value
    var dataText3 = query3.split(" ")
    $('#userText').text(dataText3[0] + ": " + dataText3[1])

    var t1 = dataText3[0]
    var t2 = dataText3[1]

    var firstName = t1
    var lastName = t2

    var group = document.getElementById("group").value

    var student_ID = [];

    var tableLenght = document.getElementById("pushListTable")
    console.log(tableLenght.rows.length - 1)
    for (var i = 1; i < tableLenght.rows.length; i++) {
        rIndex = this.rowIndex;
        student_ID.push(tableLenght.rows[i].cells[1].innerHTML)
    }

    if (subjectID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (year == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (teacher_ID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (group == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {
        var sl = location.search.substring(1);
        var data = {
            path: sl,
            subjectID: subjectID,
            nameSubject: nameSubject,
            numSuject: numSuject,
            year: year,
            term: term,
            firstName: firstName,
            lastName: lastName,
            group: group,
            student_ID: student_ID

        }
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/updateCourse",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("updateCourse Successful!")
                        // window.location.
                    window.location.href = "/main/manageCourse/manageCourse.html"
                } else {
                    alert("updateCourse Incorrect!");
                }
            },
            error: function(e) {
                console.log("ERROR: ", e);
            }
        });
    }
}

function selectDataUpdateCourse() {
    array = [];
    var table = document.getElementById("listTable")
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 4; j++) {
                array.push(this.cells[j].innerHTML)
            }
            console.log(array[0])
            alert("เข้าหน้าบันทึกแก้ไขข้อมูล")
            window.location.href = "/main/manageCourse/manageCourseEdit.html?" + array[0].split(" ", 1)[0] + " " + array[1].split(" ", 3)[0] + " " + array[1].split(" ", 3)[2] + " " + array[3];
        }
    }
}

function deleteToTableCourse() {
    array = [];
    var table = document.getElementById("listTable")
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            for (var j = 0; j < 5; j++) {
                array.push(this.cells[j].innerHTML)
            }
            alert("ลบข้อมูลที่ต้องการลบ")
            var data = {
                subjectID: array[0].split(" ", 1)[0],
                year: array[1].split(" ", 3)[0],
                term: array[1].split(" ", 3)[2],
                group: array[3]
            }
            console.log(data)
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8000/api/deleteToTableCourse",
                data: JSON.stringify(data),
                dataType: 'json',
                success: function(customer) {
                    var result = JSON.stringify(customer);
                    console.log(result);
                    if (JSON.stringify(customer) != 'false') {
                        alert("deleteToTable Successful!")
                        window.location.href = "/main/manageCourse/manageCourse.html"
                            // window.location.href = "/main/manageBuliding/manageBuliding.html";
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