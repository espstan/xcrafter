const productsList = document.querySelector('.list-group');
const productsInTheCart = document.querySelectorAll('.product-buy');
const clearBtn = document.querySelector('.clear-btn');


for(let i=0;i<productsInTheCart.length;i++){
    productsInTheCart[i].addEventListener('click', addProduct);
}
 productsInTheCart.addEventListener('click', deleteProduct);


// Add Product
function addProduct(e) {
     
    const li = document.createElement('li');

    li.className = 'list-group-item';

    li.appendChild(document.createTextNode("product"));

    const link = document.createElement('a');

    link.className = 'delete-product secondary-content';
    link.style = 'color: tomato; float: right; cursor: pointer'
    link.innerHTML = '&#10006;';

    li.appendChild(link);

     productsInTheCart.appendChild(li);

    

    }

   
// Delete Product
    function deleteProduct(e) {
    if(e.target.classList.contains('delete-product')) {
    e.target.parentElement.remove();
    // removeProductFromLocalStorage(e.target.parentElement);
    }
}

