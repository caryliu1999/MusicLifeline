const fs = require('fs');
const Speaker = require('speaker');
const createMusicStream = require('create-music-stream');
const { MusicBeatDetector, MusicBeatScheduler, MusicGraph } = require('music-beat-detector');

const musicSource = process.argv[2] //gets the first argument on cli
//MusicGraph generates a SVG graph that displays every detected peak
const musicGraph = new MusicGraph();

const positions = [];
//MusicBeatScheduler syncs any detected peak with the listened audio. It's useful to control some bulbs or any other effect
const musicBeatScheduler = new MusicBeatScheduler(pos => positions.push(pos));
//MusicBeatDetector analyzes the music
const musicBeatDetector = new MusicBeatDetector({
  plotter: musicGraph.getPlotter(),
  scheduler: musicBeatScheduler.getScheduler(),
});

//get any raw pcm_16le stream
createMusicStream(musicSource)
  .pipe(musicBeatDetector.getAnalyzer()) //pipe on analyzer
  .on('peak-detected', (pos, bpm) => console.log(`peak-detected at ${pos}ms, detected bpm ${bpm}`))
  .on('end', () => {
    fs.writeFileSync('graph.svg', musicGraph.getSVG())
    console.log('end')
    fs.writeFileSync('data.js', `\nconst positions = [${positions}];\n`, { encoding: 'utf8' });
  })
  .pipe(new Speaker()) //pipe on speaker1
  .on('open', () => musicBeatScheduler.start())
