@{%
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
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

#expression -> %question %answer
#expression -> %question %divider %answer
#string -> %text*
#  | %text* %TRIPLE_X
#
question -> %DEFINITION string {% ([def, str]) => ({ left: `Definition: `, right: str }) %}
  | string
  | string %TRIPLE_Q answer
string -> %TEXT_CHAR
  | string %TRIPLE_SPACE string {% ([space, str]) => ({ left: `\n\n`, right: str }) %}
  | string %DOUBLE_SPACE string {% ([space, str]) => ({ left: `\n`, right: str })  %}
  | string %TRIPLE_UNDERSCORE string {% ([space, str]) => ({ left: `___`, right: str }) %}
  | string %TRIPLE_UNDERSCORE %L_BRACKET string %R_BRACKET string {% ([space, lbracket, str, rbracket]) => ({ left: '___',  right: str }) %}
  | %TEXT_CHAR string
