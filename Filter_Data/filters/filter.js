import {filterByCompanies, filterByName, filterByPrice, filterByColors} from "./filterElements.js";
import data from "../data.js";
import { displayData, pagination } from "../utils/utils.js";
import { clearBtn, pageNo} from "../app.js";

let filteredData = [...data];

//Combine all filters to work on each other
const filterData = (data, reset) => {
    //filter by company
    const companyFilter = filterByCompanies(data);

    //filter by name
    const nameFilter = filterByName(companyFilter);

    //filter by price
    const priceFilter = filterByPrice(nameFilter);

    //filter by color
    const colorFilter = filterByColors(priceFilter);

    //display data + data pagination
    //if call without reset display filtered data
    if (!reset){
        if(colorFilter.length > 0) {
            displayData(pagination(colorFilter, pageNo)[pageNo]);
        } else {
            displayData(colorFilter);
        };
        filteredData = [...colorFilter];
        clearBtn.classList.remove("hide");
    } else {
    //if call with reset display all data    
        displayData(pagination(data, pageNo)[pageNo]);
        filteredData = [...data];
        clearBtn.classList.add("hide");
    };
};

export {filterData, filteredData};