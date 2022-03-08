import get from "./getElement.js";

const setDrink = drinkDOM => {
    if (!drinkDOM) return;
    const allLinks = get(".section-center > a", true);
    allLinks.forEach(link => {
        const id = link.firstElementChild.dataset.id;
        link.href = `${link.href}?id=${id}`
    });
};

export default setDrink;