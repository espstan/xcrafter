const productsList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');

document.addEventListener('DOMContentLoaded', getProductsFromLS);
productsList.addEventListener('click', deleteProduct);
clearBtn.addEventListener('click', clearCart);

    function buy(product) {
        const li = document.createElement('li');

        li.className = 'list-group-item';

        li.appendChild(document.createTextNode(`${product.title}:   ${product.price} руб`));

        const link = document.createElement('a');

        link.className = 'delete-product secondary-content';
        link.style = 'color: tomato; float: right; cursor: pointer'
        link.innerHTML = '&#10006;';
        li.appendChild(link);
        productsList.appendChild(li);
        storeProductInLS(product);
    }
    function storeProductInLS(product){
//        let product = fetch
        let productsInLS;
        // localStorage[productsInLS] = JSON.stringify(product);
        if(localStorage.getItem('productsInLS') === null){
            productsInLS = [];
        } else {
            productsInLS = JSON.parse(localStorage.getItem('productsInLS'));
        }
        productsInLS.push(product);
        localStorage.setItem('productsInLS', JSON.stringify(productsInLS));
    }

function getProductsFromLS(){
    // let productsInTheCart = JSON.parse(localStorage.getItem('productsInLS'));
    // console.log(productsInTheCart);
    let productsInLS;

    productsInLS = JSON.parse(localStorage.getItem('productsInLS'));

    productsInLS.forEach(function(product){
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(`${product.title}:   ${product.price} руб`));
    const link = document.createElement('a');
    link.className = 'delete-product secondary-content';
    link.style = 'color: tomato; float: right; cursor: pointer'
    link.innerHTML = '&#10006;';
    li.appendChild(link);
    productsList.appendChild(li);
    })
}


function deleteProduct(e) {
    if(e.target.classList.contains('delete-product')) {
    e.target.parentElement.remove();
    }
    removeProductFromLS(e.target.parentElement);
}

function removeProductFromLS(product) {
    let productsInLS;
    if(localStorage.getItem('productsInLS') === null){
        productsInLS = [];
    } else {
        productsInLS = JSON.parse(localStorage.getItem('productsInLS'));
    }

    productsInLS.forEach(function(productInLS, index){
    if(product.textContent === productInLS){
        productsInLS.splice(index, 1);
    }
    });

    localStorage.setItem('productsInLS', JSON.stringify(productsInLS));
}

function clearCart(){
    productsList.innerHTML = '';
    localStorage.clear();
}

