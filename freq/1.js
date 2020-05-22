function valueToFreq(value) {
    return Math.round(Math.pow(2, value / 1000));
}

function freqToValue(freq) {
    return 1000 * Math.log2(freq);
}

function freqToNote(freq) {
    var deltaSteps = Math.round(12 * Math.log(freq / 440) / Math.log(2));
    var note = "invalid";
    switch ((deltaSteps + 48) % 12) {
        case 0:
            note = "A";
            break;
        case 1:
            note = "A#";
            break;
        case 2:
            note = "B";
            break;
        case 3:
            note = "C";
            break;
        case 4:
            note = "C#";
            break;
        case 5:
            note = "D";
            break;
        case 6:
            note = "D#";
            break;
        case 7:
            note = "E";
            break;
        case 8:
            note = "F";
            break;
        case 9:
            note = "F#";
            break;
        case 10:
            note = "G";
            break;
        case 11:
            note = "G#";
            break;
    }
    return note + Math.round((51 + deltaSteps) / 12);
}

function init(knob, audioCtx, analyser) {
    knob.oscillator = audioCtx.createOscillator();
    knob.volume = audioCtx.createGain();

    knob.freqValue = document.getElementById("freqValue" + knob.id);
    knob.freqInfo = document.getElementById("freqInfo" + knob.id);
    knob.freqSlider = document.getElementById("freqSlider" + knob.id);
    knob.volumeSlider = document.getElementById("volumeSlider" + knob.id);

    knob.freqSlider.value = freqToValue(55 * Math.pow(2, knob.id));
    knob.freqValue.value = valueToFreq(knob.freqSlider.value);
    knob.freqInfo.innerHTML = " Hz (" + freqToNote(valueToFreq(knob.freqSlider.value)) + ")";
    knob.volume.gain.value = knob.volumeSlider.value / 100;

    addEventListeners(knob);

    knob.oscillator.type = 'sine';
    knob.oscillator.frequency.value = valueToFreq(knob.freqSlider.value); // value in hertz
    knob.oscillator.connect(knob.volume);
    knob.volume.connect(audioCtx.destination);
    knob.volume.connect(analyser);
    knob.oscillator.start();

    console.log(knob);
}

function addEventListeners(knob) {
    knob.freqSlider.addEventListener("input", function () {
        knob.freqValue.value = valueToFreq(knob.freqSlider.value);
        knob.freqInfo.innerHTML = " Hz (" + freqToNote(valueToFreq(knob.freqSlider.value)) + ")";
        knob.oscillator.frequency.value = valueToFreq(knob.freqSlider.value);
        draw();
    });

    knob.freqValue.addEventListener('change', function () {
        knob.freqSlider.value = freqToValue(knob.freqValue.value);
        knob.freqInfo.innerHTML = " Hz (" + freqToNote(knob.freqValue.value) + ")";
        knob.oscillator.frequency.value = knob.freqValue.value;
        draw();
    });

    knob.volumeSlider.addEventListener("input", function () {
        knob.volume.gain.value = knob.volumeSlider.value / 100;
        draw();
    });

    document.getElementsByName("waveType" + knob.id).forEach(function (item, id) {
        item.addEventListener("click", function () {
            knob.oscillator.type = item.value;
            draw();
        });
    });
}

function draw() {
    drawSpectrum(analyser, spectCtx);
    drawScope(analyser, scopeCtx);

    requestAnimationFrame(draw);
}

function drawSpectrum(analyser, ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var freqData = new Uint8Array(analyser.frequencyBinCount);
    var scaling = height / 256;

    analyser.getByteFrequencyData(freqData);

    ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 200, 0)';
    ctx.beginPath();

    for (var x = 0; x < width; x++)
        ctx.lineTo(x, height - freqData[x] * scaling);

    ctx.stroke();
}

function drawScope(analyser, ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var timeData = new Uint8Array(analyser.frequencyBinCount);
    var scaling = height / 256;
    var risingEdge = 0;
    var edgeThreshold = 5;

    analyser.getByteTimeDomainData(timeData);

    ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 200, 0)';
    ctx.beginPath();

    // No buffer overrun protection
    while (timeData[risingEdge++] - 128 > 0 && risingEdge <= width);
    if (risingEdge >= width) risingEdge = 0;

    while (timeData[risingEdge++] - 128 < edgeThreshold && risingEdge <= width);
    if (risingEdge >= width) risingEdge = 0;

    for (var x = risingEdge; x < timeData.length && x - risingEdge < width; x++)
        ctx.lineTo(x - risingEdge, height - timeData[x] * scaling);

    ctx.stroke();
}

var audioCtx;
try {
    // create web audio api context
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
catch (e) {
    alert('Web Audio API is not supported in this browser');
}

var analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

var knob1 = new Object();
knob1.id = 1;
init(knob1, audioCtx, analyser);

var knob2 = new Object();
knob2.id = 2;
init(knob2, audioCtx, analyser);

var knob3 = new Object();
knob3.id = 3;
init(knob3, audioCtx, analyser);

var knob4 = new Object();
knob4.id = 4;
init(knob4, audioCtx, analyser);

var scopeCtx = document.getElementById('scope').getContext('2d');
var spectCtx = document.getElementById('spectrum').getContext('2d');

draw();