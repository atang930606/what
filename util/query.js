
var mysql 		= require('mysql');
var connection  = 
		mysql.createConnection({
			host: 		'127.0.0.1',
			port: 		'3306',
			user: 		'development',
			password: 	'123456',
			database: 	'what_db'
		});

module.exports.getIndex = function(next){
	var usernames = [];
	var query = connection.query('SELECT * FROM users', function(err, results){
		if(err)
			console.error(err);
		results.forEach(function(row){
			usernames.push(row);
		});
		next(usernames);
	});
}

module.exports.getMain = function(usernames, next){
	var questions = [];

	for(var cond = "", i = 0; i < usernames.length - 1; cond += 'user_name = ',
													    cond += connection.escape(usernames[i]),
													    cond += ' OR ', i++);
	var last = 'user_name = ' + connection.escape(usernames[usernames.length - 1]);

	cond += last;

	var userids_sql = "SELECT * "+
					  "FROM questions " +
					  "WHERE questions.user_id IN (SELECT user_id " +
					   							   "FROM users " +
					   							   "WHERE " + cond + ');';

	var query = connection.query(userids_sql, function(err, results){
		if(err)
			console.error(err);
		results.forEach(function(row){
			questions.push({'question_id': row.question_id, 'question_text': row.question_text, 'answer_id': row.answer_id});
			
		});
		next(questions);
	});
}

module.exports.getQuestions = function(usernames, next){
	var questions = [];

	for(var cond = "", i = 0; i < usernames.length - 1; cond += 'user_name = ',
													   cond += connection.escape(usernames[i]),
													   cond += ' OR ', i++);
	var last = 'user_name = ' + connection.escape(usernames[usernames.length - 1]);

	cond += last;

	var userids_sql = "SELECT * "+
					  "FROM questions " +
					  "WHERE questions.user_id IN (SELECT user_id " +
					   							   "FROM users " +
					   							   "WHERE " + cond + ');';

	var query = connection.query(userids_sql, function(err, results){
		if(err)
			console.error(err);
		results.forEach(function(row){
			questions.push({'question_id': row.question_id, 'question_text': row.question_text, 'answer_id': row.answer_id});
			
		});		
		next(questions);
	});	
}



module.exports.getUsernames = function(next){
	var usernames = [];
	var query = connection.query('SELECT * FROM users', function(err, results){
		if(err)
			console.error(err);

		results.forEach(function(row){
			usernames.push(row);
		});
		next(usernames);
	});
	
}

module.exports.getAnswerByQid = function(question_id, next){
	var sql_query = 'SELECT * FROM answers WHERE question_id = ' + connection.escape(question_id);
	var answer = [];
	var query = connection.query(sql_query, function(err, result){
		if(err){
			console.error(err);
		}
		result.forEach(function(record){
			answer.push(record);
		});
		return next(answer);
	});
}

module.exports.postQuestion = function(question_text, username, next){

	var sql_insert = 'INSERT INTO questions(question_text, user_id) ' +
					 'VALUES (' + connection.escape(question_text) +
					 ', (SELECT user_id ' + 
					    'FROM users ' +
					  	'WHERE user_name = ' + connection.escape(username) +'));';

	var query = connection.query(sql_insert, function(err){
		if(err)
			console.error(err);
		next();
	});	
}

module.exports.postAnswer = function(question_id, answer_text, username, next){
	var sql_insert = 'INSERT INTO answers(question_id, answer_text, user_id) ' +
					 'VALUES (' + connection.escape(question_id) +
					 ', ' + connection.escape(answer_text) +	
					 ', (SELECT user_id ' + 
					    'FROM users ' +
					  	'WHERE user_name = ' + connection.escape(username) +'));';
	var query = connection.query(sql_insert, function(err){
		if(err)
			console.error(err);
		next();
	});
}










