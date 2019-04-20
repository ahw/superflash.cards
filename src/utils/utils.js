export function getUserMetadata(infoDeck) {
  const userMetadata = {};
  if (infoDeck && infoDeck.cards) {
    infoDeck.cards.forEach(card => userMetadata[card.question] = card.answer);
  }
  return userMetadata;
}
