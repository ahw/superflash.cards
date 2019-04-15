const moo = require('moo');
const testStrings = require('./grammar-test-strings');

// const lexer = moo.compile({
//   DEFINITION: /Definition: ?/,
//   TRIPLE_SPACE: /   /, 
//   DOUBLE_SPACE: /  /,
//   ESCAPED_TAB: /\\t/,
//   ESCAPED_NEWLINE: /\\n/,
//   TRIPLE_UNDERSCORE_DOTS: /___\.\.\./,
//   TRIPLE_UNDERSCORE: /___/,
//   TRIPLE_X_DOTS: /xxx\.\.\./,
//   TRIPLE_X: /xxx/,
//   LBRACKET: /\[/,
//   RBRACKET: /\]/,
//   SPACE_DASH_SPACE: / - /,
//   TEXT: /.+?/,
//   NEWLINE: { match: '\n', lineBreaks: true },
// });

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

testStrings.forEach(line => {
  lexer.reset(line);
  console.log(line);
  for(let token of lexer) {
    console.log(token.type, token.value);
  }
});

function Parser() {
  this.reset();
  this.states = {
    Q: 'Q',
    TEXT: 'TEXT',
    BLANK: 'blank',
    SUBSTITUTION: 'substition',
    A: 'A',
  };
}

Parser.prototype.reset = function() {
  this.question = "";
  this.answer = "";
  this.blankFillers = [];
  this.currentState = this.states.Q;
}

Parser.prototype.feed = function(token) {
  switch (this.currentState) {
    case this.states.Q:
      if (token.type === 'TEXT') {
        this.currentState = this.states.TEXT;
        this.question += token.value;
      } else if (token.type === 'DEFINITION') {
        this.question += '<h3>Defintion</h3>';
        this.currentState = this.states.TEXT;
      } else if (token.type === 'TRIPLE_UNDERSCORE_DOTS') {
        this.currentState = this.states.BLANK;
      }
      break;
    default:
        return;
  }
}
