@{%
const moo = require('moo');

const lexer = moo.compile({
  DEFINITION: /Definition: ?/,
  TRIPLE_SPACE: /   /, 
  DOUBLE_SPACE: /  /,
  ESCAPED_TAB: /\\t/,
  ESCAPED_NEWLINE: /\\n/,
  TRIPLE_UNDERSCORE_DOTS: /___\.\.\./,
  TRIPLE_UNDERSCORE: /___/,
  TRIPLE_X_DOTS: /[xX]{3}\.\.\./,
  TRIPLE_X: /[xX]{3}/,
  TRIPLE_Q: / \?\?\? /,
  TRIPLE_HASH: / ### /,
  L_BRACKET: /\[/,
  R_BRACKET: /\]/,
  L_PAREN: /\(/,
  R_PAREN: /\)/,
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
card ->
  question %TRIPLE_Q answer %TRIPLE_HASH plainString
  {% ([question, qqq, answer, hhh, tags]) => ({ question, answer, tags }) %}

  |question %TRIPLE_Q answer
  {% ([question, qqq, answer]) => ({ question, answer, tags: null }) %}

  | question %TRIPLE_HASH plainString
  {% ([question, hhh, tags]) => ({ question, answer: null, tags }) %}

  | question
  {% ([question]) => ({ question, answer: null, tags: null }) %}

answer -> string

question ->
  %DEFINITION string
  {% ([def, str]) => ({ type: 'markdown', value: '### Definition\n', children: str }) %}

  | string

string -> null
  | plainString
  | plainString meaningfulSpaces string
  | plainString fillInBlank string
  | meaningfulSpaces string
  | fillInBlank string

fillInBlank ->
  %TRIPLE_UNDERSCORE %L_BRACKET plainString %R_BRACKET
  {% ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___', blank: plainString }) %}

  | %TRIPLE_UNDERSCORE_DOTS %L_BRACKET plainString %R_BRACKET
  {% ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___...', blank: plainString }) %}

  | %TRIPLE_UNDERSCORE %L_PAREN plainString %R_PAREN
  {% ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___', blank: plainString }) %}

  | %TRIPLE_UNDERSCORE_DOTS %L_PAREN plainString %R_PAREN
  {% ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___...', blank: plainString }) %}

  |%TRIPLE_X %L_BRACKET plainString %R_BRACKET
  {% ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___', blank: plainString }) %}

  | %TRIPLE_X_DOTS %L_BRACKET plainString %R_BRACKET
  {% ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___...', blank: plainString }) %}

  | %TRIPLE_X %L_PAREN plainString %R_PAREN
  {% ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___', blank: plainString }) %}

  | %TRIPLE_X_DOTS %L_PAREN plainString %R_PAREN
  {% ([,,plainString,]) => ({ type: 'fill-in-blank', value: '___...', blank: plainString }) %}

meaningfulSpaces ->
  %TRIPLE_SPACE
  {% () => ({ type: 'markdown', value: '\n\n' }) %}

  | %DOUBLE_SPACE
  {% () => ({ type: 'markdown', value: '\n' }) %}

plainString ->
  %TEXT_CHAR
  {% ([ch]) => ({ type: 'markdown', value: ch }) %}
  | %TEXT_CHAR plainString
  {% ([ch, str]) => ({ type: 'markdown', value: ch + str.value }) %}
  | %L_PAREN plainString
  {% ([ch, str]) => ({ type: 'markdown', value: ch + str.value }) %}
  | %R_PAREN plainString
  {% ([ch, str]) => ({ type: 'markdown', value: ch + str.value }) %}
  | %L_BRACKET plainString
  {% ([ch, str]) => ({ type: 'markdown', value: ch + str.value }) %}
  | %R_BRACKET plainString
  {% ([ch, str]) => ({ type: 'markdown', value: ch + str.value }) %}
