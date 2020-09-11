let ingresos;

const TRAMOS_MENSUALES = [0, 472, 895.24, 2038.1];
const PORCENTAJES = [0, 0.1, 0.2, 0.3];
const CUOTAS_FIJAS_MENSUALES = [0, 17.67, 60, 288.57];

let tipoDeTrabajo = document.querySelector("input[name=step0]:checked").value;
let tiempoDeIngreso = document.querySelector("input[name=step1]:checked").value;

const resultsSection = document.querySelector("#results");
const ingresosInput = document.querySelector("#ingresos-input");

/* HELPER FUNCTIONS -------------------------------------------------------- */

function displayResults() {
  if (tiempoDeIngreso === "mensual") {
    const composition = calculateMonthlyTaxes();
    createMonthlyResults(composition);
    if (tipoDeTrabajo === "planilla") {
    }
  }
}

function removeResults() {
  const resultsSection = document.querySelector("#results");
  resultsSection.innerHTML = "";
}

function createMonthlyResults(composition) {
  removeResults();
  const resultsSection = document.querySelector("#results");

  let ingresosOut = document.createElement("p");
  ingresosOut.id = "ingresos-output";
  ingresosOut.className = "results-text";
  ingresosOut.innerHTML =
    '<span class="results-heading">ingresos mensuales</span><span>' +
    ingresos.format() +
    "</span>";
  resultsSection.appendChild(ingresosOut);
  for (let i = 0; i < Object.keys(composition).length; i++) {
    let temp = document.createElement("p");
    resultsSection.appendChild(document.createElement("hr"));
    temp.id = Object.keys(composition)[i] + "-output";
    temp.className = "results-text";
    temp.innerHTML =
      '<span class="results-heading">' +
      Object.keys(composition)[i] +
      "</span><span>" +
      composition[Object.keys(composition)[i]] +
      "</span>";
    resultsSection.appendChild(temp);
  }
}

/* CALCULATING FUNCTIONS --------------------------------------------------- */

function calculateMonthlyTaxes() {
  let composition = {};

  if (tipoDeTrabajo === "planilla") {
    let isss, afp;
    if (ingresos > 1000) {
      isss = currency(1000).multiply(0.03);
    } else {
      isss = ingresos.multiply(0.03);
    }

    if (ingresos > 6500) {
      afp = currency(6500).multiply(0.0725);
    } else {
      afp = ingresos.multiply(0.0725);
    }

    composition.afp = afp.format();
    composition.isss = isss.format();

    const gravado = ingresos.subtract(afp).subtract(isss);
    let index = 0;

    if (TRAMOS_MENSUALES[0] <= gravado && gravado <= TRAMOS_MENSUALES[1]) {
      //   composition.tramo = 1;
      index = 0;
    } else if (
      TRAMOS_MENSUALES[1] < gravado &&
      gravado <= TRAMOS_MENSUALES[2]
    ) {
      //   composition.tramo = 2;
      index = 1;
    } else if (
      TRAMOS_MENSUALES[2] < gravado &&
      gravado <= TRAMOS_MENSUALES[3]
    ) {
      //   composition.tramo = 3;
      index = 2;
    } else if (TRAMOS_MENSUALES[3] < gravado) {
      //   composition.tramo = 4;
      index = 3;
    }

    const exceso = currency(gravado).subtract(TRAMOS_MENSUALES[index]);
    const impuestoTramo = exceso.multiply(PORCENTAJES[index]);
    const cuotaFija = currency(CUOTAS_FIJAS_MENSUALES[index]);

    composition.impuestos = impuestoTramo.add(cuotaFija).format();
    composition.liquido = currency(gravado)
      .subtract(composition.impuestos)
      .format();
  } else if (tipoDeTrabajo === "honorario") {
    composition.impuestos = ingresos.multiply(0.1).format();
    composition.liquido = ingresos.subtract(composition.impuestos).format();
  }

  return composition;
}

/* DOM INTERACTIONS -------------------------------------------------------- */

document.querySelectorAll("input[name=step0]").forEach((element) => {
  element.addEventListener("change", () => {
    tipoDeTrabajo = element.value;
    if (ingresos != null) {
      displayResults();
    }
  });
});

document.querySelectorAll("input[name=step1]").forEach((element) => {
  element.addEventListener("change", () => {
    tiempoDeIngreso = element.value;
    if (ingresos != null) {
      displayResults();
    }
  });
});

function changeIngresos() {
  const value = Number(this.value);
  ingresos = value <= 0 ? null : currency(value);
  if (ingresos != null) {
    displayResults();
  } else {
    removeResults();
  }
}

ingresosInput.addEventListener("keyup", changeIngresos);
ingresosInput.addEventListener("change", changeIngresos);
