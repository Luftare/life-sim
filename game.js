const stateFactory = (overrides = {}) => ({
  language: 'fi',
  place: places.find((place) => place.key === PLACE_PARK),
  time: units.hours(9),
  energy: 0,
  inventory: [cloneItem(getItem(ITEM_BANANA))],
  stomach: [],
  money: 0,
  ...overrides,
});

render(stateFactory());
