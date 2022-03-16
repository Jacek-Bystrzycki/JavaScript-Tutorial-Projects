import { getStorageItem, setStorageItem } from './utils.js';

const storageKey = "products";
let storeValue = getStorageItem(storageKey);

const setupStore = products => {
    storeValue = products.map(product => {
        const id = product.id;
        const {company, featured, colors, price, name} = product.fields;
        const image = product.fields.image[0].thumbnails.large.url;
        return {id, company, featured, colors, price, name, image};       
    });
    setStorageItem(storageKey, storeValue);
};

const findProduct = id => {
    return storeValue.find(product => product.id === id);
};

export { storeValue as store, setupStore, findProduct };
  