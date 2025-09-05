const pop = document.querySelector('.popup-window')
const popup = document.querySelector('.popup')
const close = document.querySelector('.popup-close');
const btn = document.querySelector('button');
btn.addEventListener('click',()=>{
    pop.style.display = 'block';
})
pop.addEventListener('click',()=>{
    pop.style.display = 'none';
})

close.addEventListener('click',()=>{
    pop.style.display = 'none';
})