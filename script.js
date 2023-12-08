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
