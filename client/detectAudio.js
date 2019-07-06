"use strict";
var connection = null;
var isOpen = false;
var last = 1000;

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
            console.log(bufferLengthAlt);
            var dataArrayAlt = new Uint8Array(bufferLengthAlt);

            var drawAlt = function() {
              
              analyser.getByteFrequencyData(dataArrayAlt);
              var energy = 0;
              dataArrayAlt.forEach((element, i) => {
                energy+=element;
              });
              var length = dataArrayAlt.filter(val => val !== 0).length;
              if (length - last > 20 && energy > 3500) {
                connection.send('');
                setTimeout(() => {
                  length -= 10;
                  drawAlt();
                }, 100);
              }
              else {
                
                requestAnimationFrame(drawAlt);
              }
              last = length;
            };
            drawAlt();

       })
       .catch( function(err) { console.log('The following gUM error occured: ' + err);})
  } else {
      console.log('getUserMedia not supported on your browser!');
  }

  connection.onopen = function(evt) {
    document.getElementById('start').style.display = "none";
    isOpen = true;
    console.log("***ONOPEN");
  };
  console.log("***CREATED ONOPEN");
}

function send() {
  if (!isOpen) return;
  console.log("***SEND");
  connection.send('');
}

