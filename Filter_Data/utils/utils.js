const dataContainer = document.querySelector(".data");
const companiesContainer = document.querySelector(".companies");
const colorsContainer = document.querySelector(".color-container");

//dynamic DOM elements
let checkboxes;
let colors;

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

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

export {checkboxes, colors, displayData, displayDynamicFilters};