window.onload = function () {
  try {
    if ( markerCardPage === true ) {

      fetch( 'URL', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            productId: location.pathname.split( '/' ).pop()
          }
        )
      } )
    }
  } catch (e) {
    return false;
  }
};
