showAnswer = ( questionNumber ) => {
  const questionIndex = questionNumber - 1;
  const answerToQuestion = $( "div.collapse:eq(" + questionIndex + ")" );
  const questionTitle = $( "button.question-title:eq(" + questionIndex + ")" );
  const questionsBlock = document.getElementById( 'frequently-asked-question' );
  const buttonOpenAnswer = questionsBlock.getElementsByTagName( 'img' )[questionIndex];

  if ( answerToQuestion.hasClass( "show-answer" ) ) {
    questionTitle.css( "color", "black" );
    buttonOpenAnswer.src = '/static/img/question_show.svg';
    answerToQuestion.removeClass( "show-answer" );
  } else {
    questionTitle.css( "color", "#3254c9" );
    buttonOpenAnswer.src = '/static/img/question_close.svg';
    answerToQuestion.addClass( "show-answer" );
  }
};
