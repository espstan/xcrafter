function CustomValidation( input ) {
  this.invalidities = [];
  this.validityChecks = [];
  this.inputNode = input;
  this.registerListener();
}

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

const agreementValidityChecks = [
  {
    isInvalid: function () {
      console.log(agreementInput)
      if (agreementInput.checked!==true) {
        console.log('ytnm');
      }
      else {
        console.log('kjhbkj');
      }
  }}
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
const passwordRepeatInput = document.getElementById( 'password-repeat' );
const agreementInput = document.getElementById( 'agreement' );
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

agreementInput.CustomValidation = new CustomValidation( agreementInput );
agreementInput.CustomValidation.validityChecks = agreementValidityChecks;

userLoginInput.CustomValidation = new CustomValidation( userLoginInput );
userLoginInput.CustomValidation.validityChecks = userLoginValidityChecks;

recoveryPasswordInput.CustomValidation = new CustomValidation( recoveryPasswordInput);
recoveryPasswordInput.CustomValidation.validityChecks = recoveryPasswordValidityChecks;


const inputs = document.querySelectorAll( 'input.form-item' );
const submit = document.querySelector( 'input.login-button' );
const form = document.getElementById( 'login-form' );

const validate = () => {
  form.elements.forEach( function ( item, i, form ) {
    form.elements[i].CustomValidation.checkInput();
  } );
};

submit.addEventListener( 'click', validate );
form.addEventListener( 'submit', validate );

const showPassword = ( button ) => {
  let password = document.getElementById( "password" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const showRepeatPassword = ( button ) => {
  let password = document.getElementById( "password-repeat" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const showLoginPassword = ( button ) => {
  let password = document.getElementById( "password-signin" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};
