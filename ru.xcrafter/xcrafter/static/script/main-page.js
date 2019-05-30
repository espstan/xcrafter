const productsList = document.querySelector('.product-group');
const clearBtn = document.querySelector('.clear-btn');
const totalPayment = document.getElementById('total-payment');
const productBadge = document.getElementById('countOfProductInBadge');
const toast = document.getElementById('add-item-to-cart')
calculateProductBadge();

document.addEventListener('DOMContentLoaded', getProductsFromLS);
document.addEventListener('DOMContentLoaded', changeAllTagSpan);
productsList.addEventListener('click', deleteProduct);
clearBtn.addEventListener('click', clearCart);

const cartIsEmpty = document.createElement('tr');
cartIsEmpty.innerHTML = `<td colspan="4" class="text-center"><h5>В корзине пусто</h5></td>`;
productsList.appendChild(cartIsEmpty);

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
    if (totalsum === 0) {
        productBadge.innerHTML = ''
    } else {
        productBadge.innerHTML = `${totalsum}`
    }
}

function buy(product, event) {
    popupWindowActive(product);
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
    calculateProductBadge();
    changeTagSpan(product.id);
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
    calculateProductBadge();
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

function popupWindowActive(product) {
    toast.innerHTML = 
    `
    <div class="toast-header alert-light">
        <h6>
            Товар добавлен в 
            <a href="cart" class="alert-link">корзину</a>
        </h6>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="toast-body alert-light">
        <img src="${product.photo}" width="80" height="80" class="mr-3">
        &nbsp;${product.title}
    </div>
    `
    $('#add-item-to-cart').toast('show');
}

function changeTagSpan(id) {
    const element = document.getElementById('product-' + id);
    const elementSpan = element.getElementsByTagName('span')[0];
    elementSpan.outerHTML = `
        <a href="cart"
           class="btn product-buy link-on-cart">
           Перейти в корзину
        </a>`
}

function changeAllTagSpan() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {return false}
    for (let item in cart) {
        changeTagSpan(cart[item]['id']);
    }
}
