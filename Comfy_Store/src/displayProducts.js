import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';

let interlock = false; //interlock prevents from create multiple eventListeners during filtering products

const display = (elements, container) => {
    const content = elements.map(element => {
      const {id, image, name, price} = element;
        return `<article class="product">
          <div class="product-container">
            <img src="${image}" class="product-img img" alt="${name}">
            <div class="product-icons">
              <a href="product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article>`;
    }).join("");
    container.innerHTML = content;

    if (!interlock){
      interlock = true;
      container.addEventListener("click", (ev) => {
        if (ev.target.parentElement.classList.contains("product-cart-btn")){
          addToCart(ev.target.parentElement.dataset.id);
        };
      });
    };
};

export default display;
