const path = require('path');

module.exports = {
  mode: 'development',  
  entry: ['./script/main-page.js', './script/cart.js', './script/modal-windows.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};