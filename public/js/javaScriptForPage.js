// Open and close the sidebar on medium and small screens
var check = 0;

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// Change style of top container on scroll
window.onscroll = function() {
    myFunction()
};

function myFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("myTop").classList.add("w3-card-4", "w3-animate-opacity");
        document.getElementById("myIntro").classList.add("w3-show-inline-block");
    } else {
        document.getElementById("myIntro").classList.remove("w3-show-inline-block");
        document.getElementById("myTop").classList.remove("w3-card-4", "w3-animate-opacity");
    }
}

// Accordions
function myAccordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme";
    } else {
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-theme", "");
    }
}
//ตัดเอาข้อมูลมาใช้
var username = ""
var type = ""

function setuser() {
    var query = location.search.substring(1);
    var dataText = query.split("%20")
    username = dataText[0]
    type = dataText[1]
    console.log(dataText)
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
}

function initShowExam() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    var data = {
        student: window.localStorage.getItem("user")
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/initShowExam",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(customer.length);
            if (JSON.stringify(customer) != 'false') {
                alert("initShowExam Successful!")
                for (var i = 0; i < customer.length; i++) {
                    console.log(customer[i].seat.length)
                    var countSeat = customer[i].seat.length
                    for (var j = 0; j < countSeat; j++) {
                        var x = customer[i].seat[j].split(" ")[0];
                        if (x == window.localStorage.getItem("user")) {
                            for (var i = 0; i < customer.length; i++) {
                                var table = document.getElementById("listTable");
                                var row = table.insertRow(-1);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell4 = row.insertCell(3);
                                var cell5 = row.insertCell(4);
                                var cell6 = row.insertCell(5);
                                cell1.innerHTML = '<td >' + customer[i].course.split(" ")[0] + '</td>';
                                cell2.innerHTML = '<td >' + customer[i].course.split(" ")[1] + '</td>';
                                cell3.innerHTML = '<td >' + customer[i].room_ID + '</td>';
                                cell4.innerHTML = '<td >' + customer[i].seat[j].split(" ")[1] + '</td>';
                                cell5.innerHTML = '<td >' + customer[i].date + '</td>';
                                cell6.innerHTML = '<td >' + customer[i].timeStart + '</td>';
                                check = check + 1;
                            }
                        }
                    }
                }
            } else {
                alert("initShowExam Incorrect!");
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function loadDataSearchExamRoom() {
    document.getElementById("userUI").innerHTML = window.localStorage.getItem("user");
    document.getElementById("typeUI").innerHTML = window.localStorage.getItem("type");
    document.getElementById("yearUI").innerHTML = window.localStorage.getItem("year");
    var data = {
        student: window.localStorage.getItem("user")
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/api/loadDataSearchExamRoom",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(customer);
            if (JSON.stringify(customer) != 'false') {
                alert("initShowExam Successful!")
                for (var i = 0; i < customer.length; i++) {
                    for (var j = 0; j < customer[i].staff.length; j++) {
                        var x = customer[i].staff[j].split(" ")[0];
                        console.log(x)
                        if (x == window.localStorage.getItem("firstName")) {
                            for (var i = 0; i < customer.length; i++) {
                                var table = document.getElementById("listTable");
                                var row = table.insertRow(-1);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell5 = row.insertCell(3);
                                var cell6 = row.insertCell(4);
                                cell1.innerHTML = '<td >' + customer[i].course.split(" ")[0] + '</td>';
                                cell2.innerHTML = '<td >' + customer[i].course.split(" ")[1] + '</td>';
                                cell3.innerHTML = '<td >' + customer[i].room_ID.split(" ")[0] + '</td>';
                                cell5.innerHTML = '<td >' + customer[i].date + '</td>';
                                cell6.innerHTML = '<td >' + customer[i].timeStart + '</td>';
                                check = check + 1;
                            }
                        }
                    }
                }
            } else {
                alert("initShowExam Incorrect!");
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}