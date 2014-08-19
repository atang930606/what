USE what_db;

DROP TABLE IF EXISTS answer_references 		CASCADE;
DROP TABLE IF EXISTS answers 				CASCADE;
DROP TABLE IF EXISTS questions 				CASCADE;
DROP TABLE IF EXISTS users 					CASCADE;

CREATE TABLE users
(
	user_id 			INT(10)			NOT NULL AUTO_INCREMENT,
	user_name		VARCHAR(20)			NOT NULL,
	password		VARCHAR(60)			NOT NULL,
	CONSTRAINT users_user_id_pk PRIMARY KEY (user_id),
	CONSTRAINT users_user_name_uc UNIQUE (user_name)
);

CREATE TABLE questions
(
	question_id			INT(10)			NOT NULL AUTO_INCREMENT,
	question_text		TEXT 			NOT NULL,
	user_id 			INT(10)			NOT NULL,
	last_modified		DATETIME		NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT questions_question_id_pk PRIMARY KEY (question_id)
);

CREATE TABLE answers
(
	answer_id 			INT(10)			NOT NULL AUTO_INCREMENT,
	answer_text			TEXT 			NOT NULL,
	question_id 		INT(10)			NOT NULL,
	user_id 			INT(10)			NOT NULL,
	last_modified		DATETIME		NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	CONSTRAINT answers_answer_id_pk PRIMARY KEY (answer_id),
	CONSTRAINT answers_question_id_pk FOREIGN KEY (question_id) REFERENCES questions(question_id),
	CONSTRAINT answers_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id)	
);

CREATE TABLE answer_references
(
	answer_ref_id		INT(10)			NOT NULL AUTO_INCREMENT,
	position			INT(10)			NOT NULL,
	answer_id 			INT(10)			NOT NULL,
	CONSTRAINT answer_references_answer_ref_id_pk PRIMARY KEY (answer_ref_id),
	CONSTRAINT answer_references_answer_id_fk FOREIGN KEY (answer_id) REFERENCES answers(answer_id)	
);







