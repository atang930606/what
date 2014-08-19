$(document).ready(function(){

	$('#login-button').click(function(){
		setGroupCookies();
	});

	$('.question').click(function(eventObject){
		setAnswer($(this));
	});

	$('.question-link').click(function(eventObject){
		appendLink($(this));
	});

	// Clear the question after it has been asked.
	$('#ask-question-button').click(function(eventObject){
		$('#question-text').text("");
	});



});

/*  Click listener for the #login-button.
 *  Set a cookie (username) for the selected #user-select username.
 *  Set a cookie (group) for the selected #group-select usernames.
 */
function setGroupCookies(){
		var username = $('#user-select option:selected').text();
		var jgroup   = $('$group-select option:selected');
		var group    = [];
		
		jgroup.forEach(function(opt){
			group.push(opt.text());
		});
		
		$.cookie("username", username);
		$.cookie("group", JSON.stringify(group));
}

/*  Click listener for each question.
 *  Will set the text in #answer to the answer if it exists, 
 *  otherwise hide #answer.
 *  param eventObject: The question that was clicked.
 */
function setAnswer(eventObject){
	var question_id = eventObject.attr("question_id");
		$.ajax({
			type: "GET",
			url:  "get-question-by-id",
			ajax: true,
			data: {"id" : question_id},
			success: function(data){
				$('#add-answer').css("visibility", "hidden");
				if(data == "null"){
					// TODO: hide #answer and show answer form
					
				}else{
					// TODO: show #answer
					$('#answer').text(data);	
				}
				
			}
		});
}

/* Click listener for the question-link button which will append
 * an @[question_id] to the text in the answer form for link to
 * the associated question to see.
 */
function appendLink(eventObject){
	var current_text = $('#answer-form').val();
	current_text.concat("@" + String(eventObject.attr("question_id")));
	$('#answer-form').val(current_text);
}
















