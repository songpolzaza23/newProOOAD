var check = 0;

function loadDataStaffs() {

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/loadDataStaffs",
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
                    cell1.innerHTML = '<td >' + customer[i].staff_ID + '</td>';
                    cell2.innerHTML = '<td >' + customer[i].firstName + '</td>';
                    cell3.innerHTML = '<td >' + customer[i].lastName + '</td>';
                    cell4.innerHTML = '<td >' + customer[i].position + '</td>';
                    cell5.innerHTML = '<td >' + customer[i].tel + '</td>';
                    cell6.innerHTML = '<td >' + customer[i].email + '</td>';
                    cell7.innerHTML = '<td >' + '<a href="./manageStaffEdit.html">' + '<button class="button" style="vertical-align:middle">' + '<span>' + 'Edit' + '</span>' + '</button>' + '</a>' + '<button class="button" style="vertical-align:middle">' + '<span>' + 'Delete' + '</span>' + '</button>' + '</td>';
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

function insertDataStaffs() {

    var staff_ID = document.getElementById("staff_ID").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var position = document.getElementById("position").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("email").value;

    if (staff_ID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (firstName == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (lastName == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (position == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (tel == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (email == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else {
        var data = {
            staff_ID: staff_ID,
            firstName: firstName,
            lastName: lastName,
            position: position,
            tel: tel,
            email: email
        }
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/api/insertDataStaffs",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) != 'false') {
                    alert("Insert Successful!")
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