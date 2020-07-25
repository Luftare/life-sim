const pad = (num) => ((num + '').length == 2 ? num : '0' + num);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = ([aX, aY], [bX, bY]) =>
  ((aX - bX) ** 2 + (aY - bY) ** 2) ** 0.5;
const distanceToPlace = (place) => (state) =>
  distance(state.place.coordinates, place.coordinates);

let globalIdCounter = 1;
const generateId = () => globalIdCounter++;

const formats = {
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
