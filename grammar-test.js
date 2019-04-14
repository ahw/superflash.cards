const nearley = require("nearley");
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
// Parse something!
console.log('Definition: hello here is    ___[somethign]');
console.log();
parser.feed("Definition: hello here is    ___[somethign]");
// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results, null, '    ')); // [[[[ "foo" ],"\n" ]]]
