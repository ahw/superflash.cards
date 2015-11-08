export const UPDATE_LAST_SEEN_TIMESTAMP = 'UPDATE_LAST_SEEN_TIMESTAMP';
export const ADD_CARD = 'ADD_CARD';

export function updateLastSeenTimestamp(id, lastSeenTimestamp) {
  return {
    type: UPDATE_LAST_SEEN_TIMESTAMP,
    payload: {
      id,
      lastSeenTimestamp
    }
  };
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    payload: {
      card
    }
  }
}
