import { getElement } from '../utils.js';
import display from '../displayProducts.js';
import {filteredProducts} from '../filters/companies.js';

const form = getElement(".price-form");
const input = getElement(".price-filter");
const priceValue = getElement(".price-value");
const searchForm = getElement(".search-input");

let selectedPrice = input.value;

const setupPrice = (store) => {

const max = Math.ceil(Math.max(...[...store].map(item => item.price)) / 100);
const min = 0;
input.value = input.max = max;
input.min = min;
priceValue.textContent = `Value: $${max}`;

    form.addEventListener("input", () => {
    searchForm.value = "";
    let products;
    if (filteredProducts.length < 1){
        products = [...store];
    }
    else {
        products = [...filteredProducts];
    };
    priceValue.textContent = `Value: $${input.value}`;
    const displayProducts = products.filter(item => {
        return item.price / 100 <= input.value;
    });
    if (displayProducts.length > 0) display(displayProducts, getElement(".products-container"))
    else getElement(".products-container").innerHTML = `<h3 class="filter-error">No products matched your search..</h3>`;
    selectedPrice = input.value;
});
};

export {setupPrice, selectedPrice};
