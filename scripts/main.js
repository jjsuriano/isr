const carousel_container = document.querySelector('.container');
const carousel_step = document.querySelectorAll('.container .step-wrapper');

const next_1 = document.querySelector('#next-1');
const prev_2 = document.querySelector('#prev-2');
const next_2 = document.querySelector('#next-2');
const prev_3 = document.querySelector('#prev-3');
const reset = document.querySelector('#reset');

let width = carousel_step[0].clientWidth;
let indicator = 0;

let option = 0;
let ingresos = 0;
let gastos = 0;

// FUNCTIONS = = = = =

function formatCurrency(total) {
    let neg = false;
    if(total < 0) {
        neg = true;
        total = Math.abs(total);
    }

    if (isNaN(total) || total == 0) {
      return ""
    }

    return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

// CON DEPENDENCIA LABORAL - - - - -

function isss(salario) {
    if (salario > 1000) {
      return 1000*0.03
    }
    return salario*0.03
}

function afp(salario) {
    if (salario > 6500) {
        return 6500*0.0725
    }
    return salario*0.0725
}

function impuesto_planilla_mensual(salario) {
    const gravado = salario - isss(salario) - afp(salario);
    let porcentaje = 0;
    let base = 0;
    let cuota = 0;
    let exceso = 0;

    console.log(gravado)

    if (gravado <= 472) {
        return 0;
    } else if (472.01 <= gravado && gravado <= 895.24) {
        porcentaje = 0.1;
        base = 472;
        cuota = 17.67;
        exceso = gravado - base;
    } else if (895.25 <= gravado && gravado <= 2038.10) {
        porcentaje = 0.2;
        base = 895.24;
        cuota = 50;
        exceso = gravado - base
    } else if (gravado >= 2038.11) {
        porcentaje = 0.3;
        base = 2038.10;
        cuota = 288.57;
        exceso = gravado - base;
    }
    return (exceso * porcentaje) + cuota;
}
  

var onresize = function() {
    width_x = document.body.clientWidth;
    width = carousel_step[0].clientWidth;
    let cont = document.getElementById('box');
    cont.style.transitionDuration = '0s';
    cont.style.transform = 'translateX('+ -width*indicator +'px)';
 }

window.addEventListener("resize", onresize);

next_1.addEventListener('click', ()=> {
    const choice = document.querySelector('input[name=step-1]:checked');
    if (choice === null) {
        return;
    } else {
        option = choice.value;

        if (option == 1) {
            document.getElementById("2nd-input").value = ""
            document.getElementById("2nd-input").removeAttribute("disabled", "disabled");
            document.getElementById("2nd-wrapper").hidden = true;
            document.getElementById("3rd-wrapper").hidden = true;
            document.getElementById("4th-wrapper").hidden = true;
        }

        if (option == 2) {
            document.getElementById("2nd-input").value = 1600.00
            document.getElementById("2nd-input").setAttribute("disabled", "disabled");
            document.getElementById("2nd-wrapper").hidden = false;
            document.getElementById("3rd-wrapper").hidden = false;
            document.getElementById("4th-wrapper").hidden = false;
        } 

        if (option == 3) {
            document.getElementById("2nd-input").value = ""
            document.getElementById("2nd-input").removeAttribute("disabled", "disabled");
            document.getElementById("2nd-wrapper").hidden = false;
            document.getElementById("3rd-wrapper").hidden = true;
            document.getElementById("4th-wrapper").hidden = true;
        }
        carousel_container.style.transition = 'transform 0.2s ease-in-out';
        indicator = 1;
        carousel_container.style.transform = 'translateX('+ -width*1 +'px)';
    }
});

prev_2.addEventListener('click', ()=> {
    
    carousel_container.style.transition = 'transform 0.2s ease-in-out';
    indicator = 0;
    carousel_container.style.transform = 'translateX('+ 0 +'px)';

});

next_2.addEventListener('click', ()=> {
    const income = document.getElementById('1st-input').value;
    const expenses = document.getElementById('2nd-input').value;
    const health = document.getElementById('3rd-input').value;
    const retirement = document.getElementById('4th-input').value;

    if (option == 1) {
        if (income == "") {
            return;
        } else {
            document.getElementById("header-results-a-pagar").textContent = "Libres";
            var results_gastos = document.getElementsByClassName("results-gastos");
            for (var i = 0; i < results_gastos.length; i++) {
                results_gastos[i].hidden = true;
            }
            let tax = impuesto_planilla_mensual(income);
            document.getElementById("impuestos").textContent = formatCurrency(tax);
            let result = income - isss(income) - afp(income) - tax;
            document.getElementById("a-pagar").textContent = formatCurrency(result);
        }
    }

    if (option == 2) {
        if (income == "" || health == "" || retirement == "") {
            return;
        } else {
            document.getElementById("header-results-a-pagar").textContent = "Valor a Pagar";
            var results_gastos = document.getElementsByClassName("results-gastos");
            for (var i = 0; i < results_gastos.length; i++) {
                results_gastos[i].hidden = false;
            }
        }
    }

    if (option == 3) {
        if (income == "") {
            return;
        } else {
            document.getElementById("header-results-a-pagar").textContent = "Valor a Pagar";
            var results_gastos = document.getElementsByClassName("results-gastos");
            for (var i = 0; i < results_gastos.length; i++) {
                results_gastos[i].hidden = false;
            }
        }
    }
 
    document.getElementById("salario").textContent = formatCurrency(income);
    document.getElementById("isss").textContent = formatCurrency(isss(income));  
    document.getElementById("afp").textContent = formatCurrency(afp(income));  

    carousel_container.style.transition = 'transform 0.2s ease-in-out';
    indicator = 2;
    carousel_container.style.transform = 'translateX('+ -width*2 +'px)';
});

prev_3.addEventListener('click', ()=> {
    carousel_container.style.transition = 'transform 0.2s ease-in-out';
    indicator = 1;
    carousel_container.style.transform = 'translateX('+ -width*1 +'px)';
});

reset.addEventListener('click', ()=> {
    carousel_container.style.transition = 'transform 0.2s ease-in-out';
    indicator = 0;
    carousel_container.style.transform = 'translateX('+ width*0 +'px)';

    // Erase the checked option
    var radios = document.getElementsByName("step-1");
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    // Erase the values in the text inputs
    var text_inputs = document.getElementsByClassName("text-input");
    for (var i = 0; i < text_inputs.length; i++) {
        text_inputs[i].value = "";
    }

     // Erase the values in the results panel
    var results = document.getElementsByClassName("results-value");
    for (var i = 0; i < results.length; i++) {
        results[i].textContent = "";
    }
});