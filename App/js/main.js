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
const handModel = document.querySelector('#app__model');

// animation list 
const animationList = [{
    animationName: 'hello',
},
{
    animationName: 'nice',
},
{
    animationName: 'meet',
},
{
    animationName: 'you',
},
{
    animationName: 'thanks',
},
]

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
    console.log('Ready to receive a color command.');
});

// result 
const renderQueue = [];
let recognizedWords = 0

recognition.onresult = function (event) {
    console.log(event.results);
    var text = event.results[0][0].transcript;
    diagnostic.textContent = text + '.';
    const allWords = text.split(" ");
    console.log(allWords);

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
        alert('no words in our vocabulary')
    } 

    // remove recording selection 
    btnRecord.classList.remove('app__btn--selected');
    btnStop.classList.add('app__btn--selected');
}

// stop animation
const animationStopped = document.body.addEventListener("animation-finished", (ev) => {
    if (renderQueue.length > 0) {
        // shift to get next 
        var next = renderQueue.shift()
        playAni(next);
    } else {
        handModel.removeAttribute('animation-mixer');
        handModel.setAttribute('visible', false);

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
    handModel.setAttribute('visible', true)
    handModel.setAttribute('animation-mixer', {
        clip: object.animationName,
        loop: 'once',
    })
}