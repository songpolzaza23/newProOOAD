var array = []
var check = 0;

function table1_to_table2() {

    var getStaffToExam = document.getElementById("getStaffToExam")
    var pushStaffToExam = document.getElementById("pushStaffToExam")
    var checkBoxs = document.getElementsByName("check-table1")
    console.log(checkBoxs.length)
    for (var i = 0; i < checkBoxs.length; i++) {
        console.log(checkBoxs.length)
        if (checkBoxs[i].checked) {
            var newRow = pushStaffToExam.insertRow(pushStaffToExam.lenght),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2),
                cell4 = newRow.insertCell(3);

            cell1.innerHTML = '<input type="checkbox" name="check-table2">';
            cell2.innerHTML = getStaffToExam.rows[i + 1].cells[1].innerHTML;
            cell3.innerHTML = getStaffToExam.rows[i + 1].cells[2].innerHTML;
            cell4.innerHTML = getStaffToExam.rows[i + 1].cells[3].innerHTML;

            var index = getStaffToExam.rows[i + 1].rowIndex;
            getStaffToExam.deleteRow(index);
            i--;
        }
    }
}

function table2_to_table1() {
    var getStaffToExam = document.getElementById("getStaffToExam")
    var pushStaffToExam = document.getElementById("pushStaffToExam")
    var checkBoxs = document.getElementsByName("check-table2")
    console.log(checkBoxs.length)
    for (var i = 0; i < checkBoxs.length; i++) {
        console.log(checkBoxs.length)
        if (checkBoxs[i].checked) {
            var newRow = getStaffToExam.insertRow(getStaffToExam.lenght),
                cell2 = newRow.insertCell(0),
                cell3 = newRow.insertCell(1),
                cell4 = newRow.insertCell(2);

            cell2.innerHTML = pushStaffToExam.rows[i + 1].cells[0].innerHTML;
            cell3.innerHTML = pushStaffToExam.rows[i + 1].cells[1].innerHTML;
            cell4.innerHTML = pushStaffToExam.rows[i + 1].cells[2].innerHTML;

            var index = pushStaffToExam.rows[i + 1].rowIndex;
            pushStaffToExam.deleteRow(index);
            i--;
        }
    }
}

function table3_to_table4() {

    var getStudent = document.getElementById("getStudent")
    var pushStudent = document.getElementById("pushStudent")
    var checkBoxs = document.getElementsByName("check-table3")
    console.log(checkBoxs.length)
    for (var i = 0; i < checkBoxs.length; i++) {
        console.log(checkBoxs.length)
        if (checkBoxs[i].checked) {
            var newRow = pushStudent.insertRow(pushStudent.lenght),
                cell1 = newRow.insertCell(0);

            cell1.innerHTML = getStudent.rows[i + 1].cells[1].innerHTML;
            var index = getStudent.rows[i + 1].rowIndex;
            getStudent.deleteRow(index);
            i--;
        }
    }
}

function table4_to_table3() {
    var getStudent = document.getElementById("getStudent")
    var pushStudent = document.getElementById("pushStudent")
    var checkBoxs = document.getElementsByName("check-table4")
    console.log(checkBoxs.length)
    for (var i = 0; i < checkBoxs.length; i++) {
        console.log(checkBoxs.length)
        if (checkBoxs[i].checked) {
            var newRow = getStudent.insertRow(getStudent.lenght),
                cell1 = newRow.insertCell(0);

            cell1.innerHTML = pushStudent.rows[i + 1].cells[1].innerHTML;


            var index = pushStudent.rows[i + 1].rowIndex;
            pushStudent.deleteRow(index);
            i--;
        }
    }
}

function selectCourse() {
    var select = document.getElementById("courses").value;
    console.log(select)
    var data = {
        subjectID: select.split(" ")[0],
        nameSubject: select.split(" ")[1],
        group: select.split(" ")[3]
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/selectCourse",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result)
            if (JSON.stringify(customer) != 'false') {
                alert("Load Successful!")
                for (var i = 0; i < customer.length; i++) {
                    var table = document.getElementById("getStudent");
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);

                    cell1.innerHTML = '<td >' + customer[i] + '</td>';
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

function selectRoom() {
    var select = document.getElementById("rooms").value;
    console.log(select)
    var data = {
        room_ID: select.split(" ")[0]
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/selectRoom",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result)
            if (JSON.stringify(customer) != 'false') {
                alert("Load Successful!")
                for (var i = 0; i < customer.length; i++) {
                    var table = document.getElementById("pushStudent");
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);

                    cell1.innerHTML = '<td >' + customer[i] + '</td>';
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

function initDataToExam() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initDataToExam",
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer.length);
            console.log(result);
            if (JSON.stringify(customer) != 'false') {
                alert("Load Successful!")
                console.log(customer[1][0])
                var x1 = document.getElementById("courses");
                for (var i = 0; i < customer[0].length; i++) {
                    var option = document.createElement("option");
                    option.text = customer[0][i].subjectID + " " + customer[0][i].nameSubject + " กลุ่ม " + customer[0][i].group;
                    x1.add(option);
                }
                var x2 = document.getElementById("rooms");
                for (var i = 0; i < customer[1].length; i++) {
                    var option = document.createElement("option");
                    option.text = customer[1][i].room_ID + " จำนวนที่นั่ง: " + customer[1][i].sumaryTable;
                    x2.add(option);
                }
                for (var i = 0; i < customer[2].length; i++) {
                    var table = document.getElementById("getStaffToExam");
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);

                    cell1.innerHTML = '<td >' + '<input type="checkbox" name="check-table1">' + '</td>';
                    cell2.innerHTML = '<td >' + customer[2][i].teacher_ID + '</td>';
                    cell3.innerHTML = '<td >' + customer[2][i].firstName + '</td>';
                    cell4.innerHTML = '<td >' + customer[2][i].lastName + '</td>';
                    check = check + 1;
                }
                for (var i = 0; i < customer[3].length; i++) {
                    var table = document.getElementById("getStaffToExam");
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);

                    cell1.innerHTML = '<td >' + '<input type="checkbox" name="check-table1">' + '</td>';
                    cell2.innerHTML = '<td >' + customer[3][i].staff_ID + '</td>';
                    cell3.innerHTML = '<td >' + customer[3][i].firstName + '</td>';
                    cell4.innerHTML = '<td >' + customer[3][i].lastName + '</td>';
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

function insertDataExam() {

    var course = document.getElementById("courses").value
    var room_ID = document.getElementById("rooms").value
    var date = document.getElementById("date").value
    var timeStart = document.getElementById("timeStart").value
    var timeEnd = document.getElementById("timeEnd").value
    var staff = []
    var seat = []

    var tableG = document.getElementById("getStudent")
    var tableP = document.getElementById("pushStudent")
    var tableST = document.getElementById("pushStaffToExam")


    for (var i = 1; i < tableG.rows.length; i++) {
        rIndex = this.rowIndex;
        seat.push(tableG.rows[i].cells[0].innerHTML + " " + tableP.rows[i].cells[0].innerHTML)
    }
    for (var i = 1; i < tableST.rows.length; i++) {
        rIndex = this.rowIndex;
        staff.push(tableST.rows[i].cells[2].innerHTML + " " + tableST.rows[i].cells[3].innerHTML)
    }

    var data = {
        course: course,
        room_ID: room_ID,
        date: date,
        timeStart: timeStart,
        timeEnd: timeEnd,
        staff: staff,
        seat: seat
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/insertDataExam",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            if (JSON.stringify(customer) != 'false') {
                alert("Insert Successful!")
                    // window.location.
                window.location.href = "/main/manageExam/manageExam.html"
            } else {
                alert("Insert Incorrect!");
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function LoadDataExam() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/LoadDataExam",
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result)
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
                    cell1.innerHTML = '<td >' + customer[i].course + '</td>';
                    cell2.innerHTML = '<td >' + customer[i].room_ID + '</td>';
                    cell3.innerHTML = '<td >' + customer[i].date + '</td>';
                    cell4.innerHTML = '<td >' + customer[i].timeStart + '</td>';
                    cell5.innerHTML = '<td >' + customer[i].timeEnd + '</td>';
                    cell6.innerHTML = '<td >' + customer[i].staff.length + '</td>';
                    cell7.innerHTML = '<td >' + customer[i].seat.length + '</td>';
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