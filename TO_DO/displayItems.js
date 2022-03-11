const displayItems = (items) => {
  const list = document.querySelector(".list");

  const newiItems = items
    .map((item) => {
      return `<div class="item" data-id="${item.id}">
            <span>${item.value}</span>
            <div class="btn-container">
              <button class="btn-edit">Edit</button>
              <button class="btn-delete">Delete</button>
            </div>
          </div>`;
    })
    .join("");

  list.innerHTML = newiItems;
};

export default displayItems;
