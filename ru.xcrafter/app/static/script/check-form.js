function CustomValidation( input ) {
  this.invalidities = [];
  this.validityChecks = [];
  this.inputNode = input;
  this.registerListener();
}

let validationFormArray = [];

CustomValidation.prototype = {
  addInvalidity: function ( message ) {
    this.invalidities.push( message );
  },
  getInvalidities: function () {
    return this.invalidities.join( '. \n' );
  },
  checkValidity: function ( input ) {
    for ( let i = 0; i < this.validityChecks.length; i++ ) {
      const isInvalid = this.validityChecks[i].isInvalid( input );
      if ( isInvalid ) {
        this.addInvalidity( this.validityChecks[i].invalidityMessage );
      }
      const requirementElement = this.validityChecks[i].element;
      if ( requirementElement ) {
        if ( isInvalid ) {
          requirementElement.classList.add( 'invalid' );
          requirementElement.classList.remove( 'valid' );
        } else {
          requirementElement.classList.remove( 'invalid' );
          requirementElement.classList.add( 'valid' );
        }

      }
    }
  },
  checkInput: function () {
    this.inputNode.CustomValidation.invalidities = [];
    this.checkValidity( this.inputNode );

    if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
      this.inputNode.setCustomValidity( '' );
    } else {
      validationFormArray.push( "false" );
      let message = this.inputNode.CustomValidation.getInvalidities();
      this.inputNode.setCustomValidity( message );
    }
  },

  registerListener: function () {
    const CustomValidation = this;
    this.inputNode.addEventListener( 'keyup', function () {
      CustomValidation.checkInput();

    } );
  }
};

const userNameValidityChecks = [
  {
    isInvalid: function ( input ) {
      return input.value.length < 2;
    },
    invalidityMessage: 'Имя не должно быть короче 2 символов'
  }
];

const userSurnameValidityChecks = [
  {
    isInvalid: function ( input ) {
      return input.value.length < 2;
    },
    invalidityMessage: 'Фамилия не должна быть короче 2 символов'
  }
];

const userMailValidityChecks = [
  {
    isInvalid: function ( input ) {
      return !input.value.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ );
    },
    invalidityMessage: 'Введите корректный e-mail'
  }
];

const userPhoneValidityChecks = [
  {
    isInvalid: function ( input ) {
      return !input.value.match( /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ );
    },
    invalidityMessage: 'Введите корректный номер телефона'
  }
];

const passwordValidityChecks = [
  {
    isInvalid: function ( input ) {
      return input.value.length < 6 | input.value.length > 100 | !input.value.match( /[0-9]/g ) | !input.value.match( /[a-z]/g ) | !input.value.match( /[A-Z]/g );
    },
    invalidityMessage: 'Пароль должен содержать больше 6 символов, цифру, букву верхнего и нижнего регистра'
  }
];

const passwordRepeatValidityChecks = [
  {
    isInvalid: function () {
      return passwordRepeatInput.value != passwordInput.value;
    },
    invalidityMessage: 'Введенные пароли не совпадают'
  }
];

const userLoginValidityChecks = [
  {
    isInvalid: function ( input ) {
      return !input.value.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ );
    },
    invalidityMessage: 'Введите корректный e-mail'
  }
];

const recoveryPasswordValidityChecks = [
  {
    isInvalid: function ( input ) {
      return !input.value.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ );
    },
    invalidityMessage: 'Введите корректный e-mail'
  }
];

const userNameInput = document.getElementById( 'userName' );
const userSurnameInput = document.getElementById( 'userSurname' );
const userMailInput = document.getElementById( 'userMail' );
const userPhoneInput = document.getElementById( 'userPhone' );
const passwordInput = document.getElementById( 'password' );
const passwordRepeatInput = document.getElementById( 'repeatPassword' );
const userLoginInput = document.getElementById( 'user-login' );
const recoveryPasswordInput = document.getElementById( 'recovery-password' );

userNameInput.CustomValidation = new CustomValidation( userNameInput );
userNameInput.CustomValidation.validityChecks = userNameValidityChecks;

userSurnameInput.CustomValidation = new CustomValidation( userSurnameInput );
userSurnameInput.CustomValidation.validityChecks = userSurnameValidityChecks;

userMailInput.CustomValidation = new CustomValidation( userMailInput );
userMailInput.CustomValidation.validityChecks = userMailValidityChecks;

userPhoneInput.CustomValidation = new CustomValidation( userPhoneInput );
userPhoneInput.CustomValidation.validityChecks = userPhoneValidityChecks;

passwordInput.CustomValidation = new CustomValidation( passwordInput );
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

passwordRepeatInput.CustomValidation = new CustomValidation( passwordRepeatInput );
passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;

userLoginInput.CustomValidation = new CustomValidation( userLoginInput );
userLoginInput.CustomValidation.validityChecks = userLoginValidityChecks;

recoveryPasswordInput.CustomValidation = new CustomValidation( recoveryPasswordInput );
recoveryPasswordInput.CustomValidation.validityChecks = recoveryPasswordValidityChecks;


const inputs = document.querySelectorAll( 'input.form-item' );
const submit = document.querySelector( 'input.login-button' );
const form = document.getElementById( 'signup-form' );

const validate = () => {
  for ( let i = 0; i < 6; i++ ) {
    form.elements[i].CustomValidation.checkInput();
  }
};

submit.addEventListener( 'click', validate );
form.addEventListener( 'submit', validate );

const showPassword = ( button ) => {
  let password = document.getElementById( "password" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const showRepeatPassword = ( button ) => {
  let password = document.getElementById( "repeatPassword" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const showLoginPassword = ( button ) => {
  let password = document.getElementById( "password-signin" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const sendRegistration = ( e ) => {
  validationFormArray = [];
  e.preventDefault();
  const nameLength = document.getElementById( 'userName' );
  const surnameLength = document.getElementById( 'userSurname' );
  const emailLength = document.getElementById( 'userMail' );
  const phoneLength = document.getElementById( 'userPhone' );
  const passwordLength = document.getElementById( 'password' );
  const passwordRepeatLength = document.getElementById( 'repeatPassword' );
  const userAgreement = document.getElementById( 'agreement' );

  if ( (validationFormArray.length > 0) || (nameLength.value.length === 0) || (surnameLength.value.length === 0) || (emailLength.value.length === 0) || (phoneLength.value.length === 0) || (passwordLength.value.length === 0) || (passwordRepeatLength.value.length === 0) || (userAgreement.checked === false)) {
    console.log( validationFormArray );
    return;
  } else {
    fetch( '/api/registration', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        name: userName.value,
        surname: userSurname.value,
        email: userMail.value,
        phone: userPhone.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
        agreement: agreement.checked
      } )
    } ).then( function ( response ) {
      return response.json();
    } ).then( function ( data ) {
      alert( JSON.stringify( data ) )
    } ).catch( function ( err ) {
      alert( err )
    } );
  }
};
