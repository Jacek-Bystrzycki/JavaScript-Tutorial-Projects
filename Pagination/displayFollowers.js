const container = document.querySelector(".container");

const display = (users) => {
    const newUsers = users.map(user => {
        const {avatar_url:img, html_url:link, login:name} = user;
        return `<article class="card">
        <img src="${img}" alt="${name}"/>
        <h4>${name}</h4>
        <a href="${link}" class="btn">view profile</a>
        </article>`;
    }).join("");
    container.innerHTML = newUsers;
};

export default display;
