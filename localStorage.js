function getLocalStorageData() {
  //   const items = JSON.parse(localStorage.getItem("data"));
  //   return items ? items : [];
  return JSON.parse(localStorage.getItem("data")) ?? [];
}

function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

export { getLocalStorageData, saveData };
