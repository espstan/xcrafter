const sendUserQuestion = ( ) => {

  fetch( '/getanswerthequestion', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      userQuestion: userQuestion.value,
      userEmail: unregisteredUserEmail1.value,
      categoryOfQuestion: categoryOfQuestion.value
    } )
  } ).then( function ( response ) {
    return response.json();
  } )
};
