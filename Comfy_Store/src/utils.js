const allProductsUrl = 'https://course-api.com/javascript-store-products';
const singleProductUrl =
  'https://course-api.com/javascript-store-single-product?id=';

const getElement = (selection, isList) => {
  let element;
  if(!isList) {
    element = document.querySelector(selection);
    if (element) return element;
  }
  else {
    element = document.querySelectorAll(selection);
    if (element.length > 0) return element;
  };

  throw new Error(`${isList?"querySelectorAll":"querySelector"} did not find "${selection}" ${isList?"elements":"element"}!`);
};

const formatPrice = value => {
  const price = new Intl.NumberFormat("en-US", {style:"currency", currency:"USD"}).format((value / 100).toFixed(2));
  return price;
};

const getStorageItem = key => {
  let value = localStorage.getItem(key);
  if (value) value = JSON.parse(value);
  else value = [];
  return value;
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
};
