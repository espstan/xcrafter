const productsList = document.querySelector('.product-group');
const clearBtn = document.querySelector('.clear-btn');
const totalPayment = document.getElementById('total-payment');
const productBadge = document.getElementById('countOfProductInBadge');

document.addEventListener('DOMContentLoaded', getProductsFromLS);
productsList.addEventListener('click', deleteProduct);
clearBtn.addEventListener('click', clearCart);

const cartIsEmpty = document.createElement('tr');
cartIsEmpty.innerHTML = `<td colspan="4" class="text-center"><h5>В корзине пусто</h5></td>`;
productsList.appendChild(cartIsEmpty);

const popupWindow = document.getElementById('popup-window');

function calculateProductBadge() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) { return false }
    let sum = [];
    let totalsum = 0;
    for (let item in cart) {
        sum.push(cart[item]['count']);
    }
    for (let i = 0; i < sum.length; i++) {
        totalsum += sum[i]
    }
    productBadge.innerHTML = `${totalsum}`
}

function buy(product) {
    // popupWindowActive(product);
    let cart = {};
    let item = { 'id': product.id, 'title': product.title, 'price': product.price, 'photo': product.photo };
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

function getProductsFromLS() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) { return false }
    for (const product in cart) {
        cartIsEmpty.remove();
        const tr = document.createElement('tr');
        tr.setAttribute('id', product);
        tr.innerHTML = `
            <td>
                <span class="d-flex">
                    <img src="${cart[product]['photo']}" width="80" height="80"> 
                    <span class="ml-1">${cart[product]['title']}</span>
                </span>
            </td>
            <td> 
                <div class="btn-group">
                    <button type="button" 
                            class="minus${product} btn btn-outline-secondary btn-sm">
                    -
                    </button>
                    <input class="form-control col-6 btn btn-outline-dark text-center" 
                           id="quantity${product}" 
                           value = "${cart[product]['count']}" 
                           disabled>
                    <button type="button" 
                            class = "plus${product} btn btn-outline-secondary btn-sm">
                    +
                    </button>
                </div>
            </td>
            <td> 
                <div class="price-wrap"> 
                  <var class="prod-price${product}"></var> 
                  &nbsp;₽
                </div> 
            </td>
            `;
        const td = document.createElement('td');
        td.className = 'text-right';
        const a = document.createElement('a');
        a.className = 'delete-product secondary-content btn btn-outline-danger';
        a.innerHTML = '×';
        
        td.appendChild(a);
        tr.appendChild(td);
        productsList.appendChild(tr);
        calculateTotalPayment(cart[product])

        let count = cart[product]['count'];

        const plus = document.querySelector(`.plus${product}`);
        const minus = document.querySelector(`.minus${product}`);
        const totalProductPrice = document.querySelector(`.prod-price${product}`);
        const quantity = document.getElementById(`quantity${product}`);

        totalProductPrice.innerHTML = `${cart[product]['price'] * count}`;
        plus.addEventListener('click', plusProduct);
        minus.addEventListener('click', minusProduct);

        function plusProduct() {
            if (count > 9) { return false }
            count++;
            quantity.value = count;
            totalProductPrice.innerHTML = cart[product]['price'] * quantity.value;
            localStorage.getItem('cart')
            cart = JSON.parse(localStorage.getItem('cart'));
            cart[product]['count'] = cart[product]['count'] + 1;
            totalPayment.value = totalPayment.value * 1 + cart[product]['price'] * 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            calculateProductBadge()
        }

        function minusProduct() {
            if (count < 2) { return false }
            count--;
            quantity.value = count;
            totalProductPrice.innerHTML = cart[product]['price'] * quantity.value;
            localStorage.getItem('cart')
            cart = JSON.parse(localStorage.getItem('cart'));
            cart[product]['count'] = cart[product]['count'] - 1;
            totalPayment.value = totalPayment.value * 1 - cart[product]['price'] * 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            calculateProductBadge()
        }  
    }
    calculateProductBadge()
}

function calculateTotalPayment(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) { return false }
    let sum = [];
    let totalsum = 0;
    for (let item in cart) {
        sum.push(cart[item]['price']*cart[item]['count']);
    }
    for (let i = 0; i < sum.length; i++) {
        totalsum += sum[i]
    }
    totalPayment.value = totalsum
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        e.target.parentElement.parentElement.remove();
    }
    removeProductFromLS(e.target.parentElement.parentElement);
}

function removeProductFromLS(element) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const id = element.id;
    for (const product in cart) {
        if (cart[product]['id'] == id) {
            totalPayment.value = totalPayment.value * 1 - cart[product]['price'] * cart[product]['count'];
            delete cart[product];
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }    
}

function clearCart() {
    productsList.innerHTML = '';
    localStorage.clear();
    totalPayment.value = '';
}

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

