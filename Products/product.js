const container = document.querySelector(".product");
const url = "https://course-api.com/javascript-store-single-product?id=";


const fetchProducts = async (url) => {
    container.innerHTML = `<h4 class="product-loading">Loading...</h4>`;
    try {
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    const link = `${url}${id}`;
    const resp = await fetch(link);
    const data = await resp.json();
    return data;
    } catch (error) {
        container.innerHTML = `<p class="error">there was an error:<br>${error}</p>`;
        console.log(error);
    };
};

const displayProduct = (product) => {
    const image = product.fields.image[0].url;
    const {name:title, company, price, description} = product.fields;
    const colors = product.fields.colors.map(color =>{
        return `<span class="product-color" style="background: ${color}"></span>`
    }).join("");

    document.title = title.toUpperCase();

    container.innerHTML = `<div class="product-wrapper">
            <img src="${image}" alt="${title}" class="img">
            <div class="product-info">
                <h3>${title}</h3>
                <h5>${company}</h5>
                <span>$${price/100}</span>
                <div class="colors">${colors}</div>
                <p>${description}</p>
                <button class="btn">add to cart</button>
            </div>
            </div>`;
}

const start = async () => {
    const product = await fetchProducts(url);
    displayProduct(product);
};

start();