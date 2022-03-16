// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import {setupSearch} from '../filters/search.js';
import {setupCompanies} from '../filters/companies.js';
import {setupPrice} from '../filters/price.js';

// specific imports
import { store, setupStore } from '../store.js';
import fetchProducts from '../fetchProducts.js';
import display from '../displayProducts.js';
import { getElement, allProductsUrl } from '../utils.js';

const loading = getElement(".page-loading");

const init = async () => {
    if (store.length < 1) {
       const products = await fetchProducts(allProductsUrl);
       setupStore(products);
    };
    display(store, getElement(".products-container"));
    setupSearch(store);
    setupCompanies(store);
    setupPrice(store);
    loading.style.display = "none";
};

init();



