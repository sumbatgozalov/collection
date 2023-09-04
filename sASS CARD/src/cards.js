const LOCAL_URL = "http://localhost:3000/datas";
const container = document.querySelector(".cards");
let jsonData;
const prev = document.querySelector(".btn-left");
const next = document.querySelector(".btn-right");

const getPIC = async () => {
  try {
    const response = await fetch(LOCAL_URL);
    jsonData = await response.json();

    jsonData.forEach((el) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${el.picture}" >
        <h2>${el.text}</h2>`;
      container.append(card);
    });

    const cardWidth = container.querySelector(".card").offsetWidth;
    let maxScrollLeft = container.scrollWidth - container.clientWidth;

    console.log(maxScrollLeft);

    next.addEventListener("click", () => {
      if (container.scrollLeft < maxScrollLeft) {
        container.scrollLeft += cardWidth;

        // console.log("her click sonra", container.scrollLeft);
        prev.style.visibility = "visible";
      } else if (container.scrollLeft >= maxScrollLeft - container.scrollLeft) {
        next.style.visibility = "hidden";
      }
    });

    prev.addEventListener("click", () => {
      if (container.scrollLeft > 0) {
        container.scrollLeft -= cardWidth;
        next.style.visibility = "visible";
      } else if (container.scrollLeft == 0) {
        prev.style.visibility = "hidden";
      }
    });
  } catch (error) {
    console.error(error);
  }
};

getPIC();
