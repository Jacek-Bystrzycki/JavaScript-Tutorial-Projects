import {checkboxes, colors} from "../utils/utils.js";
import {name, lowPrice, highPrice} from "../app.js";

const filterByCompanies = (data) => {
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
                if (checkbox.id.toLowerCase() === item.company.toLowerCase()){
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

const filterByColors = (data) => {
    let newData = [];
    let filterActive;

    let arrayColors = [...colors];

    arrayColors = arrayColors.map(color => {
        return color.classList.contains("selected");
    });

    let notEmpty = arrayColors.reduce((total, value) => {
        return total = total || value;
    }, false);

    if (!notEmpty){
        filterActive = false;
        newData = [...data];
        return {newData, filterActive}
    } else {
        colors.forEach(color => { 
        if (color.classList.contains("selected")){
            data.forEach(item => {
                const colorAttr = color.id.slice(4);
                if (colorAttr === item.color){
                    newData.push(item);
                };
            });
            };   
        });
        filterActive = true;
        return {newData, filterActive};
    };
};

export {filterByCompanies, filterByName, filterByPrice, filterByColors};