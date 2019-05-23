showAnswer = ( questionNumber ) => {
  const questionIndex = questionNumber - 1;
  const elem = $( "button.question-title:eq(" + questionIndex + ")" );
  const questionsBlock = document.getElementById( 'frequently-asked-question' );
  const buttonOpenAnswer = questionsBlock.getElementsByTagName( 'img' )[questionIndex];

  if ( elem.css( 'color' ) === 'rgb(0, 0, 0)' ) {
    elem.css( "color", "#3254c9" );
    buttonOpenAnswer.src = '/static/img/question_close.svg';
  } else {
    elem.css( "color", "black" );
    buttonOpenAnswer.src = '/static/img/question_show.svg';
  }
};
