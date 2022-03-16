import { formatPrice, getElement } from '../utils.js';

const cartContainer = getElement(".cart-items");

const addToCartDOM = cart => {
    const cartDOM = cart.map(item => {
        const {id, image, name, price, amount} = item;
        return `<article class="cart-item" data-id="${id}">
            <img src="${image}" class="cart-item-img" alt="name">
            <div>
              <h4 class="cart-item-name">${name}</h4>
              <p class="cart-item-price">${formatPrice(price)}</p>
              <button class="cart-item-remove-btn">remove</button>
            </div>
            <div>
              <button class="cart-item-increase-btn">
                <i class="fas fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount">${amount}</p>
              <button class="cart-item-decrease-btn">
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
          </article>`;
    }).join("");

    cartContainer.innerHTML = cartDOM;
};

export default addToCartDOM;