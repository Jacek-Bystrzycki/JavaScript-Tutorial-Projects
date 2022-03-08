import get from "./getElement.js";

const displayDrinks = (drinksData) => {
    const {drinks} = drinksData;
    if (drinks){
        get(".title").style.display = "none";
        const displayDrinks = drinks.map (drink => {
        const {idDrink:id, strDrink:name, strDrinkThumb:image} = drink;
        return `<a href="./drink.html">
          <article class="cocktail" data-id="${id}">
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
          </article>
        </a>`;
    }).join("");
    const section = get(".section-center");
    section.innerHTML = displayDrinks;
    return section;
    } else {
        get(".section-center").innerHTML = null;
        get(".title").style.display = "block";
        return null;
    };
};

export default displayDrinks;