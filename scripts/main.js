const carousel_container = document.querySelector('.container');
const carousel_step = document.querySelectorAll('.container .step-wrapper');

const next_1 = document.querySelector('#next-1');
const prev_2 = document.querySelector('#prev-2');
const next_2 = document.querySelector('#next-2');
const prev_3 = document.querySelector('#prev-3');
const reset = document.querySelector('#reset');

let counter = 0;

const width = carousel_step[0].clientWidth;

console.log(carousel_step);

next_1.addEventListener('click', ()=> {
    console.log("next-1 clicked")
    
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    counter++;
    carousel_container.style.transform = 'translateX('+ -width*1 +'px)';
});

prev_2.addEventListener('click', ()=> {
    console.log("prev-2 clicked")
    
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    counter--;
    console.log(counter);
    carousel_container.style.transform = 'translateX('+ 0 +'px)';
});

next_2.addEventListener('click', ()=> {
    console.log("next-2 clicked")
    
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    counter++;
    carousel_container.style.transform = 'translateX('+ -width*2 +'px)';
});

prev_3.addEventListener('click', ()=> {
    console.log("prev-3 clicked")
    
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    counter--;
    carousel_container.style.transform = 'translateX('+ -width*1 +'px)';
});

reset.addEventListener('click', ()=> {
    console.log("reset clicked")
    carousel_container.style.transition = 'transform 0.4s ease-in-out';
    counter--;
    carousel_container.style.transform = 'translateX('+ width*0 +'px)';
});