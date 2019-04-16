const nearley = require("nearley");
const grammar = require("./grammar.js");
const testStrings = require('./grammar-test-strings');

// Parse something!
const blankSpace = '<span style="display:inline-block; width:3em; background:white; border:1px solid black; text-align:center">?</span>';
const blankSpaceDots = '<span style="display:inline-block; width:3em; background:white; border:1px solid black; text-align:center">?&hellip;?</span>';

// let s = "Definition: hello here is ___[somethign]";
// s = 'Just as multiple   factors  shape every system, multiple mental models ___...[from a variety of disciplines] are necessary to understand that system. You have to realize the truth of Julian Huxley\'s idea that, "Life is just ___...[one damn relatedness after another.]"';
// console.log('> ' + s);
// console.log();

// parser.feed("Definition: hello here is    ___[somethign]");
testStrings.forEach(line => {
  // Create a Parser object from our grammar.
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  console.log('> ' + line);
  try {
    parser.feed(line);
    // parser.results is an array of possible parsings.
    // console.log(JSON.stringify(parser.results, null, '    '));
    const output = print(parser.results);
    console.log(output);
  } catch (e) {
    console.log(e);
  }
});

// if (parser.results.length > 1) {
//   console.log(`Got multiple parse results (${parser.results.length})`);
// } else {
//   const output = print(parser.results);
//   console.log(output);
// }
// // console.log(JSON.stringify(parser.results, null, '    ')); // [[[[ "foo" ],"\n" ]]]

function print(results) {
  const blanks = [];

  function _print(results) {
    if (results === null) {
      return null;
    }

    if (Array.isArray(results)) {
      return results.map(r => _print(r)).join("");
    }

    if (Array.isArray(results.children)) {
      // console.log('printing nested array...');
      return results.value + results.children.map(r => _print(r)).join("");
    }

    // console.log(results.type, results.value);
    if (results.type === 'markdown') {
      // console.log('returning markdown');
      return results.value;
    }

    if (results.type === 'fill-in-blank') {
      blanks.push(results.blank.value);
      return results.value;
    }

    console.log(`Just returning results.value ${results.value}`);
    return results.value;
  }

  return results.map(result => {
    return {
      question: _print(result.question),
      blanks,
      answer: _print(result.answer)
    };
  });

  // return {
  //   markdown: _print(results),
  //   blanks,
  // };
}
