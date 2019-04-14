// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");

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
    {"name": "question", "symbols": [(lexer.has("DEFINITION") ? {type: "DEFINITION"} : DEFINITION), "string"], "postprocess": ([def, str]) => ({ left: `Definition: `, right: str })},
    {"name": "question", "symbols": ["string"]},
    {"name": "question", "symbols": ["string", (lexer.has("TRIPLE_Q") ? {type: "TRIPLE_Q"} : TRIPLE_Q), "answer"]},
    {"name": "string", "symbols": [(lexer.has("TEXT_CHAR") ? {type: "TEXT_CHAR"} : TEXT_CHAR)]},
    {"name": "string", "symbols": ["string", (lexer.has("TRIPLE_SPACE") ? {type: "TRIPLE_SPACE"} : TRIPLE_SPACE), "string"], "postprocess": ([space, str]) => ({ left: `\n\n`, right: str })},
    {"name": "string", "symbols": ["string", (lexer.has("DOUBLE_SPACE") ? {type: "DOUBLE_SPACE"} : DOUBLE_SPACE), "string"], "postprocess": ([space, str]) => ({ left: `\n`, right: str })},
    {"name": "string", "symbols": ["string", (lexer.has("TRIPLE_UNDERSCORE") ? {type: "TRIPLE_UNDERSCORE"} : TRIPLE_UNDERSCORE), "string"], "postprocess": ([space, str]) => ({ left: `___`, right: str })},
    {"name": "string", "symbols": ["string", (lexer.has("TRIPLE_UNDERSCORE") ? {type: "TRIPLE_UNDERSCORE"} : TRIPLE_UNDERSCORE), (lexer.has("L_BRACKET") ? {type: "L_BRACKET"} : L_BRACKET), "string", (lexer.has("R_BRACKET") ? {type: "R_BRACKET"} : R_BRACKET), "string"], "postprocess": ([space, lbracket, str, rbracket]) => ({ left: '___',  right: str })},
    {"name": "string", "symbols": [(lexer.has("TEXT_CHAR") ? {type: "TEXT_CHAR"} : TEXT_CHAR), "string"]}
]
  , ParserStart: "question"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
