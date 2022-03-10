// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
document.querySelector("footer .date ").innerText = new Date().getFullYear();

// ********** close links ************
const toggleBtn = document.querySelector("#nav .nav-toggle");
const linksContainer = document.querySelector("#nav .links-container");
const links = document.querySelector("#nav .links");

toggleBtn.addEventListener("click", () => {
    const linksContainerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;

    if (linksContainerHeight !== 0) {
        linksContainer.style.height = 0;
    }
    else {
        linksContainer.style.height = `${linksHeight}px`;
    }
})

const navBar = document.querySelector("nav");
const topLink = document.querySelector(".top-link");

// ********** fixed navbar ************
window.addEventListener("scroll", () => {
    const navBarHeight = navBar.getBoundingClientRect().height;
    const offsetY = window.pageYOffset;
    if (offsetY > navBarHeight) {
        navBar.classList.add("fixed-nav")
    }
    else {
        navBar.classList.remove("fixed-nav")
    }
    //show "arrow to home" button
    if (offsetY > 500) {
        topLink.classList.add("show-link")
    }
    else {
        topLink.classList.remove("show-link")
    }
    // if (offsetY > 0) {
    //     linksContainer.style.height = 0;
    // }
    // console.log(this.pageYOffset)
})

// ********** smooth scroll ************
// select links

const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function(link){
    link.addEventListener("click", (ev)=> {
        ev.preventDefault();
        const id = document.getElementById(ev.currentTarget.getAttribute("href").slice(1));
        const navBarHeight = navBar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const isFixed = navBar.classList.contains("fixed-nav");
        let position = id.offsetTop - navBarHeight;
        if (!isFixed){
            position -= navBarHeight;
        }
        if (navBarHeight > 82){
            position += containerHeight;
        }      
        window.scrollTo(0, position)
        linksContainer.style.height = 0;
    })
    
})

