// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo');

const lexer = moo.compile({
  DEFINITION: /Definition: ?/,
  TRIPLE_SPACE: /   /, 
  DOUBLE_SPACE: /  /,
  ESCAPED_TAB: /\\t/,
  ESCAPED_NEWLINE: /\\n/,
  TRIPLE_UNDERSCORE_DOTS: /___\.\.\./,
  TRIPLE_UNDERSCORE: /___/,
  TRIPLE_X_DOTS: /xxx\.\.\./,
  TRIPLE_X: /xxx/,
  TRIPLE_Q: /\?\?\?/,
  L_BRACKET: /\[/,
  R_BRACKET: /\]/,
  L_PAREN: /\(/,
  R_PAREN: /\)/,
  SPACE_DASH_SPACE: / - /,
  NEWLINE: { match: '\n', lineBreaks: true },
  TEXT_CHAR: /./,
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "card", "symbols": ["question", (lexer.has("TRIPLE_Q") ? {type: "TRIPLE_Q"} : TRIPLE_Q), "answer"], "postprocess": ([question, , answer]) => ({ question, answer })},
    {"name": "card", "symbols": ["question"], "postprocess": ([question]) => ({ question, answer: null })},
    {"name": "answer", "symbols": ["string"]},
    {"name": "question", "symbols": [(lexer.has("DEFINITION") ? {type: "DEFINITION"} : DEFINITION), "string"], "postprocess": ([def, str]) => ({ type: 'markdown', value: '### Definition\n', children: str })},
    {"name": "question", "symbols": ["string"]},
    {"name": "string", "symbols": []},
    {"name": "string", "symbols": ["plainString"]},
    {"name": "string", "symbols": ["plainString", "meaningfulSpaces", "string"]},
    {"name": "string", "symbols": ["plainString", "fillInBlank", "string"]},
    {"name": "string", "symbols": ["meaningfulSpaces", "string"]},
    {"name": "string", "symbols": ["fillInBlank", "string"]},
    {"name": "fillInBlank", "symbols": [(lexer.has("TRIPLE_UNDERSCORE") ? {type: "TRIPLE_UNDERSCORE"} : TRIPLE_UNDERSCORE), (lexer.has("L_BRACKET") ? {type: "L_BRACKET"} : L_BRACKET), "plainString", (lexer.has("R_BRACKET") ? {type: "R_BRACKET"} : R_BRACKET)], "postprocess": ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___', blank: plainString })},
    {"name": "fillInBlank", "symbols": [(lexer.has("TRIPLE_UNDERSCORE_DOTS") ? {type: "TRIPLE_UNDERSCORE_DOTS"} : TRIPLE_UNDERSCORE_DOTS), (lexer.has("L_BRACKET") ? {type: "L_BRACKET"} : L_BRACKET), "plainString", (lexer.has("R_BRACKET") ? {type: "R_BRACKET"} : R_BRACKET)], "postprocess": ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___...', blank: plainString })},
    {"name": "fillInBlank", "symbols": [(lexer.has("TRIPLE_UNDERSCORE") ? {type: "TRIPLE_UNDERSCORE"} : TRIPLE_UNDERSCORE), (lexer.has("L_PAREN") ? {type: "L_PAREN"} : L_PAREN), "plainString", (lexer.has("R_PAREN") ? {type: "R_PAREN"} : R_PAREN)], "postprocess": ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___', blank: plainString })},
    {"name": "fillInBlank", "symbols": [(lexer.has("TRIPLE_UNDERSCORE_DOTS") ? {type: "TRIPLE_UNDERSCORE_DOTS"} : TRIPLE_UNDERSCORE_DOTS), (lexer.has("L_PAREN") ? {type: "L_PAREN"} : L_PAREN), "plainString", (lexer.has("R_PAREN") ? {type: "R_PAREN"} : R_PAREN)], "postprocess": ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___...', blank: plainString })},
    {"name": "meaningfulSpaces", "symbols": [(lexer.has("TRIPLE_SPACE") ? {type: "TRIPLE_SPACE"} : TRIPLE_SPACE)], "postprocess": () => ({ type: 'markdown', value: '\n\n' })},
    {"name": "meaningfulSpaces", "symbols": [(lexer.has("DOUBLE_SPACE") ? {type: "DOUBLE_SPACE"} : DOUBLE_SPACE)], "postprocess": () => ({ type: 'markdown', value: '\n' })},
    {"name": "plainString", "symbols": [(lexer.has("TEXT_CHAR") ? {type: "TEXT_CHAR"} : TEXT_CHAR)], "postprocess": ([ch]) => ({ type: 'markdown', value: ch })},
    {"name": "plainString", "symbols": [(lexer.has("TEXT_CHAR") ? {type: "TEXT_CHAR"} : TEXT_CHAR), "plainString"], "postprocess": ([ch, str]) => ({ type: 'markdown', value: ch + str.value })}
]
  , ParserStart: "card"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
