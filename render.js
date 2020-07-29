const renderStats = (state) => {
  const getText = getTranslations(state.language);

  const DOM = {
    actionsContainer: document.getElementById('actions-container'),
    statsContainer: document.getElementById('stats-container'),
    travelOptions: document.getElementById('travel-options'),
  };

  DOM.statsContainer.innerHTML = `
    <div>
      <h2>${getText(state.place.key)}</h2>
      <div>money: ${state.money.toFixed(2)}€</div>
      <div>mental recovery: ${formats.percent(state.mentalRecovery)}</div>
      <div>energy: ${state.energy.toFixed(0)} cal</div>
      <div>stomach: ${state.stomach.length}</div>
      <div>day: ${formats.date(state.time)}</div>
      <div>time: ${formats.time(state.time)}</div>
    </div>
  `;
};

const renderTravelOptions = (state) => {
  const getText = getTranslations(state.language);

  const travelActions = getTravelActions(state);

  const optionsHTML = travelActions
    .map(
      (action) => `
      <button ${on('click', () =>
        processAction(state)(action)
      )}>${getText(action.place.key)}</button>
`
    )
    .join('');

  DOM.travelOptions.innerHTML = `
    <h4>${getText('travel')}</h4>
    ${optionsHTML}
      `;
};

const renderActions = (state) => {
  const getText = getTranslations(state.language);

  const buttonText = (action) => {
    return getText(action.key) || action.key;
  };

  const actions = getActions(state).filter(action => action.enabledAt.includes(state.place.key));

  const optionsHTML = actions
    .map(
      (action) => `
    <button
      ${on('click', () => {
        processAction(state)(action);
      })}
      >${buttonText(action)}</button >`
    )
    .join('');

  DOM.actionsContainer.innerHTML = `
  <h4> ${getText('actions')}</h4>
  ${optionsHTML}
`;
};

const renderInventory = (state) => {
  const getText = getTranslations(state.language);

  const itemActionCreators = getItemActionCreators(state);

  const getItemActions = item => item.actions.map(({ key, ...rest }) => ({
    ...itemActionCreators.find(a => a.key === key).create(item),
    ...rest,
  })).filter(action => action.enabledAt.includes(state.place.key));

  const itemsHTML = state.inventory
    .map(item => [item, getItemActions(item)])
    .map(
      ([item, actions]) => `
  <div>
    <span>${getText(item.key)}</span>
${actions.map(action => `
      <button ${on('click', () => processAction(state)(action))} >${getText(action.textKey || action.key)}</button>
    `).join('')}
  </div >
    `).join('');

  DOM.inventory.innerHTML = `
  <h4> ${getText('inventory')}</h4>
  ${itemsHTML}`;
};

const render = (state) =>
  [
    renderStats,
    renderActions,
    renderTravelOptions,
    renderInventory,
  ].forEach((fn) => fn(state));
