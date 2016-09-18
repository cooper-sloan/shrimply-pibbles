function generateStructure () {
  var order = [];
  var intro = {};
  intro["section"] = "intro";
  intro["length"] = randMultipleOfFour(8, 16);
  order.push(intro);

  for (i = 0; i < getRandInRange(1, 3); i++) {
    verse = {};
    verse["section"] = "verse";
    verse["length"] = randMultipleOfFour(16, 32);
    hook = {};
    hook["section"] = "hook";
    hook["length"] = randMultipleOfFour(8, 16);
    chorus = {};
    chorus["section"] = "chorus";
    chorus["length"] = randMultipleOfFour(16, 32);
    order.push(verse);
    order.push(hook);
    order.push(chorus);
  }

  var outro = {};
  outro["section"] = "outro";
  outro["length"] = randMultipleOfFour(8, 16);
  order.push(outro);
  return order;
}

function getRandInRange (start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
function randMultipleOfFour (start, end) {
  var rand = getRandInRange(start, end)
  return rand - (rand%4)
}
