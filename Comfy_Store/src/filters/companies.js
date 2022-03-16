import { getElement } from '../utils.js';
import display from '../displayProducts.js';
import {searchString} from '../filters/search.js';
import {selectedPrice} from '../filters/price.js';

let filteredProducts = [];

const setupCompanies = (store) => {
    const companiesContainer = getElement(".companies");
    const companies = new Set();
    companies.add("all");
    store.forEach(item => {
        companies.add(item.company)
    });
    const displayCompanies = Array.from(companies).map(item => {
        return `<button class="company-btn ${item==="all"?"selected":""}" data-name="${item}">${item}</button>`
    }).join("");
    companiesContainer.innerHTML = displayCompanies;
    
    companiesContainer.addEventListener("click", (ev) => {
        if (ev.target.classList.contains("company-btn")){

            getElement(".company-btn", 1).forEach(button => {
                button.classList.remove("selected");
            });

            ev.target.classList.add("selected");

            const productsContainer = getElement(".products-container");
            const company = ev.target.dataset.name;
            const displayProducts = store.filter(item => {

                if ((company === item.company || company === "all") && item.name.includes(searchString) && item.price / 100 <= selectedPrice){
                    return item;
                };
            });
            if (displayProducts < 1){
                productsContainer.innerHTML = `<h3 class="filter-error">No products matched your search..</h3>`;
            }
            else display(displayProducts, productsContainer);
            filteredProducts = store.filter(item => {
                if ((company === item.company || company === "all")){
                    return item;
                };
            });
        };
    });
};

export {setupCompanies, filteredProducts};
