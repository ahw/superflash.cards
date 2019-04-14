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
  | PS
  | PS meaningfulSpaces string
  # {% (a) => a.map(e => e.chunk).join("") %}
  | PS fillInBlank string
  # {% (a) => a.map(e => e.chunk).join("") %}
  | meaningfulSpaces string
  # {% (a) => a.map(e => e.chunk).join("") %}
  | fillInBlank string
  # {% (a) => a.map(e => e.chunk).join("") %}

fillInBlank -> %TRIPLE_UNDERSCORE %L_BRACKET PS %R_BRACKET
  {% ([,,PS,]) => ({ type: 'html', value: '<span style="display:inline-block; width:3em; background:white; border:1px solid black; text-align:center">?</span>', blank: PS }) %}

  | %TRIPLE_UNDERSCORE_DOTS %L_BRACKET PS %R_BRACKET
  {% ([,,PS,]) => ({ value: '<span style="display:inline-block; width:3em; background:white; border:1px solid black; text-align:center">?</span>', blank: PS }) %}

  | %TRIPLE_UNDERSCORE %L_PAREN PS %R_PAREN
  {% ([,,PS,]) => ({ value: '<span style="display:inline-block; width:3em; background:white; border:1px solid black; text-align:center">?</span>', blank: PS }) %}

  | %TRIPLE_UNDERSCORE_DOTS %L_PAREN PS %R_PAREN
  {% ([,,PS,]) => ({ value: '<span style="display:inline-block; width:3em; background:white; border:1px solid black; text-align:center">?</span>', blank: PS }) %}

meaningfulSpaces -> %TRIPLE_SPACE
  {% () => ({ value: '\n\n' }) %}
  | %DOUBLE_SPACE
  {% () => ({ value: '\n' }) %}
PS -> %TEXT_CHAR
  {% ([ch]) => ({ type: 'PS', value: ch }) %}
  | %TEXT_CHAR PS
  {% ([ch, str]) => ({ type: 'PS', value: ch + str.value }) %}
