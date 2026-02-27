function formatDate(date) {
  const data = new Date(date);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
  const ano = data.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}

function createSVG() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return svg;
}

export { formatDate, createSVG };
