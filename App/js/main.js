// speech variables
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// get elements from document
const btnRecord = document.querySelector('.app__btn--record');
const btnStop = document.querySelector('.app__btn--stop');
const btnTranscript = document.querySelector('.app__btn--transcript');

const transcripts = document.querySelector('.app__transcripts');
const diagnostic = document.querySelector('.app__transcripts-box');

const handModelParent = document.querySelector('#model-box');
const handModel = document.querySelector('#model--hand');
const handsModel = document.querySelector('#model--hands');

const modalNoMatch = document.querySelector('.app__modal--no-match');
const modalCloseBtn = document.querySelector('.modal__btn--close');

// animation list 
const animationList = [{
    animationName: 'hello',
    model: 'hand',
    target: 288,
    position: {
        x: 0.6,
        y: 0.8,
        z: 0,
    }
},
{
    animationName: 'nice',
    model: 'hands',
    target: 152,
    position: {
        x: 0,
        y: -0.3,
        z: 0,
    }
},
{
    animationName: 'meet',
    model: 'hands',
    target: 152,
    position: {
        x: 0,
        y: -0.3,
        z: 0,
    }
},
{
    animationName: 'you',
    model: 'hand',
    target: 152,
    position: {
        x: 0.6,
        y: -0.2,
        z: 0,
    }
},
{
    animationName: 'thanks',
    model: 'hand',
    target: 152,
    position: {
        x: 0.25,
        y: -0.55,
        z: 0,
    }
},
]

handModel.getAttribute('src')

// recognition
var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


// start recording
btnRecord.addEventListener('click', (ev) => {
    btnRecord.classList.add('app__btn--selected');
    btnStop.classList.remove('app__btn--selected');

    recognition.start();
});
// result 
const renderQueue = [];
let recognizedWords = 0

recognition.onresult = function (event) {
    var text = event.results[0][0].transcript;
    diagnostic.textContent = text + '.';
    const allWords = text.split(" ");

    allWords.forEach(word => {
        animationList.forEach(ani => {            
            if (word === ani.animationName) {
                // add +1 recognized words 
                recognizedWords++;
                // check if animation is running 
                if (handModel.getAttribute('animation-mixer')) {
                    renderQueue.push(ani)
                } else {
                    // if running add to renderQueue
                    playAni(ani)
                }
            } 
        });
    });

    // if no words are recognized
    if (recognizedWords === 0) {
        modalNoMatch.classList.remove('app__modal--disabled');
    } 

    // remove recording selection 
    btnRecord.classList.remove('app__btn--selected');
    btnStop.classList.add('app__btn--selected');
}

// close modal 
modalCloseBtn.addEventListener('click', (ev) => {
    modalNoMatch.classList.add('app__modal--disabled');
})

// stop animation
const animationStopped = document.body.addEventListener("animation-finished", (ev) => {
    if (renderQueue.length > 0) {
        // shift to get next 
        var next = renderQueue.shift()
        playAni(next);
    } else {
        handModel.removeAttribute('animation-mixer');
        handModel.setAttribute('visible', false);

        handsModel.removeAttribute('animation-mixer');
        handsModel.setAttribute('visible', false);

        recognizedWords = 0;
    }
});

// stop
btnStop.addEventListener('click', (ev) => {
    btnRecord.classList.remove('app__btn--selected');
    btnStop.classList.add('app__btn--selected');
});

btnTranscript.addEventListener('click', (ev) => {
    if (btnTranscript.classList.contains('app__btn--selected')) {
        btnTranscript.classList.remove('app__btn--selected');
        transcripts.classList.add('app__transcripts--off');
    } else {
        btnTranscript.classList.add('app__btn--selected');
        transcripts.classList.remove('app__transcripts--off');
    };
});

// FUNCTIONS 
// play animation function
const playAni = (object) => {
    if (object.model === 'hand') {
        handsModel.setAttribute('visible', false);

        handModelParent.setAttribute('mindar-face-target', {
            anchorIndex: object.target
        });

        handModel.setAttribute('visible', true);
        handModel.setAttribute('position', object.position);
        handModel.setAttribute('animation-mixer', {
            clip: object.animationName,
            loop: 'once',
        });

    } else if (object.model === 'hands'){
        handModel.setAttribute('visible', false);

        handModelParent.setAttribute('mindar-face-target', {
            anchorIndex: object.target
        });

        handsModel.setAttribute('visible', true);
        handsModel.setAttribute('position', object.position);
        handsModel.setAttribute('animation-mixer', {
            clip: object.animationName,
            loop: 'once',
        });
    }

}

