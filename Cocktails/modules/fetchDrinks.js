const fetchDrinks = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`ERROR: ${err}`);
        return `ERROR!!! ${err}`;
    };
};

export default fetchDrinks;