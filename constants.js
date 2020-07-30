const ACTION_COLLECT_BOTTLES = 'collectBottles';
const ACTION_SLEEP = 'sleep';
const ACTION_WALK = 'walk';
const ACTION_BUY_ITEM = 'buyItem';
const ACTION_IDLE = 'idle';

const ITEM_ACTION_SELL = 'sellItem';
const ITEM_ACTION_CONSUME = 'consumeItem';

const ITEM_BOTTLE = 'bottle';
const ITEM_BANANA = 'banana';
const ITEM_CHOCOLATE = 'chocolate';
const ITEM_MACARONI_CASSAROLE = 'macaroniCassarole';

const PLACE_PARK = 'park';
const PLACE_SHOP = 'shop';

const TEXT_RETURN = 'return';

const MAX_ENERGY_RESERVE = units.calories(600);

const WALK_SPEED = units.kilometers(7) / units.hours(1);
const IDLE_MENTAL_RECOVERY_DRAIN = -(1 / 16) / units.hours(1);
const SLEEP_MENTAL_RECOVERY = -IDLE_MENTAL_RECOVERY_DRAIN * 2;
