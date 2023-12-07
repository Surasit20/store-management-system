const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
var CronJob = require('cron').CronJob;

const MailerService = require("./src/service/mailer.js")
//const compression = require('compression');
//const Logger = require('./src/utils/logger.js');

//const logger = new Logger();
//const config = require('../config/appconfig.js');

// // Add mysql database connection
// const db = mysql.createPool({
//   host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
//   user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
//   password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
//   database: 'l' // : mysql_db
// })


//app.use(compression());
// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('db', require('./src/models/index.js'));
app.use((req, res, next) => {
	//req.identifier = uuid();
	//const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
	//logger.log(logString, 'info');
	next();
});

app.use(require('./src/router'));

app.use((req, res, next) => {
	//logger.log('the url you are trying to reach is not hosted on our server', 'error');
	//const err = new Error('Not Found');
	//err.status = 404;
	res.status(404).json({ type: 'error', message: 'the url you are trying to reach is not hosted on our server' });
	next(err);
});

// // home page
// app.get('/', (req, res) => {
//    res.send('Hi There')
// });

// // get all of the books in the database
//  app.get('/get', (req, res) => {
//    const SelectQuery = " SELECT * FROM  books_reviews";
//    db.query(SelectQuery, (err, result) => {
//      res.send(result)
//    })
//  })

// // add a book to the database
// app.post("/insert", (req, res) => {
//   const bookName = req.body.setBookName;
//   const bookReview = req.body.setReview;
//   const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
//   db.query(InsertQuery, [bookName, bookReview], (err, result) => {
//     console.log(result)
//   })
// })

// // delete a book from the database
// app.delete("/delete/:bookId", (req, res) => {
//   const bookId = req.params.bookId;
//   const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
//   db.query(DeleteQuery, bookId, (err, result) => {
//     if (err) console.log(err);
//   })
// })

// // update a book review
// app.put("/update/:bookId", (req, res) => {
//   const bookReview = req.body.reviewUpdate;
//   const bookId = req.params.bookId;
//   const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
//   db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
//     sf (err) console.log(err)
//   })
// })


var job = new CronJob(
    '0 1 * * *',
    async function () {
		await MailerService(app);
        console.log('You will see this message every second');
    },
    null,
    true,
    'Asia/Bangkok'
);
app.listen('3001', () => { })