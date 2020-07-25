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
  const placesToTravel = places.filter((place) => place !== state.place);

  const optionsHTML = placesToTravel
    .map(
      (place) => `
  <button id="travel-to-${place.key}">${place.key}</button>
`
    )
    .join('');

  DOM.travelOptions.innerHTML = `
    <h4>Travel to</h4>
    ${optionsHTML}
  `;

  placesToTravel.forEach((place) => {
    const action = dynamicActions.walkTo(place)(state);

    document
      .getElementById(`travel-to-${place.key}`)
      .addEventListener('click', () => processAction(state)(action));
  });
};

const renderActions = (state) => {
  console.log(state);
  const getText = getTranslations(state.language);
  const enabledActions = state.place.actions
    .map((key) => actions.find((action) => action.key === key))
    .filter(Boolean);

  const optionsHTML = enabledActions
    .map(
      (action) => `
      <button id="action-${action.key}">${getText(action.key)}</button>`
    )
    .join('');

  DOM.actionsContainer.innerHTML = `
    <h4>Actions</h4>
    ${optionsHTML}
  `;

  enabledActions.forEach((action) => {
    document
      .getElementById(`action-${action.key}`)
      .addEventListener('click', () => processAction(state)(action));
  });
};

const renderInventory = (state) => {
  const buttonText = (item) => {
    if (item.isConsumable) return 'consume';
    if (item.isSellable) return 'sell';
    return 'use';
  };

  const isActivateable = (item) => {
    if (item.isSellable && !state.place.actions.includes(ACTION_SELL_ITEM)) {
      return false;
    }

    return true;
  };

  const itemsHTML = state.inventory
    .map(
      (item, index) => `
    <div>
      <span>${item.key}</span>
      <button id="inventory-item-${item.key}-${index}" ${
        isActivateable(item) ? '' : 'disabled'
      }>${buttonText(item)}</button>
    </div>
  `
    )
    .join('');

  DOM.inventory.innerHTML = `
    <h4>Inventory</h4>
    ${itemsHTML}
  `;

  const createAction = (item) => {
    if (item.isConsumable) return dynamicActions.consumeItem(item)(state);
    if (item.isSellable) return dynamicActions.sellItem(item)(state);
  };

  state.inventory.forEach((item, index) => {
    const action = createAction(item);

    document
      .getElementById(`inventory-item-${item.key}-${index}`)
      .addEventListener('click', () => processAction(state)(action));
  });
};

const render = (state) =>
  [
    renderStats,
    renderActions,
    renderTravelOptions,
    renderInventory,
  ].forEach((fn) => fn(state));
