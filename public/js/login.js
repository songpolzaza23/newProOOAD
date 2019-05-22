function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || password == "") {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        document.getElementById("password").focus();
        return;
    }
    console.log(username + " " + password);
    var data = {
        username: username,
        password: password
    };
    console.log(data)

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8000/login",
        data: JSON.stringify(data),
        dataType: "json",
        success: function(customer) {
            console.log(customer);
            if (customer != "") {
                alert("Login Successful!");
                alert(customer.username);

                //send local username
                window.localStorage.setItem("user", customer.username)
                window.localStorage.setItem("type", customer.type)
                window.localStorage.setItem("year", customer.year)
                window.localStorage.setItem("firstName", customer.firstName)
                console.log(window.localStorage.getItem("firstName"))


                if (customer.type == "Student") {
                    window.location = "./../../mainStudents/indexStudent.html?";
                } else if (customer.type == "Teacher") {
                    window.location = "./../../mainTeachear/indexTeacher.html?";
                } else if (customer.type == "Admin") {
                    window.location = "./../../main/index.html?";
                } else {
                    window.location = "./../../mainTeachear/indexTeacher.html?";
                }
            } else {
                alert("Login Incorrect!");
                document.getElementById("username").focus();
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}