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

const changePasswordValidityChecks = [
  {
    isInvalid: function ( input ) {
      return input.value.length < 6 | input.value.length > 100 | !input.value.match( /[0-9]/g ) | !input.value.match( /[a-z]/g ) | !input.value.match( /[A-Z]/g );
    },
    errorMessage: 'Пароль должен содержать больше 6 символов, цифру, букву верхнего и нижнего регистра'
  }
];

const changePasswordRepeatValidityChecks = [
  {
    isInvalid: function () {
      return changePasswordInput.value != changePasswordRepeatInput.value;
    },
    errorMessage: 'Введенные пароли не совпадают'
  }
];

const changePasswordRepeatInput = document.getElementById( 'password-change-repeat' );
const changePasswordInput = document.getElementById( 'password-change' );


changePasswordRepeatInput.CustomValidation = new CustomValidation( changePasswordRepeatInput );
changePasswordRepeatInput.CustomValidation.validityChecks = changePasswordRepeatValidityChecks;

changePasswordInput.CustomValidation = new CustomValidation( changePasswordInput );
changePasswordInput.CustomValidation.validityChecks = changePasswordValidityChecks;


const submit = document.querySelector( 'input.change-button' );
const form = document.getElementById( 'form-change' );

const validate = () => {
  form.elements.map(element => element.CustomValidation.checkInput())
};

submit.addEventListener( 'click', validate );
form.addEventListener( 'submit', validate );


const sendChangePassword = ( e ) => {
  validationFormArray = [];
  e.preventDefault();
  const changePasswordValue = document.getElementById( 'password-change' ).value;
  const changePasswordRepeatValue = document.getElementById( 'password-change-repeat' ).value;

  if ( validationFormArray.length > 0 || changePasswordValue.length === 0 || changePasswordRepeatValue.length === 0 ) {
    return;
  } else {
    fetch( '/reset-password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        changePassword: changePasswordInput.value
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

const showChangePassword = ( button ) => {
  let password = document.getElementById( "password-change" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};

const showChangeRepeatPassword = ( button ) => {
  let password = document.getElementById( "password-change-repeat" );
  password.type === "password" ? password.type = "text" : password.type = "password"
};
