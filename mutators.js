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

    const receivedCalories = getReceivedCaloriesForDuration(state)(action.duration);

    state.energy = Math.min(300, state.energy + receivedCalories);

    state.stomach = state.stomach.filter(
      (item) => item.startTime + item.digestDuration > actionEndTime
    );
  },
  advanceDynamicProperties: (action) => (state) => {
    state.energy -= action.power * action.duration;
    state.mentalRecovery += (action.mentalRecovery || IDLE_MENTAL_RECOVERY_DRAIN) * action.duration;
  },
  setPlace: (place) => (state) => (state.place = place),
};
