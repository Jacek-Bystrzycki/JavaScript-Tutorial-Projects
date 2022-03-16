import { getElement } from './utils.js';

const sidebar = getElement(".sidebar-overlay");
const showSidebarBtn = getElement(".toggle-nav");
const closeSidebarBtn = getElement(".sidebar-close");

showSidebarBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
});

closeSidebarBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
});

