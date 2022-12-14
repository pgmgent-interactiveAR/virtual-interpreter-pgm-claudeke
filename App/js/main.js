var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// buttons
const btnRecord = document.querySelector('.app__btn--record');
const btnStop = document.querySelector('.app__btn--stop');
const btnTranscript = document.querySelector('.app__btn--transcript');

// transcripts
const transcripts = document.querySelector('.app__transcripts');

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

recognition.onresult = function (event) {
    console.log(event.results);
    var text = event.results[0][0].transcript;
    diagnostic.textContent = text + '.';
    console.log('Confidence: ' + event.results[0][0].confidence);
}

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