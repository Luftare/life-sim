const cloneItem = (item) => ({
  ...item,
  id: generateId(),
});
const getItem = (key) => items.find((i) => i.key === key);

const items = [
  {
    key: ITEM_BANANA,
    cost: 0.75,
    isPurchasable: true,
    isSellable: false,
    isConsumable: true,
    duration: units.hours(2),
    calories: units.calories(105),
  },
  {
    key: ITEM_BOTTLE,
    isPurchasable: false,
    isSellable: true,
    isConsumable: false,
    value: 0.2,
  },
];
