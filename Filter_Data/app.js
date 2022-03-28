import data from "./data.js";
import {checkboxes, colors, displayData, displayDynamicFilters} from "./utils/utils.js";
import filterData from "./filters/filter.js";

//select DOM elements
export const name = document.querySelector("#name");
export const lowPrice = document.querySelector("#lprice")
export const highPrice = document.querySelector("#hprice")
export const clearBtn = document.querySelector(".clear");


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

const colorFilterEvent = (data) => {
    colors.forEach(color => {
        color.addEventListener("click", (ev) => {
            if (ev.target.classList.contains("colorbox")){
                ev.target.classList.toggle("selected");
                filterData(data);
            };
        });
    });
};

displayData(data);
displayDynamicFilters(data);

companyFilterEvent(data);
nameFilterEvent(data);
priceFilterEvent(data);
colorFilterEvent(data);


clearBtn.addEventListener("click", ()=>{
    displayData(data);
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