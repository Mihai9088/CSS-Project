let menu = document.getElementById("menu");
menu.addEventListener("click", function () {
  this.classList.toggle("open");
  document.querySelector("nav ul").classList.toggle("show");
});

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

fetch("https://api.sampleapis.com/coffee/hot")
  .then((response) => response.json())
  .then((data) => {
    const slidesContainer = document.querySelector("[data-slides]");

    data.forEach((drink, index) => {
      const slide = document.createElement("li");
      slide.classList.add("slide");

      if (index === 0) {
        slide.dataset.active = true;
      }
      const image = document.createElement("img");
      image.src = drink.image;
      image.alt = `Coffee Image #${index + 1}`;
      slide.appendChild(image);
      slidesContainer.appendChild(slide);
    });
  })
  .catch((error) => console.error("Error:", error));

const name = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const error = document.getElementById("error");
const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    console.log("Form is valid. Submitting...");
  }
});

function validateForm() {
  clearErrorMessages();

  const firstName = name.value.trim();
  if (firstName === "") {
    displayError("Please enter your first name", "firstNameError");
    return false;
  }

  const lastNnameValue = lastName.value.trim();
  if (lastNnameValue === "") {
    displayError("Enter your last name", "lastNameError");
    return false;
  }

  const emailAddress = email.value.trim();
  if (emailAddress === "") {
    displayError("Enter your email address", "emailError");
    return false;
  } else if (!isValidEmail(emailAddress)) {
    displayError("Enter a valid email address", "emailError");
    return false;
  }

  const messageSubject = subject.value.trim();
  if (messageSubject === "") {
    displayError("Enter the subject", "subjectError");
    return false;
  }

  const messageContent = message.value.trim();
  if (messageContent === "") {
    displayError("Enter your message", "messageError");
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayError(errorMessage, errorElementId) {
  const errorElement = document.getElementById(errorElementId);
  errorElement.textContent = errorMessage;
}

function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}
