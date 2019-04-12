
const productsList = document.querySelector('.list-group');
const products = document.querySelectorAll('.product-buy');
const clearBtn = document.querySelector('.clear-btn');

productsList.addEventListener('click', deleteProduct);

for (let i = 0; i < products.length; i++) {
    products[i].addEventListener('click', addProduct);
}

clearBtn.addEventListener('click', clearCard);


// Add Product
function addProduct(e) {

    const li = document.createElement('li');

    li.className = 'list-group-item';

    li.appendChild(document.createTextNode('blabla'));

    const link = document.createElement('a');

    link.className = 'delete-product secondary-content';
    link.style = 'color: tomato; float: right; cursor: pointer'
    link.innerHTML = '&#10006;';

    li.appendChild(link);

    productsList.appendChild(li);

}
// Delete Product
function deleteProduct(e) {
    if(e.target.classList.contains('delete-product')) {
        e.target.parentElement.remove();
    }
}


// Clear Card

function clearCard() {
    console.log(666);
}
