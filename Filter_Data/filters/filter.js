import {filterByCompanies, filterByName, filterByPrice, filterByColors} from "./filterElements.js";
import { displayData } from "../utils/utils.js";
import { clearBtn } from "../app.js";

const filterData = (data) => {
    //filter by company
    const companyFilter = filterByCompanies(data);

    //filter by name
    const nameFilter = filterByName(companyFilter.newData);

    //filter by price
    const priceFilter = filterByPrice(nameFilter.newData);

    //filter by color
    const colorFilter = filterByColors(priceFilter.newData);

    //display data
    displayData(colorFilter.newData);

    //control clear btn visibility
    if (!companyFilter.filterActive && !nameFilter.filterActive && !priceFilter.filterActive && !colorFilter.filterActive) {
        clearBtn.classList.add("hide");
    } else {
        clearBtn.classList.remove("hide");
    };
};

export default filterData;