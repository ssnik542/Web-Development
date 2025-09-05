const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.band');
const btns = document.querySelectorAll('.m1');

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', () => {
        modal.classList.remove('hidden');

    });
}
btnCloseModal.addEventListener("click", () => {
    modal.classList.add('hidden')
})