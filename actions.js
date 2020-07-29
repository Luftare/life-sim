const generatePurchaseItemActions = (state) =>
  items
    .filter((item) => item.isPurchasable)
    .map((item) => ({
      key: `purchase-item-${item.key}`,
      duration: units.minutes(1),
      power: units.caloriesPerHour(20),
      enabledAt: [PLACE_SHOP],
      mutations: [
        mutators.receiveMoney(-item.cost),
        mutators.receiveItem(item),
      ],

    }));

const getActions = state => [
  {
    key: ACTION_COLLECT_BOTTLES,
    enabledAt: [PLACE_PARK],
    duration: units.minutes(10),
    power: units.caloriesPerHour(30),
    mutations: [mutators.receiveItem(getItem(ITEM_BOTTLE))],
  },
  (() => {
    const toRecover = 1 - state.mentalRecovery;
    const duration = toRecover / SLEEP_MENTAL_RECOVERY;

    return {
      key: ACTION_SLEEP,
      power: units.caloriesPerHour(15) * units.toHours(duration),
      enabledAt: [PLACE_PARK],
      mentalRecovery: toRecover / duration,
      duration,
      mutations: [],
    };
  })(),
  ...generatePurchaseItemActions(state),
];

const getTravelActions = state => places.filter(p => p.key !== state.place.key).map(place => {
  const duration = units.hours(
    distanceToPlace(place)(state) / WALK_SPEED_KM_H
  );

  return {
    key: ACTION_WALK,
    place,
    duration,
    enabledAt: places.map(p => p.key),
    power: units.caloriesPerHour(40),
    mutations: [mutators.setPlace(place)],
  };
});

const getItemActionCreators = state => [
  {
    key: ITEM_ACTION_SELL,
    create: item => ({
      key: ITEM_ACTION_SELL,
      duration: units.minutes(1),
      power: units.caloriesPerHour(20),
      enabledAt: [PLACE_SHOP],
      mutations: [mutators.receiveMoney(item.value), mutators.removeItem(item)],
    })
  },
  {
    key: ITEM_ACTION_CONSUME,
    create: item => ({
      key: ITEM_ACTION_CONSUME,
      duration: units.minutes(2),
      power: units.caloriesPerHour(15),
      enabledAt: places.map(p => p.key),
      mutations: [mutators.consumeItem(item), mutators.removeItem(item)],
    })
  }
];
