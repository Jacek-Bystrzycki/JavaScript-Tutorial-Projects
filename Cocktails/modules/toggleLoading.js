import get from "./getElement.js";

const toggleLoading = () => {
    const loadElement = get(".loading", false);
    if (loadElement.classList.contains("hide-loading")){
        loadElement.classList.remove("hide-loading");
    } else {
        loadElement.classList.add("hide-loading");
    }; 
};

export default toggleLoading;