import get from "./modules/getElement.js";
import getUser from "./modules/getUser.js";
import displayUser from "./modules/displayUser.js";

const url = "https://randomuser.me/api/";
const btnsContainer = get(".container .values-list");
const btn = get(".btn");

const showUser = async () => {
  try {
    //get user data
    const userData = await getUser(url);
    //display user data
    displayUser(userData, btnsContainer);
  } catch (error) {
    console.log(`Cannot get user data: ${error}`);
  }
};

//Event Listeners
window.addEventListener("DOMContentLoaded", showUser);
btn.addEventListener("click", showUser);
