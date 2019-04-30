const productsList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');
const totalPayment = document.getElementById('total-payment');
const productBadge = document.getElementById('countOfProductInBadge');

document.addEventListener('DOMContentLoaded', getProductsFromLS);
productsList.addEventListener('click', deleteProduct);
clearBtn.addEventListener('click', clearCart);

const cartIsEmpty = document.createElement('h5');
cartIsEmpty.innerHTML='В корзине пусто:(';
productsList.appendChild(cartIsEmpty);

const popupWindow = document.getElementById('popup-window');

function buy(product) {
    popupWindowActive(product);
    if(document.getElementById(product.id) == undefined){

        cartIsEmpty.remove();
        const li = document.createElement('li');
        li.className = 'list-group-item col-12 d-flex';
        li.setAttribute('id', product.id);
        const inLi = document.createElement('span');
        inLi.className = 'input-group'
        inLi.innerHTML =
        `<span>
            <span>${product.title}:
                <span class = "prod-price${product.id}"></span>
                руб
            </span>
            <span class = "d-flex float-right w-50">
                <span  class = "minus${product.id} btn" w-10 >-</span>
                <input class="form-control col-3 " id="quantity${product.id}" value = "1" disabled>
                <span  class = "plus${product.id} btn" w-10>+
                </span>
            </span>
        </span>`;

        const link = document.createElement('a');
        link.className = 'delete-product secondary-content';
        link.style = 'color: tomato; float: right; cursor: pointer'
        link.innerHTML = '&#10006;';
        li.appendChild(inLi);
        li.appendChild(link);
        productsList.appendChild(li);
        calculateTotalPrice(product);
        storeProductInLS(product);

        document.querySelector(`.prod-price${product.id}`).innerHTML = `${product.price}`;
        const plus = document.querySelector(`.plus${product.id}`);
        const minus = document.querySelector(`.minus${product.id}`);
        const totalProductPrice = document.querySelector(`.prod-price${product.id}`);
        const quantity = document.getElementById(`quantity${product.id}`);
        let count = 1;

        plus.addEventListener('click',plusProduct);
        minus.addEventListener('click',minusProduct);

        function plusProduct(){
            count++;
            quantity.value = count;
            totalProductPrice.innerHTML = `${product.price * quantity.value}`;
            storeProductInLS(product);
            calculateTotalPrice(product);
            calculateProductBadge()
 
        function minusProduct(){
            if (count < 2) { return false }
            count--;
            quantity.value = count;
            totalProductPrice.innerHTML = `${product.price * quantity.value}`;
            localStorage.getItem('cart');
            cart = JSON.parse(localStorage.getItem('cart'));
            cart[product.id]['count'] = cart[product.id]['count'] - 1;    
            localStorage.setItem('cart', JSON.stringify(cart));
            totalPayment.value = totalPayment.value*1 - product.price*1;
            calculateProductBadge()
        }
    
        
    }
    calculateProductBadge()
}
function calculateProductBadge(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) { return false }
    let sum = [];
    let totalsum=0;
    for(let item in cart){    
        sum.push(cart[item]['count']);         
    }
    for (let i=0; i<sum.length; i++){
        totalsum += sum[i]
    }
    productBadge.innerHTML=`${totalsum}`
}

function storeProductInLS(product){
    let cart = {};
    let item = {'id': product.id, 'title': product.title, 'price': product.price };
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[product.id]) {
            cart[product.id]['count'] = cart[product.id]['count'] + 1;
        } else {
            cart[product.id] = item;
            cart[product.id]['count'] = 1;
        }
    } else {
        cart[product.id] = item;
        cart[product.id]['count'] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getProductsFromLS(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) { return false }
    for(const product in cart){
        cartIsEmpty.remove();
        const li = document.createElement('li');
        li.className = 'list-group-item col-12 d-flex';
        li.setAttribute('id', product);
        const inLi = document.createElement('span');
        inLi.className = 'input-group'
        inLi.innerHTML =
        `<span>
            <span>${cart[product]['title']}:
                <span class = "prod-price${product}"></span>
                руб
            </span>
            <span class = "d-flex float-right w-50">
                <span class = "minus${product} btn" w-10 >-</span>
                <input class="form-control col-3 " id="quantity${product}" value = "${cart[product]['count']}"disabled>
                <span class = "plus${product} btn" w-10" >+
                </span>
            </span>
        </span>`;

        const link = document.createElement('a');
        link.className = 'delete-product secondary-content';
        link.style = 'color: tomato; float: right; cursor: pointer'
        link.innerHTML = '&#10006;';
        li.appendChild(inLi);
        li.appendChild(link);
        productsList.appendChild(li);

        let count = cart[product]['count'];

        const plus = document.querySelector(`.plus${product}`);
        const minus = document.querySelector(`.minus${product}`);
        const totalProductPrice = document.querySelector(`.prod-price${product}`);
        const quantity = document.getElementById(`quantity${product}`);

        totalProductPrice.innerHTML = `${cart[product]['price'] * count}`;
        plus.addEventListener('click',plusProduct);
        minus.addEventListener('click',minusProduct);

        function plusProduct(){
            count++;
            quantity.value = count;
            totalProductPrice.innerHTML = cart[product]['price'] * quantity.value;
            localStorage.getItem('cart')
            cart = JSON.parse(localStorage.getItem('cart'));
            cart[product]['count'] = cart[product]['count'] + 1; 
            totalPayment.value = totalPayment.value*1 + cart[product]['price']*1; 
            localStorage.setItem('cart', JSON.stringify(cart));
            calculateProductBadge()
        }  

        function minusProduct(){
            if (count < 2) { return false }
            count--;
            quantity.value = count;
            totalProductPrice.innerHTML = cart[product]['price'] * quantity.value;
            localStorage.getItem('cart')
            cart = JSON.parse(localStorage.getItem('cart'));
            cart[product]['count'] = cart[product]['count'] - 1; 
            totalPayment.value = totalPayment.value*1 - cart[product]['price']*1;   
            localStorage.setItem('cart', JSON.stringify(cart)); 
            calculateProductBadge()   
        }
    }
    calculateProductBadge()
}



function deleteProduct(e) {
    if(e.target.classList.contains('delete-product')) {
        e.target.parentElement.remove();
    }
    removeProductFromLS(e.target.parentElement);
}

function removeProductFromLS(element) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const id = element.id;
    for(const product in cart){
        if(cart[product]['id']==id){
            delete cart[product];
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}

function clearCart(){
    productsList.innerHTML = '';
    localStorage.clear();
    totalPayment.value = '';
}

function calculateTotalPrice(product){
    totalPayment.value = totalPayment.value*1 + product.price*1;
};

let timeoutEz = undefined;

function popupWindowActive(product) {
    if (!popupWindow.classList.contains('closed')) {
        popupWindow.classList.toggle('closed');
        if (timeoutEz) {
            clearTimeout(timeoutEz);
        }
    }
    popupWindow.innerHTML =
        `<header class="popup-window-header">
            <div class="popup-window-header-title">
                Товар добавлен в корзину!
            </div>
            <div class="popup-window-close-btn" onclick="popupWindowHide()">
                X
            </div>
        </header>
        <main class="popup-window-main">
            <div class="popup-window-main-photo">
                <img class="popup-window-main-photo-img" src="${product.photo}">
            </div>
            <div class="popup-window-main-description">
                <h3><b>${product.price} руб.</b></h3>
                <span>${product.title}</span>
            </div>
        </main>
        <div class="popup-window-btn">
            <a href="/cart">Перейти в корзину</a>
        </div>`

    popupWindow.classList.toggle('closed');
    timeoutEz = setTimeout(popupWindowHide, 5000);
    popupWindow.addEventListener('mouseenter', () => {
        clearTimeout(timeoutEz);
    })
    popupWindow.addEventListener('mouseleave', popupWindowHideSetTimeout)
}

function popupWindowHide() {
    if (!popupWindow.classList.contains('closed')) {
        popupWindow.classList.toggle('closed');
    }
    popupWindow.removeEventListener('mouseleave', popupWindowHideSetTimeout)
}

function popupWindowHideSetTimeout() {
    timeoutEz = setTimeout(popupWindowHide, 5000);
}
