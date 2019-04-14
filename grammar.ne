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
question -> %DEFINITION string
  {% ([def, str]) => ({ type: 'html', value: '<h3>Definition</h3>', children: str }) %}
  | string
string -> null
  | plainString
  | plainString meaningfulSpaces string
  # {% (a) => a.map(e => e.chunk).join("") %}
  | plainString fillInBlank string
  # {% (a) => a.map(e => e.chunk).join("") %}
  | meaningfulSpaces string
  # {% (a) => a.map(e => e.chunk).join("") %}
  | fillInBlank string
  # {% (a) => a.map(e => e.chunk).join("") %}

fillInBlank -> %TRIPLE_UNDERSCORE %L_BRACKET plainString %R_BRACKET
  {% ([,,plainString,]) => ({ type: 'FIB', value: '___', blank: plainString }) %}

  | %TRIPLE_UNDERSCORE_DOTS %L_BRACKET plainString %R_BRACKET
  {% ([,,plainString,]) => ({ type: 'FIB', value: '___...', blank: plainString }) %}

  | %TRIPLE_UNDERSCORE %L_PAREN plainString %R_PAREN
  {% ([,,plainString,]) => ({ type: 'FIB', value: '___', blank: plainString }) %}

  | %TRIPLE_UNDERSCORE_DOTS %L_PAREN plainString %R_PAREN
  {% ([,,plainString,]) => ({ type: 'FIB', value: '___...', blank: plainString }) %}

meaningfulSpaces -> %TRIPLE_SPACE
  {% () => ({ type: 'markdown', value: '\n\n' }) %}
  | %DOUBLE_SPACE
  {% () => ({ type: 'markdown', value: '\n' }) %}
plainString -> %TEXT_CHAR
  {% ([ch]) => ({ type: 'markdown', value: ch }) %}
  | %TEXT_CHAR plainString
  {% ([ch, str]) => ({ type: 'markdown', value: ch + str.value }) %}
