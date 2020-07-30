const getAwareness = state => clamp(state.mentalRecovery * state.energy / (MAX_ENERGY_RESERVE), 0, 1);
const willFindBottle = state => () => getAwareness(state) > Math.random();
const getTimeOfDay = state => state.time % units.days(1);
const getWeekDay = state => Math.floor(state.time / units.days(1)) % 7;
const isShopOpen = state => isBetween(units.hours(10), units.hours(21), state.time);
