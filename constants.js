const ACTION_COLLECT_BOTTLES = 'collectBottles';
const ACTION_SLEEP = 'sleep';
const ACTION_WALK = 'walk';
const ACTION_BUY_ITEM = 'buyItem';
const ACTION_SELL_ITEM = 'sellItem';
const ACTION_CONSUME_ITEM = 'consumeItem';

const ITEM_BOTTLE = 'bottle';
const ITEM_BANANA = 'banana';

const PLACE_PARK = 'park';
const PLACE_SHOP = 'shop';

const WALK_SPEED_KM_H = units.kilometers(8);

const DOM = {
  actionsContainer: document.getElementById('actions-container'),
  statsContainer: document.getElementById('stats-container'),
  travelOptions: document.getElementById('travel-options'),
  inventory: document.getElementById('inventory'),
};
