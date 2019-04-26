function openRecoveryPassword() {
  document.getElementById( 'recovery-form' ).style.display = 'block';
  document.getElementById( 'recovery-title' ).style.display = 'block';
  document.getElementById( 'sign-up' ).style.display = 'none';
  document.getElementById( 'sign-in' ).style.display = 'none';
  document.getElementById( 'signin-title' ).style.display = 'none';
  document.getElementById( 'signup-title' ).style.display = 'none';
}

function openSingUp() {
  document.getElementById( 'sign-up' ).style.display = 'block';
  document.getElementById( 'sign-in' ).style.display = 'none';
  document.getElementById( 'signup-title' ).classList.add( 'visible-login-title' );
  document.getElementById( 'signin-title' ).classList.remove( 'visible-login-title' );
}

function openSignIn() {
  document.getElementById( 'sign-up' ).style.display = 'none';
  document.getElementById( 'sign-in' ).style.display = 'block';
  document.getElementById( 'signin-title' ).classList.add( 'visible-login-title' );
  document.getElementById( 'signup-title' ).classList.remove( 'visible-login-title' );
}
