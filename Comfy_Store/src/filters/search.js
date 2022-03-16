import { getElement } from '../utils.js';
import display from '../displayProducts.js';
import {filteredProducts} from '../filters/companies.js';

let searchString = "";
const searchForm = getElement(".input-form");
const searchInput = getElement(".search-input");
const container = getElement(".products-container");
const input = getElement(".price-filter");
const priceValue = getElement(".price-value");

const setupSearch = (store) => {
    searchForm.addEventListener("keyup",(ev) => {
        input.value = Math.ceil(Math.max(...[...store].map(item => item.price)) / 100);
        priceValue.textContent = `Value: $${input.value}`;
        let products;
        if (filteredProducts.length < 1){
            products = [...store];
        }
        else {
            products = [...filteredProducts];
        };
        const value = searchInput.value.toLowerCase();
        if (value){
            const filteredStore = products.filter(item => {
                const itemValue = item.name.toLowerCase();
                return itemValue.includes(value);
            });
            if (filteredStore.length < 1) {
                container.innerHTML = `<h3 class="filter-error">No products matched your search..</h3>`;
            } 
            else{
                display(filteredStore, container);
            };
        }
        else display(products, container);
        searchString = value;
    });
};

export { setupSearch, searchString};
