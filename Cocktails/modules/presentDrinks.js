import fetchDrinks from "./fetchDrinks.js";
import displayDrinks from "./displayDrinks.js";
import toggleLoading from "./toggleLoading.js";

const presentDrinks = async (url) => {
    toggleLoading();
    const drinksData = await fetchDrinks(url);
    toggleLoading();
    const drinksDOM = displayDrinks(drinksData);
    return drinksDOM;
};

export default presentDrinks;