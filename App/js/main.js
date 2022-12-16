var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// get buttons
const btnRecord = document.querySelector('.app__btn--record');
const btnStop = document.querySelector('.app__btn--stop');
const btnTranscript = document.querySelector('.app__btn--transcript');

// get transcriptbox
const transcripts = document.querySelector('.app__transcripts');

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

var diagnostic = document.querySelector('.app__transcripts-box');

// start
btnRecord.addEventListener('click', (ev) => {
    btnRecord.classList.add('app__btn--selected');
    btnStop.classList.remove('app__btn--selected');

    recognition.start();
    console.log('Ready to receive a color command.');
});

const renderQueue = [];

const handModel = document.querySelector('#app__model')

recognition.onresult = function (event) {
    console.log(event.results);
    var text = event.results[0][0].transcript;
    diagnostic.textContent = text + '.';
    const allWords = text.split(" ");
    console.log(allWords);

    btnRecord.classList.remove('app__btn--selected');
    btnStop.classList.add('app__btn--selected');

    animationList.forEach(ani => {            
        if (text.includes(ani.animationName)) {
            // check if animation is running 
            // if running add to renderQueue
            // shift to get next 
            handModel.setAttribute('visible', true)
            handModel.setAttribute('animation-mixer', {
                clip: ani.animationName,
                loop: 'once',
            })
        } 
    });
}

// stop animation
const animationStopped = document.body.addEventListener("animation-finished", (ev) => {
    if (renderQue.length > 0) {

    } else {
        handModel.removeAttribute('animation-mixer');
        handModel.setAttribute('visible', false);
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