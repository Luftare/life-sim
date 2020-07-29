const items = [
  {
    key: ITEM_BANANA,
    cost: 0.75,
    digestDuration: units.hours(3),
    calories: units.calories(105),
    actions: [{
      key: ITEM_ACTION_CONSUME
    }],
  },
  {
    key: ITEM_BOTTLE,
    value: 0.2,
    actions: [{
      key: ITEM_ACTION_SELL,
      textKey: TEXT_RETURN,
    }],
  },
];
