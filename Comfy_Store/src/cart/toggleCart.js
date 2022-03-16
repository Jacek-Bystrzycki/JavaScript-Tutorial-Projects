import { getElement } from '../utils.js';

const cartOverlay = getElement(".cart-overlay")
const showCartBtn = getElement(".toggle-cart");
const closeCartBtn = getElement(".cart-close");

showCartBtn.addEventListener("click", () => {
    cartOverlay.classList.add("show");
});
closeCartBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("show");
});

export const openCart = () => {
    cartOverlay.classList.add("show");
};
