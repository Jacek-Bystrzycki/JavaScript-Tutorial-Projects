import getId from "./modules/getQuery.js";
import fetchDrink from "./modules/fetchDrinks.js"
import displayDrink from "./modules/displaySingleDrink.js";
import toggleLoading from "./modules/toggleLoading.js";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

window.addEventListener("DOMContentLoaded", async () => {
    const id = getId("id");
    const queryUrl = `${url}${id}`;
    const drink = await fetchDrink(queryUrl);
    toggleLoading();
    displayDrink(drink);
});