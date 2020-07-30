const stateFactory = (overrides = {}) => ({
  language: 'fi',
  place: places.find((place) => place.key === PLACE_PARK),
  time: units.hours(9),
  mentalRecovery: 1,
  energy: MAX_ENERGY_RESERVE,
  inventory: [ITEM_BANANA, ITEM_MACARONI_CASSAROLE].map(createItem),
  stomach: [],
  money: 0,
  ...overrides,
});

render(stateFactory());
