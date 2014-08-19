USE what_db;
INSERT INTO users(user_name, password) VALUES('alex', '123456');
INSERT INTO users(user_name, password) VALUES('brandon', '123456');
INSERT INTO users(user_name, password) VALUES('cheerio', '123456');
INSERT INTO questions(question_text, user_id) VALUES('Why is the sky?', '1');
INSERT INTO questions(question_text, user_id) VALUES('Why is the ground?', '1');
INSERT INTO questions(question_text, user_id) VALUES('Why is the sea?', '2');
INSERT INTO answers(answer_text, question_id, user_id) VALUES ('The sky? I dont know.', '1', '1');
INSERT INTO answers(answer_text, question_id, user_id) VALUES ('The ground? I dont know.', '2', '1');
INSERT INTO answers(answer_text, question_id, user_id) VALUES ('The sea? I dont know.', '3', '1');


