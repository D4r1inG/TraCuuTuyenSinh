const express = require('express');
const mysql = require('mysql')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const connection = mysql.createConnection({
    host: "localhost",
    user: "userdemo",
    password: "1",
    database: "studentlist"
})

connection.connect(function (err) {
    (err) ? console.log(err) : console.log(connection)
})

app.get('/api/getStudentList', (req, res) => {
    var sql = "SELECT * FROM `mylist`"
    connection.query(sql, function (err, result) {
        if (err) throw err
        res.json({ data: result })
    })
})

app.post('/api/insert', function (req, res) {
    var sql = "INSERT "
        + "INTO mylist(`stt`, `truongTieuHoc`, `quanHuyen`, `maHocSinh`, `lop`, `hoVaTen`, `ngay`, `thang`, `nam`, `gioiTinh`, `noiSinh`, `danToc`, `hoKhau`, `dienThoai`, `diem1`, `diem2`, `diem3`, `diem4`, `diem5`, `tongDiem`, `diemUuTien`, `tongDiemSoTuyen`, `ghiChu`) "
        + "VALUES('"
        + req.body.stt + "','"
        + req.body.truongTieuHoc + "','"
        + req.body.quanHuyen + "','"
        + req.body.maHocSinh + "','"
        + req.body.lop + "','"
        + req.body.hoVaTen + "','"
        + req.body.ngay + "','"
        + req.body.thang + "','"
        + req.body.nam + "','"
        + req.body.gioiTinh + "','"
        + req.body.noiSinh + "','"
        + req.body.danToc + "','"
        + req.body.hoKhau + "','"
        + req.body.dienThoai + "','"
        + req.body.diem1 + "','"
        + req.body.diem2 + "','"
        + req.body.diem3 + "','"
        + req.body.diem4 + "','"
        + req.body.diem5 + "','"
        + req.body.tongDiem + "','"
        + req.body.diemUuTien + "','"
        + req.body.tongDiemSoTuyen + "','"
        + req.body.ghiChu + "')";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.json({ data: results });
    });
});

app.delete('/api/delete', function (req, res) {
    var sql = "DELETE FROM `mylist`"
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.json({ data: results });
    });
})

app.post('/api/deleteUser', function (req, res) {
    var sql = "DELETE FROM mylist "
    + "WHERE maHocSinh='"+req.body.maHocSinh+"'";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.json({ data: results });
    });
})

app.listen(4000, () => {
    console.log("App listen on port 4000")
})

