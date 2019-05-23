function editCardItem(event, id) {
    event.preventDefault();
    console.log('test');
    const inputs = document.getElementsByClassName('input-edit-card-item');
    let result = {'id': id}
    for (let input of inputs) {
        result[input.name] = input.value;
    }
    const resultJSON = JSON.stringify(result);
    fetch('/api/edit-card-item', {
        method: 'put',
        headers: {
            'content-type': 'application/json'
        },
        body: resultJSON
    })
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function(data){
        console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}
