const mutators = {
  receiveMoney: (amount) => (state) => {
    state.money += amount;
  },
  receiveItem: (item) => (state) => {
    state.inventory.push(cloneItem(item));
  },
  proceedTime: (amount) => (state) => {
    state.time += amount;
  },
  consumeItem: (item) => (state) => {
    state.stomach.push({
      ...item,
      startTime: state.time,
    });
  },
  removeItem: (item) => (state) => {
    state.inventory = state.inventory.filter(({ id }) => item.id !== id);
  },
  processStomach: (action) => (state) => {
    const actionEndTime = state.time + action.duration;

    const totalCalories = getStomachCalories(state)(action);

    state.energy += totalCalories;
    state.energy = Math.min(150, state.energy);

    state.stomach = state.stomach.filter(
      (item) => item.startTime + item.duration > actionEndTime
    );
  },
  advanceDynamicProperties: (action) => (state) => {
    state.energy -= action.energyPerHour * units.toHours(action.duration);
  },
  setPlace: (place) => (state) => (state.place = place),
};
