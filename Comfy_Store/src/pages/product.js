// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';
import fetchProducts from '../fetchProducts.js';

// selections
const loading = getElement('.page-loading'); 
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// show product when page loads
window.addEventListener("DOMContentLoaded", async () => {

    //fetch required product from api
    const id = new URLSearchParams(document.location.search).get("id");
    const product = await fetchProducts(`${singleProductUrl}${id}`);
    if (typeof(product) !== "object"){
        centerDOM.innerHTML = `
        <div>
        <h3 class="error">sorry, product couldn't be found</h3>
        <a href="index.html" class="btn">back home</a>
        </div>
        `;
    }
    else {
        const {name, company, price, colors, description, image:img} = product.fields;
        const image = img[0].thumbnails.large.url;
    
        //display product in dom
        imgDOM.src = image;
        titleDOM.textContent = name;
        companyDOM.textContent = `by ${company}`;
        priceDOM.textContent = formatPrice(price);
        descDOM.textContent = description;
        colorsDOM.innerHTML = colors.map(color => {
            return `<span class="product-color" style="background:${color}"></span>`;
        }).join("");
        
        pageTitleDOM.textContent = `home / ${name}`;
        document.title = name.toUpperCase();
    
        cartBtn.addEventListener("click", () => {
            addToCart(id);
        });      
    
    }
    loading.style.display = "none";
});



