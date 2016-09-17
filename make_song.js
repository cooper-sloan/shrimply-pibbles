var instruments = ["synth_drum"]
var load_with_instruments = function(instruments, callback){
  MIDI.loadPlugin({
    soundfontUrl: "./sounds/",
    instruments: instruments,
    onsuccess: callback  });
}

window.onload = function () {
  load_with_instruments(instruments, play_song)
};



var play_song = function() {
  for(i=0;i<instruments.length;i++){
    MIDI.programChange(i, MIDI.GM.byName[instruments[i]].number);
  }
  var delay = 0; // play one note every quarter second
  var note = 21; // the MIDI note
  var bass_drum = 41;
  var cymbal = 30;

  //var drums = {"cowbell":38, "woodblock":39,"bongo":40,"low_bongo":41
  var snare_drum = 39;
  var drums = {cymbal: [1,1,1,1], bass_drum: [1,0,1,0], snare_drum: [0,1,0,1]};
  var drums = {}
  drums[cymbal]=[1,1,1,1]
  drums[bass_drum]=[1,0,1,0]
  drums[snare_drum]=[0,1,0,1]
  var num_bars = 8;
  var bar_length = 4;
  var tempo = 120;
  var note_length = 0.5;
  var velocity = 127; // how hard the note hits
  MIDI.setVolume(0, 127);

  Object.keys(drums).forEach(function(drum){
    for(bar = 0; bar<num_bars; bar++){
      var bar_offset = bar*bar_length*note_length;
      for(beat = 0; beat<bar_length; beat++){
        var beat_offset = beat*note_length;
        if(beat%2 == 1){
          if(drums[drum])
          MIDI.noteOn(0, drum, velocity, bar_offset+beat_offset);
          MIDI.noteOff(0, drum, velocity, bar_offset+beat_offset+note_length);
        }
      }
    }
  })
}
