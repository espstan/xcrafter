function openRecoveryPassword() {
  document.getElementById( 'recovery-form' ).style.display = 'block';
  document.getElementById( 'recovery-title' ).style.display = 'block';
  document.getElementById( 'sign-up' ).style.display = 'none';
  document.getElementById( 'sign-in' ).style.display = 'none';
  document.getElementById( 'singin-title' ).style.display = 'none';
  document.getElementById( 'singup-title' ).style.display = 'none';
}

function openSingUp() {
  document.getElementById( 'sign-up' ).style.display = 'block';
  document.getElementById( 'sign-in' ).style.display = 'none';
  document.getElementById( 'singup-title"' ).classList.add( 'visible-login-title' );
  document.getElementById( 'singin-title"' ).classList.remove( 'visible-login-title' );
}

function openSignIn() {
  document.getElementById( 'sign-up' ).style.display = 'none';
  document.getElementById( 'sign-in' ).style.display = 'block';
  document.getElementById( 'singin-title"' ).classList.add( 'visible-login-title' );
  document.getElementById( 'singup-title"' ).classList.remove( 'visible-login-title' );
}
