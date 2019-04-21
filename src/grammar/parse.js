const nearley = require('nearley');
const grammar = require('./grammar.js');

export function parseLine(line) {
  const output =  _parseLine(line);
  if (output.length === 0) {
    console.warn('Got zero parse results');
  } else if (output.length > 1) {
    console.warn('Got multiple parse results; returning the first');
  }

  return output[0];
}

export function _parseLine(line) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  try {
    parser.feed(line);
    const output = processResults(parser.results);
    return output;
  } catch (e) {
    console.warn('Got exception while processing line', line);
    console.error(e);
    return [];
  }
}

function processResults(results) {
  const blanks = [];

  function _process(results) {
    if (results === null) {
      return null;
    }

    if (Array.isArray(results)) {
      return results.map(r => _process(r)).join("");
    }

    if (Array.isArray(results.children)) {
      return results.value + results.children.map(r => _process(r)).join("");
    }

    if (results.type === 'markdown') {
      return results.value;
    }

    if (results.type === 'fill-in-blank') {
      blanks.push(results.blank.value);
      return results.value;
    }

    return results.value;
  }

  // Technically nearley returns an array of possible results. There's probably
  // just going to be a single element in it, unless the grammar is ambiguous.
  return results.map(result => {
    return {
      question: _process(result.question),
      blanks,
      answer: _process(result.answer),
      tags: result.tags ? _process(result.tags).split(',').map(tag => tag.trim()) : [],
    };
  });
}
