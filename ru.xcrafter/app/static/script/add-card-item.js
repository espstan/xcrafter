function addItemInCatalog(event) {
    event.preventDefault();
    const input = document.getElementsByClassName('input-add-card-item');
    let product = {};
    for (let i of input) {
        product[i.name] = i.value;
    }
    const productJSON = JSON.stringify(product);
    fetch('/api/addCardItemInCatalog', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: productJSON
    })
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function(data){
        console.log('Request succeeded with JSON response', data);
        window.location.href = '/profile/productCatalog';
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}