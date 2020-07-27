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
      <div>energy: ${state.energy.toFixed(0)} cal</div>
      <div>stomach: ${state.stomach.length}</div>
      <div>day: ${formats.date(state.time)}</div>
      <div>time: ${formats.time(state.time)}</div>
    </div>
  `;
};

const renderTravelOptions = (state) => {
  const getText = getTranslations(state.language);

  const placesToTravel = places.filter((place) => place !== state.place);

  const optionsHTML = placesToTravel
    .map(
      (place) => `
  <button ${on('click', () =>
    processAction(state)(dynamicActions.walkTo(place)(state))
  )}>${getText(place.key)}</button>
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
  const enabledActions = state.place.actions
    .map((key) => actions.find((action) => action.key === key))
    .filter(Boolean);

  const buttonText = (action) => {
    if (action.key.includes('purchase-item-')) {
      const itemkey = action.key.split('purchase-item-')[1];
      return `${getText('buy')} ${getText(itemkey)}`;
    } else {
      return getText(action.key);
    }
  };

  const optionsHTML = enabledActions
    .map(
      (action) => `
      <button ${on('click', () => processAction(state)(action))}>${buttonText(
        action
      )}</button>`
    )
    .join('');

  DOM.actionsContainer.innerHTML = `
    <h4>${getText('actions')}</h4>
    ${optionsHTML}
  `;
};

const renderInventory = (state) => {
  const getText = getTranslations(state.language);

  const buttonText = (item) => {
    if (item.isConsumable) return getText('consume');
    if (item.isSellable) return getText('sell');
    return getText('use');
  };

  const isActivateable = (item) => {
    if (item.isSellable && !state.place.actions.includes(ACTION_SELL_ITEM)) {
      return false;
    }

    return true;
  };

  const createAction = (item) => {
    if (item.isConsumable) return dynamicActions.consumeItem(item)(state);
    if (item.isSellable) return dynamicActions.sellItem(item)(state);
  };

  const itemsHTML = state.inventory
    .map(
      (item) => `
    <div>
      <span>${getText(item.key)}</span>
      <button ${on('click', () => processAction(state)(createAction(item)))} ${
        isActivateable(item) ? '' : 'disabled'
      }>${buttonText(item)}</button>
    </div>
  `
    )
    .join('');

  DOM.inventory.innerHTML = `
    <h4>${getText('inventory')}</h4>
    ${itemsHTML}
  `;
};

const render = (state) =>
  [
    renderStats,
    renderActions,
    renderTravelOptions,
    renderInventory,
  ].forEach((fn) => fn(state));
