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

function buy(product) {
    const item = {};
    const noId = ({id, ...rest}) => rest;
    item[product.id] = noId(product);
    localStorage['cart'].push(JSON.stringify(item));
    console.log(localStorage['cart']);
}