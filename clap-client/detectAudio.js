"use strict";
var connection = null;
var isOpen = false;
var last = 1000;

let INITIAL_TAP_THRESHOLD = 0.45;
let SHORT_NORMALIZE = (1.0/32768.0)
let CHANNELS = 2
let RATE = 44100
let INPUT_BLOCK_TIME = 0.05
let INPUT_FRAMES_PER_BLOCK = Math.floor(RATE*INPUT_BLOCK_TIME)
// if we get this many noisy blocks in a row, increase the threshold
let OVERSENSITIVE = 15.0/INPUT_BLOCK_TIME
// if we get this many quiet blocks in a row, decrease the threshold
let UNDERSENSITIVE = 120.0/INPUT_BLOCK_TIME
// if the noise was longer than this many blocks, it's not a 'tap'
let MAX_TAP_BLOCKS = 20

function get_rms ( block ) {
    // RMS amplitude is defined as the square root of the
    // mean over time of the square of the amplitude.
    // so we need to convert this string of bytes into
    // a string of 16-bit samples...

    // iterate over the block.
    let sum_squares = 0.0;
    for (let i = 0; i < block.length; i++) {
      const sample = block[i];
      const n = sample * SHORT_NORMALIZE;
      sum_squares += n * n;
    }

    return Math.sqrt( sum_squares / block.length );
}

let tap_threshold = INITIAL_TAP_THRESHOLD;
let noisycount = MAX_TAP_BLOCKS+1;
let quietcount = 0;
let errorcount = 0;

function connect() {
  var serverUrl;
  var scheme = "ws";

  // If this is an HTTPS connection, we have to use a secure WebSocket
  // connection too, so add another "s" to the scheme.

  if (document.location.protocol === "https:") {
    scheme += "s";
  }

  serverUrl = scheme + "://" + document.location.hostname + ":8080";

  connection = new WebSocket(serverUrl);
  console.log("***CREATED WEBSOCKET");

  // Older browsers might not implement mediaDevices at all, so we set an empty object first
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }


  // Some browsers partially implement mediaDevices. We can't just assign an object
  // with getUserMedia as it would overwrite existing properties.
  // Here, we will just add the getUserMedia property if it's missing.
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {

      // First get ahold of the legacy getUserMedia, if present
      var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  var distortion = audioCtx.createWaveShaper();
  var gainNode = audioCtx.createGain();
  var biquadFilter = audioCtx.createBiquadFilter();
  var convolver = audioCtx.createConvolver();

  if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    var constraints = {audio: true}
    navigator.mediaDevices.getUserMedia (constraints)
       .then(
         function(stream) {
            var source = audioCtx.createMediaStreamSource(stream);
            source.connect(distortion);
            distortion.connect(biquadFilter);
            biquadFilter.connect(gainNode);
            convolver.connect(gainNode);
            gainNode.connect(analyser);
            // analyser.connect(audioCtx.destination);
            distortion.oversample = '4x';
            biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0);
            biquadFilter.disconnect(0);
            biquadFilter.connect(gainNode);
            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.setTargetAtTime(1000, audioCtx.currentTime, 0);
            biquadFilter.gain.setTargetAtTime(25, audioCtx.currentTime, 0);
            analyser.fftSize = 256;
            var bufferLengthAlt = analyser.frequencyBinCount;
            var dataArrayAlt = new Uint8Array(bufferLengthAlt);
            var block = new Int16Array(dataArrayAlt.buffer);

            var drawAlt = function() {
              analyser.getByteFrequencyData(dataArrayAlt);

              /* first try *
              var energy = dataArrayAlt.reduce((acc, cur) => acc + cur, 0);
              var length = dataArrayAlt.filter(val => val !== 0).length;
              if (length - last > 20 && energy > 3500) {
                onClap();
                setTimeout(() => {
                  length -= 10;
                  drawAlt();
                }, 100);
              } else {
                requestAnimationFrame(drawAlt);
              }
              last = length;
              /* second try *
              // https://stackoverflow.com/questions/4160175/detect-tap-with-pyaudio-from-live-mic
              let amplitude = get_rms( block );
              if (amplitude > tap_threshold) {
                // noisy block
                quietcount = 0
                noisycount += 1
                if (noisycount > OVERSENSITIVE) {
                    tap_threshold *= 1.1;
                }
              } else {
                // quiet block.
                if (1 <= noisycount) console.log(noisycount);
                if (1 <= noisycount && noisycount <= MAX_TAP_BLOCKS) {
                  onClap();
                }
                noisycount = 0
                quietcount += 1
                if (quietcount > UNDERSENSITIVE) {
                    tap_threshold *= 0.9;
                }
              }
              requestAnimationFrame(drawAlt);
              /* third try, hybrid */
              var energy = dataArrayAlt.reduce((acc, cur) => acc + cur, 0);
              var length = dataArrayAlt.filter(val => val !== 0).length;
              if (length - last > 20 && energy > 3500) {
                onClap(1);
                setTimeout(() => {
                  length -= 10;
                  drawAlt();
                }, 100);
              } else {
                let amplitude = get_rms( block );
                if (amplitude > tap_threshold) {
                  // noisy block
                  quietcount = 0
                  noisycount += 1
                  if (noisycount > OVERSENSITIVE) {
                      tap_threshold *= 1.1;
                  }
                } else {
                  // quiet block.
                  // if (1 <= noisycount) console.log(noisycount);
                  if (1 <= noisycount && noisycount <= MAX_TAP_BLOCKS) {
                    onClap(2);
                  }
                  noisycount = 0
                  quietcount += 1
                  if (quietcount > UNDERSENSITIVE) {
                      tap_threshold *= 0.9;
                  }
                }
                requestAnimationFrame(drawAlt);
              }
              last = length;
              /* */
            };
            drawAlt();
       })
       .catch( function(err) { console.log('The following gUM error occured: ' + err);})
  } else {
      console.log('getUserMedia not supported on your browser!');
  }

  connection.onopen = function(evt) {
    var start = document.getElementById('start');
    document.getElementById('label').innerHTML = 'CLAP!';
    start.onclick = null;
    isOpen = true;
    console.log("***ONOPEN");
  };
  console.log("***CREATED ONOPEN");
}

let lastClap = 0;
function onClap (method) {
  const now = performance.now();
  if (now - lastClap < 250) return;
  console.log(now - lastClap, method);
  connection.send('');
  lastClap = now;
}
