const renderStats = (state) => {
  const getText = getTranslations(state.language);

  return `
    <div>
      <h2>${getText(state.place.key)}</h2>
      <p>${getPlaceDescription(state.place)}</p>
      <div>money: ${state.money.toFixed(2)}€</div>
      <div>awareness: ${formats.percent(getAwareness(state))}</div>
      <div>mental recovery: ${formats.percent(state.mentalRecovery)}</div>
      <div>energy: ${state.energy.toFixed(0)} cal</div>
      <div>stomach: ${state.stomach.length}</div>
      <div>day: ${formats.date(state.time)}</div>
      <div>time: ${formats.time(state.time)} weekd: ${getWeekDay(state)}</div>
    </div>
  `;
};

const renderTravelOptions = (state) => {
  const getText = getTranslations(state.language);

  const optionsHTML = getTravelActions(state)
    .map(
      (action) => `
      <button
        ${on('click', () =>
        processAction(state)(action)
      )}
        title="${getTravelActionDescription(action)}"
      >${getText(action.place.key)}</button>
`
    )
    .join('');

  return `
    <h4>${getText('travel')}</h4>
    ${optionsHTML}
   `;
};

const renderActions = (state) => {
  const getText = getTranslations(state.language);

  const optionsHTML = getActions(state)
    .filter(action => action.enabledAt.includes(state.place.key))
    .map(
      (action) => `
      <button
        title="${action.description ?? getActionDescription(action)}"
        ${action.disabled && 'disabled'}
        ${on('click', () => {
        processAction(state)(action);
      })}
      >
        ${(action.textKeys ?? [action.key]).map(getText).join(' ')}
      </button >`
    )
    .join('');

  return `
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
      <button
        ${on('click', () => processAction(state)(action))}
        title="${getActionDescription(action)}"
        ${action.disabled && 'disabled'}
      >
        ${getText(action.textKey || action.key)}
      </button>
    `).join('')}
  </div>
    `).join('');

  return `
    <h4>${getText('inventory')}</h4>
    ${itemsHTML}`;
};

const render = ((container) => (state) => {
  container.innerHTML = [
    renderStats,
    renderInventory,
    renderTravelOptions,
    renderActions,
  ].map(fn => fn(state)).join('');
})(document.getElementById('game'));
