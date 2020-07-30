const getItemDescription = item => {
  const parts = [];

  if (item.actions.some(a => a.key === ITEM_ACTION_CONSUME)) {
    parts.push(`${item.calories}cal, ${formats.duration(item.digestDuration)}`);
  }

  if (item.actions.some(a => a.key === ITEM_ACTION_SELL)) {
    parts.push(`+${item.value}€`);
  }

  return parts.join('\n');
};

const getActionDescription = action => {
  const parts = [];

  if (action.key === ACTION_BUY_ITEM) {
    parts.push(`-${action.item.cost}€`);
  }

  if (action.item) {
    parts.push(getItemDescription(action.item));
  }

  parts.push(formats.duration(action.duration));

  return parts.filter(Boolean).join('\n');
};

const getPlaceDescription = place => (place.availability ?? []).map(formats.time).join(' - ');
const getTravelActionDescription = action => `${units.toKilometers(action.distance)}km${action.place.availability ? '\n' + getPlaceDescription(action.place) : ''}`;