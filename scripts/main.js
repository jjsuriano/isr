const carousel_container = document.querySelector('.container');
const carousel_step = document.querySelectorAll('.container .step-wrapper');

const next_1 = document.querySelector('#next-1');
const prev_2 = document.querySelector('#prev-2');
const next_2 = document.querySelector('#next-2');
const prev_3 = document.querySelector('#prev-3');
const reset = document.querySelector('#reset');

const width = carousel_step[0].clientWidth;

let option = 0;

next_1.addEventListener('click', ()=> {
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    carousel_container.style.transform = 'translateX('+ -width*1 +'px)';
    option = document.querySelector().
});

prev_2.addEventListener('click', ()=> {
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    carousel_container.style.transform = 'translateX('+ 0 +'px)';
});

next_2.addEventListener('click', ()=> {
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    carousel_container.style.transform = 'translateX('+ -width*2 +'px)';
});

prev_3.addEventListener('click', ()=> {
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    carousel_container.style.transform = 'translateX('+ -width*1 +'px)';
});

reset.addEventListener('click', ()=> {
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    carousel_container.style.transform = 'translateX('+ width*0 +'px)';
    
});