window.onload = function () {
    const item = document.getElementsByClassName('product-list')[0];

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://xcrafter.ru/jsons/document.json', true);
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
                        <img src="img/Buy.svg">
                    </div>
                    <div class="test"></div>
                    <a href="./" class="product-search">
                        <img src="img/Search.svg">
                    </a>
                </div>
            </li>`;
        return productCard;
    }

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

