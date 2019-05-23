function deleteItem(id) {
    const productDeleted = document.getElementsByClassName(`product-id-${id}`)[0];
    fetch(`/api/delete-item/${id}`, {
        method: 'delete'
    })
    .then(response => {
        if (response.ok) {
//            let count = 1;
//            let timerId = setInterval(function() {
//            if (count < 0) {
//                document.getElementsByClassName('main-profile')[0].removeChild(productDeleted);
//                clearInterval(timerId);
//            }
//                productDeleted.style.opacity = count + '';
//                count -= 0.03;
//            }, 30);
            document.getElementsByClassName('main-profile')[0].removeChild(productDeleted);
        }
    })
}