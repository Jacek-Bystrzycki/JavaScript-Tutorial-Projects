import get from "./getElement.js";
import presentDrinks from "./presentDrinks.js";
import setDrink from "./setDrink.js";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const form = get(".search-form");
const input = get("[name=drink]");

form.addEventListener("keyup", async (ev) => {
    ev.preventDefault();
    const value = input.value;
    if (value){
        const section = await presentDrinks(`${url}${value}`);
        setDrink(section);
    };
});