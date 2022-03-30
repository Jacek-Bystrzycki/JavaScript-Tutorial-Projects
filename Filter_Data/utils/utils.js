import { itemsPerPage } from "../app.js";

const dataContainer = document.querySelector(".data");
const companiesContainer = document.querySelector(".companies");
const colorsContainer = document.querySelector(".color-container");
const paginationContainer = document.querySelector(".pagination");

//dynamic DOM elements
let checkboxes;
let colors;

//display items function
const displayData = (data) => {

    const dataToDisplay = data.map(item => {
        return `<div class="item">
                <h2 class="name">${item.name}</h2>
                <h3 class="company">${item.company}</h3>
                <h3 class="color">${item.color}</h3>
                <h3 class="price">$${item.price / 10}</h3>
                </div>`
    }).join("");

    dataContainer.innerHTML = dataToDisplay;
};

//Capitalize 1st letter function
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Display company and color filters dynamically (search all available variants in database)
const displayDynamicFilters = (data) => {
    //display companies filter
    let companies = [];
    data.forEach(item => {
        if (!companies.includes(item.company)){
            companies.push(item.company)
        };
    });
    
    companies = companies.map(item => {
        return  `<div class="input">
                <input type="checkbox" id="${item.toLowerCase()}" name="company" class="checkbox" value="${item.toLowerCase()}">
                <label for="${item.toLowerCase()}">${capitalize(item)}</label>
                </div>`
    }).join("");
    companiesContainer.innerHTML = companies;
    checkboxes = document.querySelectorAll(".checkbox");

    //display colors filter
    let displayColors = [];
    data.forEach(item => {
        if (!displayColors.includes(item.color)){
            displayColors.push(item.color);
        };
    });

    displayColors = displayColors.map(color => {
        return `<div class="colorbox" id="box-${color}" style="background-color: ${color}; outline-color: ${color}"></div>`
    }).join("");
    colorsContainer.innerHTML = displayColors;
    colors = document.querySelectorAll(".colorbox");
};

//Split data for displaying in pages
const pagination = (data, currentPage) => {
    const dataLength = data.length;
    const amountOfPages = Math.ceil(dataLength / itemsPerPage);
 
   //display pages controls
   let buttons = [];
   for (let i = 0; i < amountOfPages; i++) {
        buttons.push((currentPage === i) ?`<span class="current" data-value="${i + 1}">${i + 1}</span>`:`<span data-value="${i + 1}">${i + 1}</span>`)
    }
    if (buttons.length > 0) {
    buttons.unshift(`<span data-value="prev">prev</span>`);
    buttons.push(`<span data-value="next">next</span>`);
    };
    paginationContainer.innerHTML = buttons.join("");

    //display items
    let pageData = [];
    if (dataLength < 1) return pageData;
    pageData = Array.from({length: amountOfPages}, (item, index) => {
        item = data.slice(itemsPerPage * index, itemsPerPage * (index + 1));
        return item;
    });
    return pageData;
};

export {checkboxes, colors, displayData, displayDynamicFilters, pagination, paginationContainer};