function getElement(doc, selection, all) {
  let element;
  if (all) {
    element = doc.querySelectorAll(selection);
  } else {
    element = doc.querySelector(selection);
  }

  if (element && !all) {
    return element;
  } else if (element[0] && all) {
    return element;
  } else {
    throw new Error(
      `Please check "${selection}" selector, no such element/s exists`
    );
  }
}

function Gallery(element) {
  this.container = element;
  this.images = [...getElement(this.container, ".img", true)];
  this.modal = getElement(document, ".modal", false);
  this.modalImg = getElement(document, ".main-img", false);
  this.modalImages = getElement(document, ".modal-images", false);
  this.imageName = getElement(document, ".image-name", false);
  this.closeBtn = getElement(document, ".close-btn", false);
  this.nextBtn = getElement(document, ".next-btn", false);
  this.prevBtn = getElement(document, ".prev-btn", false);
  const self = this; //self reference
  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.chooseImage = this.chooseImage.bind(this);
  this.x = this.chooseImage.bind(this);

  this.container.addEventListener("click", function (ev) {
    const target = ev.target;
    if (target.classList.contains("img")) {
      self.openModal(target, self.images);
    }
  });
}

//open modal
Gallery.prototype.openModal = function (selectedImage, list) {
  this.modal.classList.add("open");
  const modal = list
    .map(function (item) {
      return (item = `<img
            src="${item.src}"
            title="${item.title}"
            class="${
              item.dataset.id === selectedImage.dataset.id
                ? "modal-img selected"
                : "modal-img"
            }"
            data-id="${item.dataset.id}"
            alt="${item.alt}"
          />`);
    })
    .join("");

  this.modalImages.innerHTML = modal;
  this.setMainImage(selectedImage);
  this.closeBtn.addEventListener("click", this.closeModal);
  this.nextBtn.addEventListener("click", this.nextImage);
  this.prevBtn.addEventListener("click", this.prevImage);
  this.modalImages.addEventListener("click", this.chooseImage);
};
//close modal
Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  this.closeBtn.removeEventListener("click", this.closeModal);
  this.nextBtn.removeEventListener("click", this.nextImage);
  this.prevBtn.removeEventListener("click", this.prevImage);
  this.modalImages.removeEventListener("click", this.chooseImage);
};
Gallery.prototype.nextImage = function () {
  const selected = getElement(this.modalImages, ".selected", false);
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove("selected");
  this.setMainImage(next);
  next.classList.add("selected");
};
Gallery.prototype.prevImage = function () {
  const selected = getElement(this.modalImages, ".selected", false);
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove("selected");
  this.setMainImage(prev);
  prev.classList.add("selected");
};

Gallery.prototype.chooseImage = function (ev) {
  if (ev.target.classList.contains("modal-img")) {
    const selected = getElement(this.modalImages, ".selected", false);
    selected.classList.remove("selected");
    this.setMainImage(ev.target);
    ev.target.classList.add("selected");
  }
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

const nature = new Gallery(getElement(document, ".nature", false));
const city = new Gallery(getElement(document, ".city", false));
