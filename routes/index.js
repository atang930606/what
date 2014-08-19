var express 	= require('express');
var router 		= express.Router();
var query       = require('../util/query');

/* GET home page. */
// Show all usernames and allow users to enter their own username
// as well as select from list and add to cookies
router.get('/', function(req, res) {
	query.getUserNames(req,res);
});

// Render main page with all QUESTIONS on left bar
// blank answer since no question selected yet
// questions will show + button if answering (id to question tag)
// given: one or multiple user_ids
// return: all qid
router.get('/main', function(req, res) {
	query.getQuestions(req, res);
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
