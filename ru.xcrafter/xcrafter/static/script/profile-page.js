const navToggle = document.querySelector( '.user-account-toggle' );
const userAccount = document.getElementById( 'user-account' )

navToggle.addEventListener( 'click', function () {
  if ( userAccount.classList.contains( 'user-account-closed' ) ) {
    userAccount.classList.remove( 'user-account-closed' );
    userAccount.classList.add( 'user-account-opened' );
  } else {
    userAccount.classList.add( 'user-account-closed' );
    userAccount.classList.remove( 'user-account-opened' );
  }
} );