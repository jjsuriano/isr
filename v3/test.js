let tipoDeTrabajo = document.querySelector("input[name=step0]:checked").value;
let tiempoDeIngreso = document.querySelector("input[name=step1]:checked").value;
let showResults = false;
let ingresos;

const ingresosInput = document.querySelector("#ingresos-input");
const ingresosOutput = document.querySelector("#ingresos-output");
const resultsSection = document.querySelector("#results");

/* HELPER FUNCTIONS -------------------------------------------------------- */

function changeIngresos() {
  const value = Number(this.value);
  ingresos = value <= 0 ? null : value;
  displayResults();
}

function displayResults() {
  if (showResults) {
  } else {
    ingresosOutput.innerHTML = numberToStrCurrency(ingresos);
  }
}

function numberToStrCurrency(num) {
  let neg = false;
  if (num < 0) {
    neg = true;
    num = Math.abs(num);
  }

  if (isNaN(num) || num === null) {
    return "";
  }

  return (
    (neg ? "-$" : "$") +
    parseFloat(num, 10)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .toString()
  );
}

/* CALCULATING FUNCTIONS --------------------------------------------------- */

/* DOM INTERACTIONS -------------------------------------------------------- */

document.querySelectorAll("input[name=step0]").forEach((element) => {
  element.addEventListener("change", () => {
    tipoDeTrabajo = element.value;
  });
});

document.querySelectorAll("input[name=step1]").forEach((element) => {
  element.addEventListener("change", () => {
    tiempoDeIngreso = element.value;
  });
});

ingresosInput.addEventListener("keyup", changeIngresos);
ingresosInput.addEventListener("change", changeIngresos);
