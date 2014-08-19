var express 	= require('express');
var router 		= express.Router();
var query       = require('../util/query');
var url 		= require('url');

/* GET home page. */
// Show all usernames and allow users to enter their own username
// as well as select from list and add to cookies
router.get('/', function(req, res) {
	query.getIndex(function(usernames){
		res.render('index', {"usernames": usernames});
	});
});

// Render main page with all QUESTIONS on left bar
// blank answer since no question selected yet
// questions will show + button if answering (id to question tag)
// given: session holder user_name and any groups
// return: all qid
router.get('/main', function(req, res) {
	var url_parts = url.parse(req.url, true);
	var usernames = [];
	usernames.push(url_parts.query.username);
	usernames.push(url_parts.query.group);

	query.getMain(usernames, function(questions){
		res.render('main', {"questions": questions})
	});
});


// =================== API ===================
// Return all questions in JSON format based on usernames from cookies
router.get('/get-questions', function(req, res) {
	var url_parts = url.parse(req.url, true);
	var usernames = [];
	usernames.push(url_parts.query.username);

	query.getQuestions(usernames, function(questions){
		res.setHeader('Content-Type', 'application/json');
		res.json(questions);
	});
});

// Return the answer associated with the url-encoded "id" (question_id).
// Return in the response body "null" if none exist.
router.get('/get-answer-by-qid', function(req, res) {
	//return the question_text in the response body
	var url_parts = url.parse(req.url, true);
	var question_id = url_parts.query.question_id;
	query.getAnswerByQid(question_id, function(answer_text){
		res.json(answer_text);
	});
});



// Return all registered usernames in JSON format
router.get('/get-usernames', function(req, res) {
	query.getUsernames(function(usernames){
		res.setHeader('Content-Type', 'application/json');
		res.json(usernames);
	});
});

// Insert question into the database
// { question_text: " question_text ", username: "user_name" }
router.post('/post-question', function(req, res) {
	var question_text = req.body.question_text;
	var username = req.body.username;

	query.postQuestion(question_text, username, function(){
		res.writeHead(200, {'Content-Type': 'text/event-stream'});
		res.end();
	});
});

// Insert answer into the database
// { question_id : " ", "answer_text" : " ", "username": " " }
router.post('/post-answer', function(req, res) {
	var question_id = req.body.question_id;
	var answer_text = req.body.answer_text;
	var username = req.body.username;

	query.postAnswer(question_id, answer_text, username, function(){
		res.writeHead(200, {'Content-Type': 'text/event-stream'});
		res.end();
	});
});

module.exports = router;
