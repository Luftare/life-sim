const stateFactory = (overrides = {}) => ({
  language: 'fi',
  place: places.find((place) => place.key === PLACE_PARK),
  time: units.hours(9),
  mentalRecovery: 1,
  energy: 0,
  inventory: [ITEM_BANANA].map(createItem),
  stomach: [],
  money: 0,
  ...overrides,
});

render(stateFactory());
