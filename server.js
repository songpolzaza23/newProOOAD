const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var path = require('path');
// ตัวแปรที่จะใช้ดึงจาก route
var login = require('./route/RouteLogin')
var manageStudent = require('./route/manageUser/RouteManageStudents')
var manageTeacher = require('./route/manageUser/RouteManageTeachers')
var manageStaff = require('./route/manageUser/RouteManageStaffs')
var manageSubject = require('./route/RouteManageSubject')
var manageBuilding = require('./route/RouteManageBuilding')
var manageRoom = require('./route/RouteManageRoom')
var manageCourse = require('./route/RouteManageCourse')
var manageExam = require('./route/RouteManageExam')
var js = require('./route/RouteJavaScriptForPage')

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use แต่ละหน้า
app.use(login)
app.use(manageStudent)
app.use(manageTeacher)
app.use(manageStaff)
app.use(manageSubject)
app.use(manageBuilding)
app.use(manageRoom)
app.use(manageCourse)
app.use(manageExam)
app.use(js)


app.listen(process.env.PORT || 8000, () => {
    console.log('Start server at port 8000.')
})