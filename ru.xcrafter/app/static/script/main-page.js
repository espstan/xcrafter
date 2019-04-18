const item = document.getElementsByClassName('product-list')[0];

let xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:5000/jsons/document.json', true);
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let products = JSON.parse(xhr.responseText);
        createProductCont(products);
    } else {
        console.log(xhr.readyState + ' ' + xhr.status)
    }
}

function createProductCont(products) {
    for (let product of products) {
        item.appendChild(createProductContElement(product));
    }
}

function createProductContElement(product) {
    let productCont = document.createElement('div');
    productCont.className = 'product-cont';
    productCont.setAttribute('id', product.id)
    productCont.innerHTML = getProductCard(product);
    productCont.getElementsByClassName('product-buy')[0].addEventListener('click', () => buy(product));
    return productCont;
}


function getProductCard(product) {
    const productPhoto = product.photo ? product.photo : 'img/Img.png';
    const backgroundImage = `url(${productPhoto})`;
    const productCard =
        `<li class="product-item" style="background-image: ${backgroundImage};">
            <div class="product-price">
                <p>${product.price}</p>
            </div>
            <div class="product-more">
                <div class="product-buy">
                    <img src="static/img/Buy.svg">
                </div>
                <div class="test"></div>
                <a href="./" class="product-search">
                    <img src="static/img/Search.svg">
                </a>
            </div>
        </li>`;
    return productCard;
}

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

