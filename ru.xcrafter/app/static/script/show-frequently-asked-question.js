showAnswer = (idAnswer, idQuestion, idBtnShow) => {
  if (document.getElementById(idAnswer).style.display === 'none') {
    document.getElementById(idAnswer).style.display = 'block';
    document.getElementById(idQuestion).style.color = '#3254c9';
    document.getElementById(idBtnShow).src = '../static/img/Question-close.svg'

  }
  else {
    document.getElementById(idAnswer).style.display = 'none';
    document.getElementById(idQuestion).style.color = 'black';
    document.getElementById(idBtnShow).src = '../static/img/Question-show.svg'
  }
};
