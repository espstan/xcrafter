showAnswer = ( idBtnShow, idQuestion ) => {
  if ( document.getElementById( idQuestion ).style.color === 'black' ) {
    document.getElementById( idQuestion ).style.color = '#3254c9';
    document.getElementById( idBtnShow ).src = '/static/img/Question-close.svg'
  } else {
    document.getElementById( idQuestion ).style.color = 'black';
    document.getElementById( idBtnShow ).src = '/static/img/Question-show.svg'
  }
};
