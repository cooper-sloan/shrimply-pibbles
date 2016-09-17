var instruments = ["synth_drum","marimba"]
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
  var velocity = 127; // how hard the note hits
  MIDI.setVolume(0, 127);
  num_notes = 50
  for(j = 0; j<instruments.length; j++){
    for(i = 0; i<50; i++){
      inc = i/4;
      MIDI.noteOn(j, note+i, velocity, delay+inc);
      MIDI.noteOff(j, note+i, delay+inc + 0.25);
    }
  }
}
