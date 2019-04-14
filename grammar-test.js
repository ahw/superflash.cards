const nearley = require("nearley");
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
// Parse something!
let s = "Definition: hello here is ___[somethign]";
s = 'Just as multiple   factors  shape every system, multiple mental models ___...[from a variety of disciplines] are necessary to understand that system. You have to realize the truth of Julian Huxley\'s idea that, "Life is just ___...[one damn relatedness after another.]"';
console.log(s);
console.log();
// parser.feed("Definition: hello here is    ___[somethign]");
parser.feed(s);
// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results, null, '    ')); // [[[[ "foo" ],"\n" ]]]
