const navBuy = document.getElementsByClassName('nav-basket')[0];
const modalCart = document.getElementsByClassName('modal-cart')[0];
const modalOverlay = document.getElementById('modal-overlay');
const closeCartBtn = document.getElementsByClassName('close-cart-btn')[0];
const modalSignupBtn = document.getElementsByClassName('show-btn')[0];
const signupForm = document.getElementById('login-form');
const closeSignupFormBtn = document.getElementsByClassName('close-login-form-button')[0];

if (modalSignupBtn) {
    modalSignupBtn.addEventListener('click', (e) => {openModalWindow(e)});
}

navBuy.addEventListener('click', (e) => {openModalWindow(e)});

function openModalWindow(e) {
    if (e.target.classList.contains('signup-btn')) {
        signupForm.classList.toggle('closed');
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
        signupForm.classList.toggle('closed');
    }
}

if (~location.search.indexOf('next=%2F')) {
    const signupBtn = document.getElementsByClassName('signup-btn')[0];
    signupForm.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
    document.body.style.overflow = 'hidden';
}
