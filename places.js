const places = [
  {
    key: PLACE_PARK,
    coordinates: [units.kilometers(0), units.kilometers(0)],
    actions: [ACTION_COLLECT_BOTTLES, ACTION_SLEEP],
  },
  {
    key: PLACE_SHOP,
    coordinates: [units.kilometers(0), units.kilometers(5)],
    actions: [
      ACTION_SELL_ITEM,
      ...generatePurchaseItemActions().map((a) => a.key),
    ],
  },
];
