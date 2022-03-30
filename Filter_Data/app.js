import data from "./data.js";
import {checkboxes, colors, displayData, displayDynamicFilters, pagination, paginationContainer} from "./utils/utils.js";
import {filterData, filteredData} from "./filters/filter.js";

//select DOM elements
const name = document.querySelector("#name");
const lowPrice = document.querySelector("#lprice")
const highPrice = document.querySelector("#hprice")
const clearBtn = document.querySelector(".clear");
const items = document.querySelector("#items");

let pageNo = 0;
let itemsPerPage = 25;


//Filters functionality
const companyFilterEvent = (data) => {
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", ()=> {  
       pageNo = 0;
       filterData(data, false);
    });  
});
};

const nameFilterEvent = (data) => {
    name.addEventListener("keyup", () => {
        pageNo = 0;
        filterData(data, false);
    });
};

const priceFilterEvent = (data) => {
    const priceInputs = document.querySelectorAll(".price");
    priceInputs.forEach(input => {
        input.addEventListener("keyup", ()=> {
            pageNo = 0;
            filterData(data, false);
        });
    });
};

const colorFilterEvent = (data) => {
    colors.forEach(color => {
        color.addEventListener("click", (ev) => {
            if (ev.target.classList.contains("colorbox")){
                ev.target.classList.toggle("selected");
                pageNo = 0;
                filterData(data, false);
            };
        });
    });
};

//Display data when web loaded
displayData(pagination(data, pageNo)[pageNo]);
displayDynamicFilters(data);

//Trigger filtering
companyFilterEvent(data);
nameFilterEvent(data);
priceFilterEvent(data);
colorFilterEvent(data);

//Event Listeners
paginationContainer.addEventListener("click", (ev) => {
    if (!ev.target.classList.contains("pagination")){
        const amountOfPages = Math.floor(data.length / itemsPerPage);
        if (ev.target.dataset.value === "prev"){
            pageNo --;
            if (pageNo < 0) pageNo = amountOfPages - 1; 
        } else if (ev.target.dataset.value === "next"){
            pageNo ++;
            if (pageNo >= amountOfPages) pageNo = 0;
        } else pageNo = ev.target.dataset.value - 1;
    
        displayData(pagination(filteredData, pageNo)[pageNo]);
    };    
});

clearBtn.addEventListener("click", ()=>{
    pageNo = 0;
    filterData(data, true);
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    colors.forEach(color => {
        color.classList.remove("selected");
    });
    name.value = "";
    lowPrice.value = "";
    highPrice.value = "";
    clearBtn.classList.add("hide");
});

items.addEventListener("keyup", () => {
    const value = parseInt(items.value);
    if (value > 2) {
        itemsPerPage = value
    } else itemsPerPage = 3;
    pageNo = 0;
    displayData(pagination(filteredData, pageNo)[pageNo]);
});

export {name, lowPrice, highPrice, clearBtn, pageNo, itemsPerPage};