function openRegistration() {
  document.getElementById( 'registration' ).style.display = 'block';
  document.getElementById( 'sing-in' ).style.display = 'none';
  document.getElementById( 'close' ).classList.add( 'open' );
  document.getElementById( 'close' ).classList.remove( 'close' );
  document.getElementById( 'open' ).classList.remove( 'open' );
  document.getElementById( 'open' ).classList.add( 'close' );
}

function openSingIn() {
  document.getElementById( 'registration' ).style.display = 'none';
  document.getElementById( 'sing-in' ).style.display = 'block';
  document.getElementById( 'open' ).classList.add( 'open' );
  document.getElementById( 'open' ).classList.remove( 'close' );
  document.getElementById( 'close' ).classList.remove( 'open' );
  document.getElementById( 'close' ).classList.add( 'close' );
}
