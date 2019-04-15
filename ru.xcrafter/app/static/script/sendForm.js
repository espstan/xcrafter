function sendForm( e, form ) {
  e.preventDefault();

  fetch( 'URL', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify( {name: form.firstName.value, surname: form.secondName.value, email: form.email.value, phone: form.phone.value, password: form.password.value, repeatPassword: form.repeatPassword.value} )
  } ).then( function ( response ) {
    return response.json();
  } ).then( function ( data ) {
    alert( JSON.stringify( data ) )
  } ).catch( function ( err ) {
    alert( err )
  } );
}