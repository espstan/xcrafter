const productsList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');
const totalPayment = document.getElementById('total-payment');

document.addEventListener('DOMContentLoaded', getProductsFromLS);
productsList.addEventListener('click', deleteProduct);
clearBtn.addEventListener('click', clearCart);

    function buy(product) {
        const li = document.createElement('li');

        li.className = 'list-group-item';

        li.setAttribute('data-id', product.id);
        li.appendChild(document.createTextNode(`${product.title}:   ${product.price} руб`));

        const link = document.createElement('a');

        link.className = 'delete-product secondary-content';
        link.style = 'color: tomato; float: right; cursor: pointer'
        link.innerHTML = '&#10006;';
        li.appendChild(link);
        productsList.appendChild(li);
        calculateTP(product);
        storeProductInLS(product);
    }
    function storeProductInLS(product){
        let productsInLS;
        if(localStorage.getItem('productsInLS') === null){
            productsInLS = [];
        } else {
            productsInLS = JSON.parse(localStorage.getItem('productsInLS'));
        }
        productsInLS.push(product);
        localStorage.setItem('productsInLS', JSON.stringify(productsInLS));
    }

function getProductsFromLS(){

    let productsInLS;

    productsInLS = JSON.parse(localStorage.getItem('productsInLS'));
    if (!productsInLS) { return false }
    productsInLS.forEach(function(product){
    const li = document.createElement('li');
        li.setAttribute('data-id', product.id);
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(`${product.title}:   ${product.price} руб`));
        const link = document.createElement('a');
        link.className = 'delete-product secondary-content';
        link.style = 'color: tomato; float: right; cursor: pointer'
        link.innerHTML = '&#10006;';
        li.appendChild(link);
        productsList.appendChild(li);
        calculateTP(product);
    })
}


function deleteProduct(e) {
    if(e.target.classList.contains('delete-product')) {
        e.target.parentElement.remove();
    }
    removeProductFromLS(e.target.parentElement);
}

function removeProductFromLS(element) {
    const productsInLS = JSON.parse(localStorage.getItem('productsInLS'));
    const id = element.dataset.id;
    const index = productsInLS.findIndex(product => product.id === id);
    productsInLS.splice(index, 1);
    localStorage.setItem('productsInLS', JSON.stringify(productsInLS));
    (JSON.parse(localStorage.getItem('productsInLS')));
}

function clearCart(){
    productsList.innerHTML = '';
    localStorage.clear();
}

function calculateTP(product){
    totalPayment.value = totalPayment.value * 1 + product.price * 1;
};

