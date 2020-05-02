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
      return "$0.00"
    }

    return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

function gravado_anual(ingresos, gastos) {
    let salud = 800;
    let colegiatura = 800;
    let gravado = ingresos - salud - colegiatura - gastos;
    if (gravado <= 4064) {
      return 0;
    }
    return gravado;
}

function colorCode(result) {
    if (result <= 0) {
        document.getElementById("a-pagar").style.color = "green";
    } else {
        document.getElementById("a-pagar").style.color = "red";
    }
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

    if (gravado <= 472) {
        return 0.0;
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

// SIN DEPENDENCIA LABORAL - - - - -

function impuesto_honorarios_anual(ingresos, gastos){
    let gravado = gravado_anual(ingresos, gastos)
    let porcentaje = 0;
    let base = 0;
    let cuota = 0;
    let exceso = 0;

    if (gravado <= 4064) {
        return 0;
    } else if (4064.01 <= gravado && gravado <= 9142.86) {
        porcentaje = 0.1;
        base = 4064;
        cuota = 212.12;
        exceso = gravado - base
    } else if (9142.87 <= gravado && gravado <= 22857.14) {
        porcentaje = 0.2;
        base = 9142.86;
        cuota = 720;
        exceso = gravado - base
    } else if (gravado >= 22857.15) {
        porcentaje = 0.3;
        base = 22857.14;
        cuota = 3462.86;
        exceso = gravado - base
    }
    return (exceso * porcentaje) + cuota
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
            document.getElementById("5th-wrapper").hidden = true;
            document.getElementById("1st-header").textContent = "Salario Mensual (requerido)"
        }

        if (option == 2) {
            document.getElementById("2nd-input").value = 1600.00
            document.getElementById("2nd-input").setAttribute("disabled", "disabled");
            document.getElementById("2nd-wrapper").hidden = false;
            document.getElementById("3rd-wrapper").hidden = false;
            document.getElementById("4th-wrapper").hidden = false;
            document.getElementById("5th-wrapper").hidden = false;
            document.getElementById("1st-header").textContent = "Ingresos en el año (requerido)"
        } 

        if (option == 3) {
            document.getElementById("2nd-input").value = ""
            document.getElementById("2nd-input").removeAttribute("disabled", "disabled");
            document.getElementById("2nd-wrapper").hidden = false;
            document.getElementById("3rd-wrapper").hidden = true;
            document.getElementById("4th-wrapper").hidden = true;
            document.getElementById("5th-wrapper").hidden = true;
            document.getElementById("1st-header").textContent = "Ingresos en el año (requerido)"
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
    let expenses = document.getElementById('2nd-input').value;
    const health = document.getElementById('3rd-input').value;
    const retirement = document.getElementById('4th-input').value;

    if (expenses == "") {
        expenses = 0
    }

    if (option == 1) {
        if (income == "") {
            return;
        } else {
            document.getElementById("header-results-a-pagar").textContent = "Libres";
            document.getElementById("gastos").textContent = "-";
            let tax = impuesto_planilla_mensual(income);
            document.getElementById("impuestos").textContent = formatCurrency(tax);
            let result = income - isss(income) - afp(income) - tax;
            document.getElementById("a-pagar").textContent = formatCurrency(result);
            document.getElementById("isss").textContent = formatCurrency(isss(income));  
            document.getElementById("afp").textContent = formatCurrency(afp(income)); 
        }
    }

    if (option == 2) {
        if (income == "" || health == "" || retirement == "") {
            return;
        } else {
            document.getElementById("header-results-a-pagar").textContent = "Valor a Pagar";
            document.getElementById("isss").textContent = formatCurrency(health);
            document.getElementById("afp").textContent = formatCurrency(retirement);
            document.getElementById("gastos").textContent = formatCurrency(expenses);
            let result = 0;
            colorCode(result)
            document.getElementById("a-pagar").textContent = formatCurrency(result);
        }
    }

    if (option == 3) {
        if (income == "") {
            return;
        } else {
            document.getElementById("header-results-a-pagar").textContent = "Valor a Pagar";
            document.getElementById("isss").textContent = "-";
            document.getElementById("afp").textContent = "-";
            document.getElementById("gastos").textContent = formatCurrency(expenses);
            let tax = impuesto_honorarios_anual(income, expenses);
            document.getElementById("impuestos").textContent = formatCurrency(tax);
            let result = tax - (income*0.1);
            colorCode(result)
            document.getElementById("a-pagar").textContent = formatCurrency(result);
        }
    }
 
    document.getElementById("salario").textContent = formatCurrency(income);
 

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

    document.getElementById("a-pagar").style.color = "#4e5563";
});