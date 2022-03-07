const url = "https://course-api.com/javascript-store-products";
const container = document.querySelector(".products-center");


const fetchProducts = async (url) => {
    //loading
    container.innerHTML = "<div class='loading'></div>";
    try {
        const getData = await fetch(url);
        const object = await getData.json();
        return object
    } catch (err) {
        //error massage
        container.innerHTML = `<p class="error">there was an error:<br>${err}</p>`;
        console.log(err);
    }
};

const displayData = (list) => {
    const dispData = list.map(item =>{
        const {id} = item;
        const image = item.fields.image[0].url;
        const {name:title, price} = item.fields;
        return `<a href="product.html?id=${id}" class="single-product">
        <img src="${image}" alt="${title}" class="single-product-img img">
        <footer>
        <h5 class="name">${title}</h5>
        <span class="price">$${price/100}</span>
        </footer>
        </a>`
    }).join("");
    container.innerHTML = `<div class="products-container">${dispData}</div>`;
};

function start() {
    fetchProducts(url).then(resp => displayData(resp));
};

start();