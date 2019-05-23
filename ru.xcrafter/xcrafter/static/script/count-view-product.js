window.onload = function () {
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
    })
  }
};
