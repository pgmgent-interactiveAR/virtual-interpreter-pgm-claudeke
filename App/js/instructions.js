const btnYes = document.querySelector('.modal__btn--yes');
const btnNo = document.querySelector('.modal__btn--no');
const btnOk = document.querySelectorAll('.modal__btn--ok')

const instructionModal = document.querySelector('.app__modal--instruction');
const instructionOne = document.querySelector('.modal__instruction--one');
const instructionTwo = document.querySelector('.modal__instruction--two');
const instructionThree = document.querySelector('.modal__instruction--three');
const instructionFour = document.querySelector('.modal__instruction--four');

// if yes
btnYes.addEventListener('click', () => {
    instructionOne.classList.add('modal--hide');
    instructionTwo.classList.remove('modal--hide');
})

btnOk.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.value === 'two') {
            instructionTwo.classList.add('modal--hide');
            instructionThree.classList.remove('modal--hide');
        } else if(btn.value === 'three') {
            instructionThree.classList.add('modal--hide');
            instructionFour.classList.remove('modal--hide');
        } else if(btn.value === 'four') {
            instructionFour.classList.add('modal--hide');
            instructionModal.classList.add('app__modal--disabled');
        }
    })
});

// if no 
btnNo.addEventListener('click', () => {
    instructionModal.classList.add('app__modal--disabled');
})