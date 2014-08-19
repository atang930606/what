var express 	= require('express');
var router 		= express.Router();
var url 		= require('url');
var mysql 		= require('mysql');
var connection  = 
		mysql.createConnection({
			host: 		'127.0.0.1',
			port: 		'3306',
			user: 		'development',
			password: 	'123456',
			database: 	'what_db'
		});

/* GET home page. */
// Show all usernames and allow users to enter their own username
// as well as select from list and add to cookies
router.get('/', function(req, res) {
  connection.query("rawsql", function(err, rows){
  	var usernames = rows;
  	res.render('index', { "usernames" : usernames  });	
  });
});

// Render main page with all QUESTIONS on left bar
// blank answer since no question selected yet
// questions will show + button if answering (id to question tag)
// given: one or multiple user_ids
// return: all qid
router.get('/main', function(req, res) {
	// url encoded usernames list and own username to fetch qs
	res.render('main', {"questions" : questions})
});


// =================== API ===================
// Return all questions in JSON format based on cookies
router.get('get-questions', function(req, res) {

});

// Return answer matching question in JSON format
// Indicate if it exists or not
router.get('get-answer', function(req, res) {

});

// Return all registered usernames in JSON format
router.get('get-usernames', function(req, res) {

});

// Insert question into the database
// { question: " text " }
router.post('post-question', function(req, res) {

});

// Insert answer into the database
// { question-id : " ", "answer-text" : " " }
router.post('post-answer', function(req, res) {

});

module.exports = router;
