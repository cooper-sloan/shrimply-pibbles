var c_major = [60,64,67]
var a_minor = [57,60,64]
var f_major = [53,57,60]
var g_major = [55,59,62]
var e_minor = [52,56,59]

var num_bars = 8;
var beats_per_bar = 4;
var subdivisions_per_beat = 4;
var subdivisions_per_bar = beats_per_bar * subdivisions_per_beat
var bar_length = beats_per_bar * subdivisions_per_beat;
var bpm = 100;
var beat_length = 60/bpm;
var subdivision_length = beat_length/subdivisions_per_beat;
var note_length = beat_length/subdivisions_per_beat;
var velocity = 127; // how hard the note hits
var chords=[a_minor,e_minor,f_major,g_major];

var selected_instruments = chooseInstruments();
var structure = generateStructure();
console.log(structure)


var melody = selected_instruments.melody
var background = selected_instruments.background
console.log(selected_instruments)
var beat = ["synth_drum"];

var instruments = melody.concat(background).concat(beat)
  var load_with_instruments = function(instruments, callback){
    MIDI.loadPlugin({
      soundfontUrl: "./sounds/",
      instruments: instruments,
      onsuccess: callback  });
  }

window.onload = function () {
  load_with_instruments(instruments, do_both)
};


var play_beat = function() {
  MIDI.programChange(0, MIDI.GM.byName["synth_drum"].number);
  var bass_drum = 41;
  var cymbal = 30;
  var snare_drum = 39;
  var drum_assignments = {snare:"woodblock",kick:"low_bongo",cymbal:"ride"}
  var drums_to_note = {ride:30, low_bongo:41, woodblock:39}
  //var drums = {"cowbell":38, "woodblock":39,"bongo":40,"low_bongo":41
  var drums = {};
  drums[cymbal]=    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  drums[bass_drum]= [1,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0];
  drums[snare_drum]=[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0];
  MIDI.setVolume(0, velocity);
  Object.keys(drums).forEach(function(drum){
    for(var bar = 0; bar<num_bars; bar++){
      var bar_offset = bar*bar_length*note_length;
      for(var beat = 0; beat<bar_length; beat++){
        var beat_offset = beat*note_length;
        if(drums[drum][beat]==1){
          MIDI.noteOn(0, drum, velocity, bar_offset+beat_offset);
          MIDI.noteOff(0, drum, velocity, bar_offset+beat_offset+note_length);
        }
      }
    }
  })
}

var do_both = function(){
  play_chords();
  play_beat();
  play_arpeggio();
}

var arpeggiate = function(chord){
  var previous = 0;
  var octave = -2;
  arpeggio = [chord[0]]
    for(var i=1;i<subdivisions_per_bar;i++){
      if(Math.random()>0.4){
        previous = (previous+1)%3;
        if(previous == 0){
          octave++
        }
      }else{
        previous = (previous+2)%3;
        if(previous == 3){
          octave --
        }
      }
      arpeggio.push(chord[previous]+(12*octave))
    }
  return arpeggio
}

var play_chords = function() {
  for(var i=0;i<background.length;i++){
    MIDI.programChange(i, MIDI.GM.byName[background[i]].number);
  }
  MIDI.setVolume(0, velocity);
  for(var i = 0; i<background.length; i++){
    for(var bar = 0; bar<num_bars; bar++){
      var bar_offset = bar*bar_length*note_length;
      chord = chords[bar%4];
      for(var beat = 0; beat<beats_per_bar; beat++){
        var beat_offset = beat*beat_length;
        MIDI.chordOn(i, chord, velocity, bar_offset+beat_offset);
        MIDI.chordOff(i, chord, bar_offset+beat_offset+beat_length);
      }
    }
  }
}

var play_arpeggio = function() {
  for(var i=0;i<melody.length;i++){
    MIDI.programChange(i, MIDI.GM.byName[melody[i]].number);
  }
  MIDI.setVolume(0, velocity*(1.0/2));
  for(var i = 0; i<melody.length; i++){
    for(var bar = 0; bar<num_bars; bar++){
      var bar_offset = bar*bar_length*note_length;
      chord = chords[bar%4];
      var arpeggio = arpeggiate(chord);
      for(var beat = 0; beat<beats_per_bar; beat++){
        var beat_offset = beat*beat_length;
        for(var subdivision = 0; subdivision<subdivisions_per_beat; subdivision++){
          var subdivision_of_bar = beat*subdivisions_per_beat+subdivision;
          var subdivision_offset = subdivision*subdivision_length;
          MIDI.noteOn(i, arpeggio[subdivision_of_bar], velocity, bar_offset+beat_offset+subdivision_offset);
          MIDI.noteOff(i, arpeggio[subdivision_of_bar], bar_offset+beat_offset+subdivision_offset+subdivision_length);
        }
      }
    }
  }
}
