const pad = (num) => ((num + '').length == 2 ? num : '0' + num);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = ([aX, aY], [bX, bY]) =>
  ((aX - bX) ** 2 + (aY - bY) ** 2) ** 0.5;
const distanceToPlace = (place) => (state) =>
  distance(state.place.coordinates, place.coordinates);

let globalIdCounter = 1;
const generateId = () => globalIdCounter++;

const formats = {
  percent: val => (val * 100).toFixed(1) + '%',
  date: (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    return days;
  },
  time: (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    return `${pad(hours)}:${pad(minutes)}`;
  },
};

const cloneItem = (item) => ({
  ...item,
  id: generateId(),
});
const getItem = (key) => items.find((i) => i.key === key);
const createItem = key => cloneItem(getItem(key));

const on = (eventName, handler) => {
  const attr = 'data-' + Math.floor(Math.random() * 9999999999);
  requestAnimationFrame(() => {
    document.querySelector(`[${attr}]`).addEventListener(eventName, handler);
  });
  return attr;
};

const getReceivedCaloriesForDuration = (state) => (duration) => {
  return state.stomach.reduce((totalCalories, item) => {
    const itemEndTime = item.startTime + item.digestDuration;
    const startY = 2 * item.calories / item.digestDuration;

    const actionStartTime = state.time;
    const actionEndTime = Math.min(itemEndTime, actionStartTime + duration);
    const effectiveDuration = actionEndTime - actionStartTime;
    const actionHalfDuration = effectiveDuration * 0.5;
    const timeSinceItemStart = Math.min(state.time - item.startTime, item.digestDuration);
    const itemHalfTime = Math.min(timeSinceItemStart + actionHalfDuration, itemEndTime);
    const factor = -startY / item.digestDuration;
    const itemHalfTimeY = itemHalfTime * factor + startY;

    const addedCalories = actionHalfDuration * itemHalfTimeY;

    return addedCalories + totalCalories;
  }, 0);
};
