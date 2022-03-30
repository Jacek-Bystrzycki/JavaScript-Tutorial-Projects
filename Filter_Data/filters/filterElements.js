import {checkboxes, colors} from "../utils/utils.js";
import {name, lowPrice, highPrice} from "../app.js";

//Filter by companies function
const filterByCompanies = (data) => {
    let newData = [];

    let arrayCheckboxes = [...checkboxes];

    arrayCheckboxes = arrayCheckboxes.map(checkbox => {
        return checkbox.checked;
    });

    let notEmpty = arrayCheckboxes.reduce((total, value) => {
        return total = total || value;
    }, false);

    if (!notEmpty){
        newData = [...data];
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
    };
    return newData;
};

//Filter by name function
const filterByName = (data) => {
    let newData = [];

    if (name.value){
        const value = name.value.toLowerCase();
        data.forEach(item => {
            if (item.name.toLowerCase().includes(value)){
                newData.push(item);
            };
        });
    } else {
        newData = [...data];
    };
    return newData;
};

//Filter by price function
const filterByPrice = (data) => {
    let newData = [];

    const low = parseInt(lowPrice.value) * 10;
    const high = parseInt(highPrice.value) * 10;

    if (low >= 0 && high >= 0){
        data.forEach(item => {
            if ((item.price >= low && item.price <= high) || (item.price >= low && high === 0)){
                newData.push(item);
            };
        });
    } else {
        newData = [...data];
    };
    return newData;
};

//Filter by colors funcion
const filterByColors = (data) => {
    let newData = [];

    let arrayColors = [...colors];

    arrayColors = arrayColors.map(color => {
        return color.classList.contains("selected");
    });

    let notEmpty = arrayColors.reduce((total, value) => {
        return total = total || value;
    }, false);

    if (!notEmpty){
        newData = [...data];
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
    };
    return newData;
};

export {filterByCompanies, filterByName, filterByPrice, filterByColors};