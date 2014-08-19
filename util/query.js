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

module.exports.getQuestions = function(req, res){
	var url_parts = url.parse(req.url, true);
	var username = [];
	username.push(url_parts.query.username);

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
		results.forEach(function(row){
			questions.push({'question_id': row.question_id, 'question_text': row.question_text, 'answer_id': row.answer_id});
			
		});
		res.setHeader('Content-Type', 'text/html');
		res.render('main', {"questions" : questions})
		
	});
}

module.exports.getUserNames = function(req, res){
	var usernames = [];
	var query = connection.query('SELECT * FROM users', function(err, results){
		if(err)
			console.error(err);
		results.forEach(function(row){
			usernames.push(row);
		});
		res.render('index', {"usernames": usernames});
	});
	
}