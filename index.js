import { getLocalStorageData, saveData } from "./localStorage.js";
import { formatDate, createSVG } from "./utils.js";

const form = document.querySelector(".form");
const btn = document.querySelector(".btn");
const foodList = document.querySelector(".food-list");
const yesBtn = document.querySelector("#yes");
const noBtn = document.querySelector("#no");
const foodInput = document.querySelector(".food-input input");

let data = [];

function changeInput(type) {
  if (type === "yes") {
    foodInput.removeAttribute("disabled");
  } else if (type === "no") {
    foodInput.setAttribute("disabled", "disabled");
  }
}

yesBtn.addEventListener("click", () => changeInput("yes"));
noBtn.addEventListener("click", () => changeInput("no"));

function deleteItem(item) {
  // const data = getLocalStorageData();
  data = data.filter((food) => item.id !== food.id);
  // novos dados ai salva dnv
  saveData(data);

  console.log("data", data);

  loadData();
}

function loadData() {
  foodList.innerHTML = "";

  console.log("data", data);
  for (const food of data) {
    loadItem(food);
  }
}

function loadItem(item) {
  const card = document.createElement("li");
  card.classList.add("card");

  const p1 = document.createElement("p");
  const p3 = document.createElement("p");

  // console.log("Item", item);

  const div1 = document.createElement("div");
  div1.appendChild(p1);

  div1.classList.add("card-texts");

  const div2 = document.createElement("div");

  const svgFood = createSVG();
  const svgGym = createSVG();

  svgFood.classList.add("svg-icon");
  svgGym.classList.add("svg-icon");

  let svgFoodFill = item.foodOption === "yes" ? "#f03e3e" : "#5ab15a";
  let svgGymFill = item.gymOption === "yes" ? "#5ab15a" : "#f03e3e";

  svgGym.innerHTML += `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill=${svgGymFill}
      viewBox="0 0 256 256"
    >
      <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.82c0,.06,0,.12,0,.18s0,.12,0,.18V192Zm32-24H208V88h16Z"></path>
    </svg>
  `;

  svgFood.innerHTML += `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill=${svgFoodFill}
      viewBox="0 0 256 256"
    >
      <path d="M240,80a40,40,0,0,0-40-40H48a40,40,0,0,0-16,76.65V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V116.65A40.06,40.06,0,0,0,240,80ZM48,120a8,8,0,0,0,0-16,24,24,0,0,1,0-48h96a24,24,0,0,1,0,48,8,8,0,0,0,0,16v80H48Zm152-16a8,8,0,0,0,0,16v80H160V116.65A40,40,0,0,0,176,56h24a24,24,0,0,1,0,48Z"></path>
    </svg>
  `;

  const svgDelete = createSVG();

  svgDelete.innerHTML += `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#f03e3e"

      viewBox="0 0 256 256"
    >
      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
    </svg>
  `;

  svgDelete.classList.add("svg-icon");
  svgDelete.classList.add("svg-icon-delete");

  const foodDiv = document.createElement("div");

  foodDiv.append;

  div2.appendChild(p3);
  div2.appendChild(svgDelete);

  div2.classList.add("card-data");

  p1.textContent = item.food;

  foodDiv.classList.add("food-div");

  foodDiv.append(svgFood);
  foodDiv.append(p1);

  div1.append(foodDiv);
  div1.append(svgGym);

  // console.log("item data", item.date);

  p3.textContent = formatDate(item.date);

  card.appendChild(div1);
  card.appendChild(div2);

  svgDelete.addEventListener("click", () => deleteItem(item));

  foodList.appendChild(card);
}

function addItem(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const food = formData.get("food");
  const foodOption = formData.get("foodOption");
  const gymOption = formData.get("gymOption");

  let content = [
    { food: food },
    { foodOption: foodOption },
    { gymOption: gymOption },
  ];

  console.log("content", content);

  const item = {
    id: crypto.randomUUID(),
    food: content[0].food,
    foodOption: content[1].foodOption,
    gymOption: content[2].gymOption,
    date: new Date(),
  };

  data.push(item);

  saveData(data);

  loadData();

  form.reset();
}

form.addEventListener("submit", addItem);

function main() {
  data = getLocalStorageData();

  loadData();
}

main();
