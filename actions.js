const generatePurchaseItemActions = () =>
  items
    .filter((item) => item.isPurchasable)
    .map((item) => ({
      key: `purchase-item-${item.key}`,
      duration: units.minutes(1),
      energyPerHour: units.calories(20),
      mutations: [
        mutators.receiveMoney(-item.cost),
        mutators.receiveItem(item),
      ],
    }));

const actions = [
  {
    key: ACTION_COLLECT_BOTTLES,
    duration: units.minutes(10),
    energyPerHour: units.calories(50),
    mutations: [mutators.receiveItem(getItem(ITEM_BOTTLE))],
  },
  {
    key: ACTION_SLEEP,
    duration: units.hours(4),
    energyPerHour: units.calories(5),
    mutations: [],
  },
  ...generatePurchaseItemActions(),
];

const dynamicActions = {
  walkTo: (place) => (state) => {
    const duration = units.hours(
      distanceToPlace(place)(state) / WALK_SPEED_KM_H
    );

    return {
      key: ACTION_WALK,
      duration,
      energyPerHour: units.calories(40),
      mutations: [mutators.setPlace(place)],
    };
  },
  buyItem: (item) => (state) => {
    return {
      key: ACTION_BUY_ITEM,
      duration: units.minutes(3),
      energyPerHour: units.calories(20),
      mutations: [
        mutators.receiveItem(item),
        mutators.receiveMoney(-item.cost),
      ],
    };
  },
  sellItem: (item) => (state) => {
    return {
      key: ACTION_SELL_ITEM,
      duration: units.minutes(1),
      energyPerHour: units.calories(20),
      mutations: [mutators.receiveMoney(item.value), mutators.removeItem(item)],
    };
  },
  consumeItem: (item) => (state) => {
    return {
      key: ACTION_CONSUME_ITEM,
      duration: units.minutes(2),
      energyPerHour: units.calories(15),
      mutations: [mutators.consumeItem(item), mutators.removeItem(item)],
    };
  },
};
