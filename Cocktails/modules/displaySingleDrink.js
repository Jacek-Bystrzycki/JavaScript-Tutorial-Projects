import get from "./getElement.js";

const displayDrink = (drinks) => {
    const {strDrink:name, strDrinkThumb:image, strInstructions:desc} = drinks.drinks[0];

    let ingredients = [];
    for (let i=1; i < 16; i++){
        const ingr = `strIngredient${i}`;
        if (drinks.drinks[0][ingr]){
            ingredients.push(drinks.drinks[0][ingr]);
        }
    };
    ingredients = ingredients.map(ingr => {
        return `<li><i class="far fa-check-square"></i>${ingr}</li>`;
    }).join("");
    ingredients = `<ul class="drink-ingredients">${ingredients}</ul>`;

    const container = get(".single-drink");
    container.innerHTML = `<img src="${image}" class="drink-img" alt="${name}">
      <article class="drink-info">
        <h2 class="drink-name">${name}</h2>
        <p class="drink-desc">${desc}</p>
        ${ingredients}
        <a href="./index.html" class="btn">all cocktails</a>
      </article>`;
    document.title = name;
};

export default displayDrink;