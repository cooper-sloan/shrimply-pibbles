

function chooseDrums() {
  var cymbals = ["cymbal1","cymbal2","cymbal3","cymbal4","cymbal6","hi_hat1","hi_hat2"];
  var kicks = ["kick","kick1","bongo","tom_tom4"];
  var snares = ["tom_tom1","tom_tom2","tom_tom3","tom_tom4","wood_block","wood_block1","wood_block2","cowbell1","cowbell2"];
  var drums = {"hi_hat1" : 21,
    "tom_tom1" : 22,
    "hi_hat2" : 23,
    "tom_tom2" : 24,
    "tom_tom3" : 25,
    "cymbal1" : 26,
    "tom_tom4" : 27,
    "ride" : 28,
    "cymbal2" : 29,
    "cymbal3" : 30,
    "tambourine" : 31,
    "cymbal4" : 32,
    "cowbell" : 33,
    "cymbal5" : 34,
    "viberslap" : 35,
    "cymbal6" : 36,
    "wood_block" : 37,
    "wood_block1" : 38,
    "wood_block2" : 39,
    "bongo" : 40,
    "bongo1" : 41,
    "break_drum" : 42,
    "break_drum1" : 43,
    "glass" : 44,
    "glass1" : 45,
    "shaker" : 46,
    "shaker1" : 47,
    "whistle" : 48,
    "whistle1" : 49,
    "hit" : 50,
    "guiro" : 51,
    "clave" : 52,
    "cowbell1" : 53,
    "cowbell2" : 54,
    "dog_bark" : 55,
    "dog_bark2" : 56,
    "triangle" : 57,
    "triangle1" : 58,
    "shaker2" : 59,
    "jingle_bell" : 60,
    "jingle_bell1" : 61,
    "clave1" : 62,
    "kick" : 63,
    "kick1" : 64};
  rand_cymbal_int = Math.floor(Math.random() * cymbals.length);
  rand_kick_int = Math.floor(Math.random() * kicks.length);
  rand_snares_int = Math.floor(Math.random() * snares.length);

  cymbal_choice = cymbals[rand_cymbal_int];
  kick_choice = kicks[rand_kick_int];
  snare_choice = snares[rand_snares_int];

  console.log("cym"+cymbal_choice)
    console.log("choice"+drums[cymbal_choice])
    console.log("drums"+drums)
    return {"cymbal":drums[cymbal_choice], "kick":drums[kick_choice], "snare":drums[snare_choice]};
}
