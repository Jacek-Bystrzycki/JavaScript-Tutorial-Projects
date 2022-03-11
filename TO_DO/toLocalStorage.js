const toLocalStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

export default toLocalStorage;
