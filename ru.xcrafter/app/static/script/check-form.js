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
        this.addInvalidity( this.validityChecks[i].errorMessage );
      }
      const requirementElement = this.validityChecks[i].element;
      if ( requirementElement ) {
        if ( isInvalid ) {
          requirementElement.classList.add( 'invalid' );
        } else {
          requirementElement.classList.remove( 'invalid' );
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
    errorMessage: 'Имя не должно быть короче 2 символов'
  }
];

const userSurnameValidityChecks = [
  {
    isInvalid: function ( input ) {
      return input.value.length < 2;
    },
    errorMessage: 'Фамилия не должна быть короче 2 символов'
  }
];

const userMailValidityChecks = [
  {
    isInvalid: function ( input ) {
      return !input.value.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ );
    },
    errorMessage: 'Введите корректный e-mail'
  }
];

const userPhoneValidityChecks = [
  {
    isInvalid: function ( input ) {
      return !input.value.match( /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ );
    },
    errorMessage: 'Введите корректный номер телефона'
  }
];

const passwordValidityChecks = [
  {
    isInvalid: function ( input ) {
      return input.value.length < 6 | input.value.length > 100 | !input.value.match( /[0-9]/g ) | !input.value.match( /[a-z]/g ) | !input.value.match( /[A-Z]/g );
    },
    errorMessage: 'Пароль должен содержать больше 6 символов, цифру, букву верхнего и нижнего регистра'
  }
];

const passwordRepeatValidityChecks = [
  {
    isInvalid: function () {
      return passwordRepeatInput.value != passwordInput.value;
    },
    errorMessage: 'Введенные пароли не совпадают'
  }
];

const userLoginValidityChecks = [
  {
    isInvalid: function ( input ) {
      return !input.value.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ );
    },
    errorMessage: 'Введите корректный e-mail'
  }
];

const recoveryPasswordValidityChecks = [
  {
    isInvalid: function ( input ) {
      return !input.value.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ );
    },
    errorMessage: 'Введите корректный e-mail'
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


const submit = document.querySelector( 'input.login-button' );
const form = document.getElementById( 'signup-form' );

const validate = () => {
  for ( let i = 0; i < form.elements.length; i++ ) {
    if (form.elements[i].classList.contains('check-input') === true) {
      form.elements[i].CustomValidation.checkInput();
    }
  }
};

submit.addEventListener( 'click', validate );
form.addEventListener( 'submit', validate );

const showPassword = ( button ) => {
  let password = document.getElementById( "password" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const showChangePassword = ( button ) => {
  let password = document.getElementById( "repeatPassword" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const showChangeRepeatPassword = ( button ) => {
  let password = document.getElementById( "password-signin" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const sendChangePassword = ( e ) => {
  validationFormArray = [];
  e.preventDefault();
  const name = document.getElementById( 'userName' ).value;
  const surname = document.getElementById( 'userSurname' ).value;
  const email = document.getElementById( 'userMail' ).value;
  const phone = document.getElementById( 'userPhone' ).value;
  const password = document.getElementById( 'password' );
  const passwordRepeat = document.getElementById( 'repeatPassword' ).value;
  const userAgreement = document.getElementById( 'agreement' ).value;

  if ( validationFormArray.length > 0 || name.length === 0 || surname.length === 0 || email.length === 0 || phone.length === 0 || password.length === 0 || passwordRepeat.length === 0 || userAgreement.checked === false) {
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
      if (response.ok) {
        const signupForm = document.getElementById('login-form');
        const modalOverlay = document.getElementById('modal-overlay');
        signupForm.classList.toggle('closed');
        modalOverlay.classList.toggle('closed');
        document.body.style.overflow = '';
      }
      return response.json();
    } ).then( function ( data ) {
    } ).catch( function ( err ) {
    } );
  }
};
