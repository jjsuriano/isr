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
    var neg = false;
    if(total < 0) {
        neg = true;
        total = Math.abs(total);
    }

    if (isNaN(total) || total == 0) {
      return ""
    }

    return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
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
            document.getElementsByClassName("2nd-input")[0].value = 1600.00
            document.getElementsByClassName("2nd-input")[0].setAttribute("disabled", "disabled");
        } 
        
        if (option == 2) {
            document.getElementsByClassName("2nd-input")[0].value = ""
            document.getElementsByClassName("2nd-input")[0].removeAttribute("disabled", "disabled");
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
    const income = document.getElementsByClassName('text-input')[0].value;
    if (income === "") {
        return;
    } else {

        ingresos = income

        document.getElementById("salario").textContent = formatCurrency(income);  

        if (option == 1) {
            
        }

        if (option == 2) {

        }

        carousel_container.style.transition = 'transform 0.2s ease-in-out';
        indicator = 2;
        carousel_container.style.transform = 'translateX('+ -width*2 +'px)';
    }
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