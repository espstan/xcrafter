const productsList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');
const totalPayment = document.getElementById('total-payment');

document.addEventListener('DOMContentLoaded', getProductsFromLS);
productsList.addEventListener('click', deleteProduct);
clearBtn.addEventListener('click', clearCart);

let cartIsEmpty = document.createElement('h5');
cartIsEmpty.innerHTML='В корзине пусто:(';
productsList.appendChild(cartIsEmpty);

function buy(product) {
    openModalWindow(event);
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
            <span class = "d-flex float-right">
                <span type = "button" class = "minus${product.id} btn" style = "width:10%" >-</span>
                <input class="form-control col-3 " id="quantity${product.id}" value = "1" disabled>
                <span type = "button" class = "plus${product.id} btn" style = "width:10%" >+
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
        }  
    
        function minusProduct(){
            count--;
            quantity.value = count;
            totalProductPrice.innerHTML = `${product.price * quantity.value}`;
            localStorage.getItem('cart'); 
            cart = JSON.parse(localStorage.getItem('cart'));
            console.log(cart[product.id]);
            cart[product.id]['count'] = cart[product.id]['count'] - 1;    
            localStorage.setItem('cart', JSON.stringify(cart));
        }

    }
     
    // } else {
        // const plus = document.querySelector('.plus');    
        // plus.addEventListener('click', () => {console.log(666)}); 
        //console.log('dbcfdg')
        // count++;
        // const quantity = document.getElementById(`quantity ${product.id}`);
        // quantity.value = count;
        // console.log(quantity);
        // document.querySelector(".prod-price").innerHTML = `${product.price * quantity.value}`;
    // }  
    // onclick="storeProductInLS(product);const quantity = document.getElementById('quantity ${product.id}');quantity.value=++count;document.querySelector('.prod-price${product.id}').innerHTML = ${product.price} * quantity.value;storeProductInLS('${product.id}')"
    // onclick="const quantity = document.getElementById('quantity ${product.id}');quantity.value=--count;document.querySelector('.prod-price${product.id}').innerHTML = ${product.price} * quantity.value;"     
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
            <span class = "d-flex float-right">
                <span type = "button" class = "minus${product} btn" style = "width:10%" >-</span>
                <input class="form-control col-3 " id="quantity${product}" value = "${cart[product]['count']}" disabled>
                <span type = "button" class = "plus${product} btn" style = "width:10%" >+
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
            localStorage.setItem('cart', JSON.stringify(cart));
        }  
        function minusProduct(){
            count--;
            quantity.value = count;
            totalProductPrice.innerHTML = cart[product]['price'] * quantity.value;
            localStorage.getItem('cart') 
            cart = JSON.parse(localStorage.getItem('cart'));
            cart[product]['count'] = cart[product]['count'] - 1;    
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

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
    console.log(id)
    for(const product in cart){
        if(cart[product]['id']==id){
            console.log(cart[product]);
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


