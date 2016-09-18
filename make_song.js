var c_major = [60,64,67]
var a_minor = [57,60,64]
var f_major = [53,57,60]
var g_major = [55,59,62]
var e_minor = [52,56,59]
var empty_drum_pattern = {snare:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],kick:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],cymbal:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}

var num_bars = 8;
var beats_per_bar = 4;
var subdivisions_per_beat = 4;
var subdivisions_per_bar = beats_per_bar * subdivisions_per_beat
var bpm = 100;
var beat_length = 60/bpm;
var bar_length = beat_length * beats_per_bar;
var subdivision_length = beat_length/subdivisions_per_beat;
var velocity = 127; // how hard the note hits
var chords=[a_minor,e_minor,f_major,g_major];
var drums = ["snare","kick","cymbal"]
var drum_assignments = chooseDrums()
console.log(drum_assignments)

var selected_instruments = chooseInstruments();
var structure = generateStructure();
structure = [{section: "intro",length:0},{section: "verse", length:4}]
console.log(structure);
var melody = selected_instruments.melody;
var background = selected_instruments.background;
console.log(selected_instruments);
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

  var drum_patterns = {snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],kick:[1,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0],cymbal:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
  var drum_patterns_by_section = {intro:empty_drum_pattern,verse:drum_patterns,chorus:drum_patterns,hook:drum_patterns,outro:drum_patterns}

  MIDI.setVolume(0, velocity);
  var section_offset = 0;
  structure.forEach(function(song_section){
    drum_patterns = drum_patterns_by_section[song_section.section];
    drums.forEach(function(drum){
      for(var bar = 0; bar<num_bars; bar++){
        var bar_offset = bar*subdivisions_per_bar*subdivision_length;
        for(var beat = 0; beat<beats_per_bar; beat++){
          var beat_offset = beat*beat_length;
          for(var subdivision = 0; subdivision<subdivisions_per_beat; subdivision++){
            var subdivision_of_bar = beat*subdivisions_per_beat+subdivision;
            var subdivision_offset = subdivision*subdivision_length;
            var total_offset = section_offset + bar_offset + beat_offset + subdivision_offset
              if(drum_patterns[drum][subdivision_of_bar]==1){
                MIDI.noteOn(0, drum_assignments[drum], velocity, total_offset);
                MIDI.noteOff(0, drum_assignments[drum], velocity, total_offset+subdivision_length);
              }
          }
        }
      }
    })
    section_offset+=song_section.length*bar_length
  })
}

var do_both = function(){
  //play_chords();
  play_beat();
  //play_arpeggio();
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
  var section_offset = 0
  structure.forEach(function(song_section){
    for(var i = 0; i<background.length; i++){
      for(var bar = 0; bar<num_bars; bar++){
        var bar_offset = bar*subdivisions_per_bar*subdivision_length;
        chord = chords[bar%4];
        for(var beat = 0; beat<beats_per_bar; beat++){
          var beat_offset = beat*beat_length;
          var total_offset = section_offset + bar_offset + beat_offset;
          MIDI.chordOn(i, chord, velocity, total_offset);
          MIDI.chordOff(i, chord, total_offset+beat_length);
        }
      }
    }
    section_offset+=song_section.length*bar_length
  })
}

var play_arpeggio = function() {
  for(var i=0;i<melody.length;i++){
    MIDI.programChange(i, MIDI.GM.byName[melody[i]].number);
  }
  MIDI.setVolume(0, velocity*(1.0/2));
  var section_offset = 0
  structure.forEach(function(song_section){
    for(var i = 0; i<melody.length; i++){
      for(var bar = 0; bar<num_bars; bar++){
        var bar_offset = bar*subdivisions_per_bar*subdivision_length;
        chord = chords[bar%4];
        var arpeggio = arpeggiate(chord);
        for(var beat = 0; beat<beats_per_bar; beat++){
          var beat_offset = beat*beat_length;
          for(var subdivision = 0; subdivision<subdivisions_per_beat; subdivision++){
            var subdivision_of_bar = beat*subdivisions_per_beat+subdivision;
            var subdivision_offset = subdivision*subdivision_length;
            var total_offset = section_offset + bar_offset + beat_offset + subdivision_offset
            MIDI.noteOn(i, arpeggio[subdivision_of_bar], velocity, total_offset);
            MIDI.noteOff(i, arpeggio[subdivision_of_bar], total_offset+subdivision_length);
          }
        }
      }
    }
    section_offset+=song_section.length*bar_length
  })
}
