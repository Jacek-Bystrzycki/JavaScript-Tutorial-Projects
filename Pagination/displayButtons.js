const displayButtons = (container, pages, activeIndex) => {

    let btns = pages.map((_, pageIndex) => {
        return `<button class="${activeIndex === pageIndex ? "page-btn active-btn" : "page-btn"}" data-index="${pageIndex}">${pageIndex + 1}</button>`;
    });

    btns.unshift(`<button class="prev-btn">prev</button>`);
    btns.push(`<button class="next-btn">next</button>`);
    container.innerHTML = btns.join("");
}

export default displayButtons
