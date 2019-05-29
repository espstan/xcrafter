const sendChangePassword = ( ) => {

  fetch( 'URL', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      userQuestion: userQuestion.value
    } )
  } ).then( function ( response ) {
    return response.json();
  } ).then( function ( data ) {
    alert( JSON.stringify( data ) )
  } ).catch( function ( err ) {
    alert( err )
  } )
};
