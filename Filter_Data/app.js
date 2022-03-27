import data from "./data.js";

const dataContainer = document.querySelector(".data");
const name = document.querySelector("#name");
const lowPrice = document.querySelector("#lprice")
const highPrice = document.querySelector("#hprice")
const clearBtn = document.querySelector(".clear");
const companiesContainer = document.querySelector(".companies")

let checkboxes;

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

const displayCompanies = (data) => {
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
};

const filterByCompanies = (data, checkboxes) => {
    let newData = [];
    let filterActive;

    let arrayCheckboxes = [...checkboxes];

    arrayCheckboxes = arrayCheckboxes.map(checkbox => {
        return checkbox.checked;
    });

    let notEmpty = arrayCheckboxes.reduce((total, value) => {
        return total = total || value;
    }, false);

    if (!notEmpty){
        filterActive = false;
        newData = [...data];
        return {newData, filterActive}
    } else {
        checkboxes.forEach(checkbox => {
        if (checkbox.checked){
            data.forEach(item => {
                if (checkbox.id === item.company){
                    newData.push(item);
                };
            });
        };   
        });
        filterActive = true;
        return {newData, filterActive};
    };
};

const filterByName = (data) => {
    let newData = [];
    let filterActive;

    if (name.value){
        const value = name.value.toLowerCase();
        data.forEach(item => {
            if (item.name.toLowerCase().includes(value)){
                newData.push(item);
            };
        });
        filterActive = true;
        return {newData, filterActive};
    } else {
        filterActive = false;
        newData = [...data];
        return {newData, filterActive};
    };
};

const filterByPrice = (data) => {
    let newData = [];
    let filterActive;

    const low = parseInt(lowPrice.value) * 10;
    const high = parseInt(highPrice.value) * 10;

    if (low >= 0 && high >= 0){
        data.forEach(item => {
            if ((item.price >= low && item.price <= high) || (item.price >= low && high === 0)){
                newData.push(item);
            };
        });
        filterActive = true;
        return {newData, filterActive};
    } else {
        filterActive = false;
        newData = [...data];
        return {newData, filterActive};
    };
};

const filterData = (data) => {
    //filter by company
    const companyFilter = filterByCompanies(data, checkboxes);

    //filter by name
    const nameFilter = filterByName(companyFilter.newData);

    //filter by price
    const priceFilter = filterByPrice(nameFilter.newData);

    //display data
    displayData(priceFilter.newData);

    //control clear btn visibility
    if (!companyFilter.filterActive && !nameFilter.filterActive && !priceFilter.filterActive) {
        clearBtn.classList.add("hide");
    } else {
        clearBtn.classList.remove("hide");
    };
};

const companyFilterEvent = (data) => {
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", ()=> {  
       filterData(data);
    });  
});
};

const nameFilterEvent = (data) => {
    name.addEventListener("keyup", () => {
        filterData(data);
    });
};

const priceFilterEvent = (data) => {
    const priceInputs = document.querySelectorAll(".price");
    priceInputs.forEach(input => {
        input.addEventListener("keyup", ()=> {
            filterData(data);
        });
    });
};

displayCompanies(data);

companyFilterEvent(data);
nameFilterEvent(data);
priceFilterEvent(data);

displayData(data);

clearBtn.addEventListener("click", ()=>{
    displayData(data);
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    name.value = "";
    lowPrice.value = "";
    highPrice.value = "";
    clearBtn.classList.add("hide");
});