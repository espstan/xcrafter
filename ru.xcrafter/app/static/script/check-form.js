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
      return !input.value.match( /^\d[\d\(\)\ -]{4,14}\d$/ );
    },
    invalidityMessage: 'Введите корректный номер телефона'
  }
];

const passwordValidityChecks = [
  {
    isInvalid: function ( input ) {
      return input.value.length < 8 | input.value.length > 100;
    },
    invalidityMessage: 'Пароль должен содержать больше 8 символов'
  },
  {
    isInvalid: function ( input ) {
      return !input.value.match( /[0-9]/g );
    },
    invalidityMessage: 'Пароль должен содержать хотя бы одну цифру'
  },
  {
    isInvalid: function ( input ) {
      return !input.value.match( /[a-z]/g );
    },
    invalidityMessage: 'Пароль должен содержать буквы нижнего регистра'
  },
  {
    isInvalid: function ( input ) {
      return !input.value.match( /[A-Z]/g );
    },
    invalidityMessage: 'Пароль должен содержать буквы верхнего регистра'
  },
  {
    isInvalid: function ( input ) {
      return !input.value.match( /[\!\@\#\$\%\^\&\*]/g );
    },
    invalidityMessage: 'Пароль должен содержать хотя бы один спецсимвол'
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

const userNameInput = document.getElementById( 'userName' );
const userSurnameInput = document.getElementById( 'userSurname' );
const userMailInput = document.getElementById( 'userMail' );
const userPhoneInput = document.getElementById( 'userPhone' );
const passwordInput = document.getElementById( 'password' );
const passwordRepeatInput = document.getElementById( 'password_repeat' );

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


const inputs = document.querySelectorAll( 'input.form-item' );
const submit = document.querySelector( 'input.btn-registration' );
const form = document.getElementById( 'registration-form' );

function validate() {
  for ( let i = 0; i < form.elements.length; i++ ) {
    form.elements[i].CustomValidation.checkInput();
  }
}

submit.addEventListener( 'click', validate );
form.addEventListener( 'submit', validate );

function showPassword( button ) {
  let password = document.getElementById( "password" );
  (password.type == "password") ? password.type = "text" : password.type = "password"
}

function showRepeatPassword( button ) {
  let password = document.getElementById( "password_repeat" );
  (password.type == "password" ) ? password.type = "text" : password.type = "password"
}

