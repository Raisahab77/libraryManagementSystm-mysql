const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    // database:"library",
    multipleStatements: true
  });


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

qur = `CREATE DATABASE IF NOT EXISTS library; USE library ;CREATE TABLE IF NOT EXISTS books(book_id int PRIMARY KEY,author varchar(20) NOT NULL,book_name varchar(20) NOT NULL,price int NOT NULL);`
// try{
    con.query(qur, function (err, result) {
        if (err) throw err;
        console.log("Table Created Successfully !!");
    });
// }
// catch{
//     console.log("Table already exists");
// }


app.get('/',function(req,res){
    res.sendFile(__dirname+"/addBook.html")
    // res.send("no file to display");
    
    
})


app.post('/',function(req,res){
    res.redirect('/')
    bookid = req.body.book_id;
    author = req.body.author;
    bookname = req.body.book_name;
    bookprice = req.body.book_price;
    qur = `INSERT INTO books(book_id,author,book_name,price) VALUES(${bookid},"${author}","${bookname}",${bookprice})`
    con.query(qur, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
    // console.log(req.body)
    
})

app.get('/delete',function(req,res){
    res.sendFile(__dirname+"/delete.html")
    // res.send(__dirname+"/delete.html")
})
app.post('/delete',function(req,res){
    book_id = req.body.book_id;
    qur = `DELETE FROM books WHERE book_id = ${book_id}`
    con.query(qur,function(err,result){
        if (err) throw err;
    })
    res.redirect('/delete')
})


app.listen(3000);






//This is incomplete app. It only perfrom insert operation we can create a table and insert some data only.