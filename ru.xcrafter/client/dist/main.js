/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./script/cart.js":
/*!************************!*\
  !*** ./script/cart.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst productsList = document.querySelector('.list-group');\nconst products = document.querySelectorAll('.product-buy');\nconst clearBtn = document.querySelector('.clear-btn');\n\nproductsList.addEventListener('click', deleteProduct);\n\nfor (let i = 0; i < products.length; i++) {\n    products[i].addEventListener('click', addProduct);\n}\n\nclearBtn.addEventListener('click', clearCard);\n\n\n// Add Product\nfunction addProduct(e) {\n\n    const li = document.createElement('li');\n\n    li.className = 'list-group-item';\n\n    li.appendChild(document.createTextNode('blabla'));\n\n    const link = document.createElement('a');\n\n    link.className = 'delete-product secondary-content';\n    link.style = 'color: tomato; float: right; cursor: pointer'\n    link.innerHTML = '&#10006;';\n\n    li.appendChild(link);\n\n    productsList.appendChild(li);\n\n}\n// Delete Product\nfunction deleteProduct(e) {\n    if(e.target.classList.contains('delete-product')) {\n        e.target.parentElement.remove();\n    }\n}\n\n\n// Clear Card\n\nfunction clearCard() {\n    console.log(666);\n}\n\n\n//# sourceURL=webpack:///./script/cart.js?");

/***/ }),

/***/ "./script/main-page.js":
/*!*****************************!*\
  !*** ./script/main-page.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const item = document.getElementsByClassName('product-list')[0];\n\nlet xhr = new XMLHttpRequest();\n\nxhr.open('GET', 'http://xcrafter.ru/jsons/document.json', true);\nxhr.send();\n\nxhr.onreadystatechange = function () {\n    if (xhr.readyState == 4 && xhr.status == 200) {\n        let products = JSON.parse(xhr.responseText);\n        createProductCont(products);\n    } else {\n        console.log(xhr.readyState + ' ' + xhr.status)\n    }\n}\n\nfunction createProductCont(products) {\n    for (let product of products) {\n        item.appendChild(createProductContElement(product));\n    }\n}\n\nfunction createProductContElement(product) {\n    let productCont = document.createElement('div');\n    productCont.className = 'product-cont';\n    productCont.setAttribute('id', product.id)\n    productCont.innerHTML = getProductItem(product);\n    productCont.getElementsByClassName('product-buy')[0].addEventListener('click', () => buy(product));\n    return productCont;\n}\n\n\nfunction getProductItem(product) {\n    const productPhoto = product.photo ? product.photo : 'img/Img.png';\n    const backgroundImage = `url(${productPhoto})`;\n    const elem =\n        `<li class=\"product-item\" style=\"background-image: ${backgroundImage};\">\n            <div class=\"product-price\">\n                <p>${product.price}</p>\n            </div>\n            <div class=\"product-more\">\n                <div class=\"product-buy\">\n                    <img src=\"img/Buy.svg\">\n                </div>\n                <div class=\"test\"></div>\n                <a href=\"./\" class=\"product-search\">\n                    <img src=\"img/Search.svg\">\n                </a>\n            </div>\n        </li>`;\n    return elem;\n}\n\nfunction buy(product) {\n    const item = {};\n    const noId = ({id, ...rest}) => rest;\n    item[product.id] = noId(product);\n    localStorage['cart'].push(JSON.stringify(item));\n    console.log(localStorage['cart']);\n}\n\n\n//# sourceURL=webpack:///./script/main-page.js?");

/***/ }),

/***/ "./script/modal-windows.js":
/*!*********************************!*\
  !*** ./script/modal-windows.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const navBuy = document.getElementsByClassName('nav-basket')[0];\nconst modalCart = document.getElementsByClassName('modal-cart')[0];\nconst modalOverlay = document.getElementById('modal-overlay');\nconst closeCartBtn = document.getElementsByClassName('close-cart-btn')[0];\nconst modalSignupBtn = document.getElementsByClassName('show-btn')[0];\nconst singupForm = document.getElementById('singup-form');\nconst closeSignupFormBtn = document.getElementsByClassName('close-signup-form-btn')[0];\n\nmodalSignupBtn.addEventListener('click', (event) => {openModalWindow(event)});\nnavBuy.addEventListener('click', (event) => {openModalWindow(event)});\n\nfunction openModalWindow(event) {\n    if (event.target.classList.contains('singup-btn')) {\n        singupForm.classList.toggle('closed');\n    } else {\n        modalCart.classList.toggle('closed');\n    }\n    modalOverlay.classList.toggle('closed');\n    document.body.style.overflow = 'hidden';\n}\n\nmodalOverlay.addEventListener('click', closedModalWindow);\ncloseCartBtn.addEventListener('click', closedModalWindow);\ncloseSignupFormBtn.addEventListener('click', closedModalWindow);\n\nfunction closedModalWindow() {\n    modalOverlay.classList.toggle('closed');\n    document.body.style.overflow = '';\n    if (!modalCart.classList.contains('closed')) {\n        modalCart.classList.toggle('closed');\n    } else {\n        singupForm.classList.toggle('closed');\n    }\n}\n\n\n\n//# sourceURL=webpack:///./script/modal-windows.js?");

/***/ }),

/***/ 0:
/*!******************************************************************************!*\
  !*** multi ./script/main-page.js ./script/cart.js ./script/modal-windows.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./script/main-page.js */\"./script/main-page.js\");\n__webpack_require__(/*! ./script/cart.js */\"./script/cart.js\");\nmodule.exports = __webpack_require__(/*! ./script/modal-windows.js */\"./script/modal-windows.js\");\n\n\n//# sourceURL=webpack:///multi_./script/main-page.js_./script/cart.js_./script/modal-windows.js?");

/***/ })

/******/ });