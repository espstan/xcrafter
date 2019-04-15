const navBuy = document.getElementsByClassName('nav-basket')[0];
const modalCart = document.getElementsByClassName('modal-cart')[0];
const modalOverlay = document.getElementById('modal-overlay');
const closeCartBtn = document.getElementsByClassName('close-cart-btn')[0];
const modalSignupBtn = document.getElementsByClassName('show-btn')[0];
const singupForm = document.getElementById('singup-form');
const closeSignupFormBtn = document.getElementsByClassName('close-signup-form-btn')[0];

modalSignupBtn.addEventListener('click', (event) => {openModalWindow(event)});
navBuy.addEventListener('click', (event) => {openModalWindow(event)});

function openModalWindow(event) {
    if (event.target.classList.contains('singup-btn')) {
        singupForm.classList.toggle('closed');
    } else {
        modalCart.classList.toggle('closed');
    }
    modalOverlay.classList.toggle('closed');
    document.body.style.overflow = 'hidden';
}

modalOverlay.addEventListener('click', closedModalWindow);
closeCartBtn.addEventListener('click', closedModalWindow);
closeSignupFormBtn.addEventListener('click', closedModalWindow);

function closedModalWindow() {
    modalOverlay.classList.toggle('closed');
    document.body.style.overflow = '';
    if (!modalCart.classList.contains('closed')) {
        modalCart.classList.toggle('closed');
    } else {
        singupForm.classList.toggle('closed');
    }
}

