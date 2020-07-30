const purchasableFoodItems = [
  {
    key: ITEM_BANANA,
    cost: 0.75,
    calories: units.calories(105),
    digestDuration: units.hours(4),
  },
  {
    key: ITEM_CHOCOLATE,
    cost: 1.2,
    calories: units.calories(250),
    digestDuration: units.hours(1),
  },
  {
    key: ITEM_MACARONI_CASSAROLE,
    cost: 3.5,
    calories: units.calories(700),
    digestDuration: units.hours(4),
  }
].map(
  item => ({
    ...item,
    isPurchasable: true,
    actions: [{
      key: ITEM_ACTION_CONSUME
    }],
  })
);

const items = [
  ...purchasableFoodItems,
  {
    key: ITEM_BOTTLE,
    value: 0.2,
    actions: [{
      key: ITEM_ACTION_SELL,
      textKey: TEXT_RETURN,
    }],
  },
];
