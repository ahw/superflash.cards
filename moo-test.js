const moo = require('moo');

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

const text = `
Just as multiple   factors  shape every system, multiple mental models ___...[from a variety of disciplines] are necessary to understand that system. You have to realize the truth of Julian Huxley's idea that, "Life is just ___...[one damn relatedness after another.]"
What is BlackRock AUM? - $6 trillion
MMT - MMT, which has been gain­ing sup­port among high-pro­file De­moc­rats, turns con­ven­tional eco­nomic pol­icy on its head. In­stead of leav­ing macro­economic man­age­ment to the in­ter­est-rate-set­ting com­mit­tee of the Fed­eral Re­serve, MMTers be­lieve it is best han­dled by gov­ern­ment spend­ing and tax­a­tion. The most provoca­tive claim of the the­ory is that gov­ern­ment deficits don’t mat­ter in them­selves for coun­tries—such as the U.S.—that bor­row in their own cur­ren­cies.
Maiden Lane - Maiden Lane Transactions refers to three limited liability companies created by the Federal Reserve Bank of New York in 2008 as a financial vehicle to facilitate transactions involving three entities: the former Bear Stearns company as the first entity, the lending division of the former American International Group (AIG) as the second, and the former AIG's credit default swap division as the third.
Definition: Annuity - An annuity is a series of payments made at equal intervals.
Definition: Credit Spread - A credit spread is the difference in yield between a U.S. Treasury bond and another debt security of the same maturity but different credit quality. 
What is world GDP? - $45 trillion
How do you measure the liquidity of a stock? - Liquidity can be measured either based on trade volume relative to shares outstanding or based on the bid-ask spread or transactions costs of trading. Money, or cash, is the most liquid asset, because it can be "sold" for goods and services instantly with no loss of value.
End of the U.S. gold standard? - AUGUST 15, 1971, United States President Richard Nixon announced that foreign-held U.S. dollars would no longer be convertible into gold—thus stripping away the last vestige of the international gold standard.
`;

text.split('\n').filter(l => l).forEach(line => {
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
