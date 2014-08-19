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
	
	var url_parts = url.parse(req.url, true);
	var username = [];
	username.push(url_parts.query.username);
	console.log(url_parts.query.username);
	//var group = url_parts.query.group;
	// group.forEach(function(name){
	// 	username.push(name);
	// });
	var questions = [];

	for(var cond = "", i = 0; i < username.length - 1; cond += 'user_name = ',
													   cond += connection.escape(username[i]),
													   cond += ' OR ', i++);
	var last = 'user_name = ' + connection.escape(username[username.length - 1]);

	cond += last;

	var userids_sql = "SELECT * "+
					  "FROM questions " +
					  "WHERE questions.user_id IN (SELECT user_id " +
					   							   "FROM users " +
					   							   "WHERE " + cond + ');';
	console.log(userids_sql);
	var query = connection.query(userids_sql, function(err, results){
		if(err)
			console.error(err);
		console.log(results);
		results.forEach(function(row){
			questions.push({'question_id': row.question_id, 'question_text': row.question_text, 'answer_id': row.answer_id});
			
		});
		res.setHeader('Content-Type', 'text/html');
		res.render('main', {"questions" : questions})
		
	});
});


// =================== API ===================
// Return all questions in JSON format based on cookies
router.get('get-questions', function(req, res) {

});

// Return the answer associated with the url-encoded "id" (question_id).
// Return in the response body "null" if none exist.
router.get('get-question-by-id', function(req, res) {
	//return the question_text in the response body
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
