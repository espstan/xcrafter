let mainCardItemElement = document.getElementsByClassName('main')[0];

let cardItemBuyBtn = document.getElementsByClassName('card-item-buy-btn')[0];

let itemId = document.getElementsByClassName('wrapper')[0].dataset.itemId;

let nameCardItemElementData = mainCardItemElement.dataset.about;

let itemSrc = document.querySelector(`.menu-item.${nameCardItemElementData} a`);

itemSrc.classList.add('active');

checkItemInCart();

function storeProductInLS(product){
    //let product = fetch
    let productsInLS;
    // localStorage[productsInLS] = JSON.stringify(product);
    if(localStorage.getItem('productsInLS') === null){
        productsInLS = [];
    } else {
        productsInLS = JSON.parse(localStorage.getItem('productsInLS'));
    }

    productsInLS.push(product);
    localStorage.setItem('productsInLS', JSON.stringify(productsInLS));

    cardItemBuyBtn.onclick = null;
    cardItemBuyBtn.classList.add('add-in-cart');
    cardItemBuyBtn.classList.remove('card-item-buy-btn');
    cardItemBuyBtn.innerHTML = '<a href="/cart">Оформить</a>';
}

function checkItemInCart() {
    let productsInLS = JSON.parse(localStorage.getItem('productsInLS'));
    for (let productInLs of productsInLS) {
        if (productInLs.id == itemId) {
            cardItemBuyBtn.onclick = null;
            cardItemBuyBtn.classList.add('add-in-cart');
            cardItemBuyBtn.classList.remove('card-item-buy-btn');
            cardItemBuyBtn.innerHTML = '<a href="/cart">Оформить</a>';
            return
        }
    }
}
