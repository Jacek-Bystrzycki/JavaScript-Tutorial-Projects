// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart");

const countTotal = cart => {
  //total price
  const totalPrice = cart.reduce((total, current) => {
      return total + (current.price * current.amount);
  }, 0);
  cartTotalDOM.textContent = `Total : ${formatPrice(totalPrice)}`;

  //total quantity
  const totalQuantity = cart.reduce((total, current) => {
    return total + current.amount;
  }, 0);
  cartItemCountDOM.textContent = totalQuantity;
};

const addToCart = id => {

  let item = cart.find(item => item.id === id);
  if (!item) {
    let product = findProduct(id);
    product = {...product, amount:1};
    cart.push(product);
    setStorageItem("cart", cart);

  }
  else {
    cart = getStorageItem("cart");
    cart = cart.map(product => {
      if (product.id === id){
        product.amount ++;
      };
      return product;
    });
    setStorageItem("cart", cart);
  };
  
  addToCartDOM(cart);
  countTotal(cart);
  openCart();
};

cartItemsDOM.addEventListener("click", (ev) => {
  let id;
  let action = "";

  if (ev.target.classList.contains("cart-item-remove-btn")) action = "remove"
  else if (ev.target.parentElement.classList.contains("cart-item-decrease-btn")) action = "down"
  else if (ev.target.parentElement.classList.contains("cart-item-increase-btn")) action = "up";

  if (action === "") return;

  if (action === "down" || action === "up") {
      id = ev.target.parentElement.parentElement.parentElement.dataset.id;
  }
  else id = ev.target.parentElement.parentElement.dataset.id;

  const index = cart.findIndex(item => {
    return item.id === id;
  });

  if (action === "up") {
    cart[index].amount++
  }
  else if (action === "down") {
    if (cart[index].amount > 1) cart[index].amount--;
  };

  if (action === "remove") {
    cart.splice(index);
  };

    addToCartDOM(cart);
    countTotal(cart);
    setStorageItem("cart", cart);
});

const init = () => {
    addToCartDOM(cart);
    countTotal(cart);
};

init();

export {addToCart};
