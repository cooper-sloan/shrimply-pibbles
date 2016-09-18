var bass = ["acoustic_bass",
    "electric_bass_finger",
    "electric_bass_pick",
    "fretless_bass",
    "lead_8_bass__lead",
    "slap_bass_1",
    "slap_bass_2",
    "synth_bass_1",
    "synth_bass_2"];


var drums =[
  "synth_drum"];

  var piano = ["acoustic_grand_piano",
  "bright_acoustic_piano",
  "electric_grand_piano",
  "electric_piano_1",
  "electric_piano_2"];

var guitar = [ "acoustic_guitar_nylon",
    "acoustic_guitar_steel",
    "distortion_guitar",
    "electric_guitar_clean",
    "electric_guitar_jazz",
    "electric_guitar_muted",
    "guitar_harmonics",
    "overdriven_guitar"];

var percussion = ["marimba", "glockenspiel","tinkle_bell",
    "tubular_bells", "steel_drums"];

var voice = ["lead_6_voice",
    "voice_oohs", "choir_aahs",
    "pad_4_choir",
    "synth_choir"];

var fx = ["fx_1_rain",
    "fx_2_soundtrack",
    "fx_3_crystal",
    "fx_4_atmosphere",
    "fx_5_brightness",
    "fx_6_goblins",
    "fx_7_echoes",
    "fx_8_scifi"];
var brass = ["tuba", "muted_trumpet",
    "trumpet", "trombone",  "brass_section",
    "synth_brass_1",
    "synth_brass_2"];

var orchestra = ["violin", "cello", "string_ensemble_1",
    "string_ensemble_2",
    "synth_strings_1",
    "synth_strings_2"];

var woodwinds = ["flute", "alto_sax",
    "baritone_sax",
    "soprano_sax",
    "tenor_sax"];


var background = [woodwinds, orchestra, voice, brass, bass, guitar];
var melody = [brass, percussion, piano];


var chooseInstruments =function (){

  //Choose instruments for backgrounds

  var randomBackgroundFactor = Math.random();
  var randomBackgroundFactor2 = Math.random();
  var randomFactor = Math.random();
  var numberOfBackgroundInstruments;
  var backgroundInstruments = [];

  //Choose random number to determine if there are one or two background instruments
  // If background instrument has a brass instrument take it out of the melody selection
  // Adds random instrument to the list from the music type list.
  if (randomFactor > 0.8){
    numberOfBackgroundInstruments = 2;
  }
  else {
    numberOfBackgroundInstruments = 1;
  }

  for(i = 0; i < numberOfBackgroundInstruments; i++){
    var listIndex = Math.floor(randomBackgroundFactor * background.length);
    if(background[listIndex] === brass){
      melody.shift();
    }
    var backgroundInstrumentChoice = background[listIndex];
    var backgroundInstrumentIndex = Math.floor(randomBackgroundFactor2 * background[listIndex].length);
    backgroundInstruments.push(backgroundInstrumentChoice[backgroundInstrumentIndex]);
    background.splice(listIndex,1);
  }

  var randomMelodyFactor = Math.random();
  var randomMelodyFactor2 = Math.random();
  var melodyInstruments = [];
  var melodylistIndex1 = Math.floor(randomMelodyFactor * melody.length);


  //Repeats the same process as above just for melody
  var melodyInstrumentChoice = melody[melodylistIndex1];
  var melodyInstrumentIndex = Math.floor(randomMelodyFactor2 * melody[melodylistIndex1].length)
    melodyInstruments.push(melodyInstrumentChoice[melodyInstrumentIndex]);


  var instrumentSelection = {"melody": melodyInstruments, "background": backgroundInstruments};

  return instrumentSelection;
};

