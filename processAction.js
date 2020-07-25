const processAction = (state) => (action) => {
  action.mutations.forEach((mutation) => mutation(state));

  mutators.processStomach(action)(state);
  mutators.advanceDynamicProperties(action)(state);
  mutators.proceedTime(action.duration)(state);

  render(state);
};
