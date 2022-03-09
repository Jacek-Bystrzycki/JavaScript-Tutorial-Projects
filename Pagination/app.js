import fetchFollowers from './fetchFollowers.js'
import displayFollowers from './displayFollowers.js'
import paginate from './paginate.js'
import displayButtons from './displayButtons.js'

const title = document.querySelector(".section-title h1");
const btnContainer = document.querySelector(".btn-container");

let index = 0;
let pages = [];

const init = () => {
    fetchFollowers().then(users => {
        title.textContent = "pagination";
        pages = paginate(users);
        displayFollowers(pages[index]);
        displayButtons(btnContainer, pages, index);
    });
}

const changePage = () => {
    btnContainer.addEventListener("click",(ev)=>{
        let interlock = 0;
        if (ev.target.classList.contains("page-btn")){
            index = parseInt(ev.target.dataset.index);
            interlock = 1;
        } else if ((ev.target.classList.contains("prev-btn"))){
            if (index > 0) index--; 
            else index = pages.length - 1;
            interlock = 1;     
        } else if ((ev.target.classList.contains("next-btn"))){
            if (index < pages.length - 1) index++;
            else index = 0;
            interlock = 1;
        }
        if (interlock) {
            displayFollowers(pages[index]);
            displayButtons(btnContainer, pages, index);
        }
    })
}

window.addEventListener("load", init);
changePage();
