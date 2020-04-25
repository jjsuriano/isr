const carousel_container = document.querySelector('.container');
const carousel_step = document.querySelectorAll('.container .step-wrapper');

const next_1 = document.querySelector('#next-1');
const prev_2 = document.querySelector('#prev-2');
const next_2 = document.querySelector('#next-2');
const prev_3 = document.querySelector('#prev-3');
const reset = document.querySelector('#reset');

let width = carousel_step[0].clientWidth;
let indicator = 0;

var onresize = function() {
    //your code here
    //this is just an example
    width_x = document.body.clientWidth;
    width = carousel_step[0].clientWidth;
    let cont = document.getElementById('box');
    cont.style.transitionDuration = '0s';
    cont.style.transform = 'translateX('+ -width*indicator +'px)';
 }

let option = 0;

window.addEventListener("resize", onresize);

next_1.addEventListener('click', ()=> {
    const choice = document.querySelector('input[name=step-1]:checked');
    if (choice === null) {
        return;
    } else {
        option = choice.value;
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
    document.getElementsByName("step-1")[0].checked = false;
    document.getElementsByName("step-1")[1].checked = false;
    document.getElementsByName("step-1")[2].checked = false;

    // Erase the values in the text inputs
    document.getElementsByClassName("text-input")[0].value = "";
    document.getElementsByClassName("text-input")[1].value = "";
});