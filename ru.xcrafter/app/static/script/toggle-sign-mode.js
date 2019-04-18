function openRegistration() {
  document.getElementById( 'sing-up' ).style.display = 'block';
  document.getElementById( 'sign-in' ).style.display = 'none';
  document.getElementById( 'close' ).classList.add( 'open' );
  document.getElementById( 'open' ).classList.remove( 'open' );
}

function openSignIn() {
  document.getElementById( 'sing-up' ).style.display = 'none';
  document.getElementById( 'sign-in' ).style.display = 'block';
  document.getElementById( 'open' ).classList.add( 'open' );
  document.getElementById( 'close' ).classList.remove( 'open' );
}