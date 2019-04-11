function validate( form, name, surname, mail, phone, password, passwordRepeat ) {
  let nameValue = document.forms[form].elements[name].value;
  let surnameValue = document.forms[form].elements[surname].value;
  let emailRegular = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let emailValue = document.forms[form].elements[mail].value;
  let phoneRegular = /^\d[\d\(\)\ -]{4,14}\d$/;
  let phoneValue = document.forms[form].elements[phone].value;
  let passwordValue = document.forms[form].elements[password].value;
  let passwordRepeatValue = document.forms[form].elements[passwordRepeat].value;
  let passwordRegular = /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/;

  if ( nameValue.length < 2 ) {
    $( 'input' ).get( 0 ).setCustomValidity( 'Имя не должно быть короче 2 символов' );
    return false;
  }

  if ( surnameValue.length < 2 ) {
    $( 'input' ).get( 1 ).setCustomValidity( 'Фамилия не должна быть короче 2 символов' );
    return false;
  }

  if ( emailRegular.test( emailValue ) === false ) {
    $( 'input' ).get( 2 ).setCustomValidity( 'Введите корректный e-mail' );
    return false;
  }

  if ( phoneRegular.test( phoneValue ) === false ) {
    $( 'input' ).get( 3 ).setCustomValidity( 'Введите корректный номер телефона' );
    return false;
  }

  if ( passwordValue.length < 8 ) {
    $( 'input' ).get( 4 ).setCustomValidity( 'Пароль должен содержать больше 8 символов' );
    return false;
  }

  if ( passwordRegular.test( passwordValue ) === false ) {
    $( 'input' ).get( 4 ).setCustomValidity( 'В пароле должны содержаться цифра, латинские буквы верхнего и нижнего регистра' );
    return false;
  }

  if ( passwordValue !== passwordRepeatValue ) {
    $( 'input' ).get( 5 ).setCustomValidity( 'Введенные пароли не совпадают' );
    return false;
  }
}

function showPassword( button ) {
  var password = document.getElementById( "password" );
  if ( password.type == "password" ) {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function showRepeatPassword( button ) {
  var password = document.getElementById( "passwordRepeat" );
  if ( password.type == "password" ) {
    password.type = "text";
  } else {
    password.type = "password";
  }
}



