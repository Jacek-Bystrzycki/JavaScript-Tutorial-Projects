import presentDrinks from "./modules/presentDrinks.js";
import setDrink from "./modules/setDrink.js";
import "./modules/searchForm.js"

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const defaultQuery = "a";

window.addEventListener("DOMContentLoaded", async () => {
    const section = await presentDrinks(`${url}${defaultQuery}`);
    setDrink(section);
});