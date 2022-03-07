import get from "./getElement.js";

function displayUser(userData, btns) {
  //display data after DOMLoaded or RandomUser button (always show name info)
  const element = get(".icon");
  putData(userData, btns, element);

  //display data when one of icons have been pressed
  btns.addEventListener("click", (ev) => {
    const element = ev.target.parentElement;
    if (element.classList.contains("icon")) {
      putData(userData, btns, element);
    }
  });
}

function putData(
  { name, email, phone, age, street, password, photo },
  btns,
  element
) {
  //prepare element to display
  const photoElement =
    btns.previousElementSibling.previousElementSibling.previousElementSibling;
  photoElement.src = photo;
  const title = btns.previousElementSibling.previousElementSibling;
  const value = btns.previousElementSibling;

  //delete active class from each button
  const icons = get(".icon", true);
  icons.forEach((item) => {
    item.classList.remove("active");
  });

  //put data regaring to selected element
  const elementLabel = element.dataset.label;
  switch (elementLabel) {
    case "name":
      title.textContent = "My name is";
      value.textContent = name;
      element.classList.add("active");
      break;
    case "email":
      title.textContent = "My email address is";
      value.textContent = email;
      element.classList.add("active");
      break;
    case "phone":
      title.textContent = "My phone number is";
      value.textContent = phone;
      element.classList.add("active");
      break;
    case "age":
      title.textContent = "My age is";
      value.textContent = age;
      element.classList.add("active");
      break;
    case "street":
      title.textContent = "My home address is";
      value.textContent = street;
      element.classList.add("active");
      break;
    case "password":
      title.textContent = "My password is";
      value.textContent = password;
      element.classList.add("active");
      break;
  }
}

export default displayUser;
