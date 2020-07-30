const getTranslations = (language) => (key) => translations[language][key];

const translations = {
  fi: {
    travel: 'Matkusta',
    buy: 'Osta',
    use: 'Käytä',
    sell: 'Myy',
    return: 'Palauta',
    inventory: 'Omistukset',
    actions: 'Toiminnot',
    [ACTION_COLLECT_BOTTLES]: 'Kerää pulloja',
    [ACTION_BUY_ITEM]: 'Osta',
    [ACTION_SLEEP]: 'Nuku',
    [ACTION_IDLE]: 'Odota',
    [ITEM_ACTION_CONSUME]: 'Nautiskele',
    [PLACE_PARK]: 'Puisto',
    [PLACE_SHOP]: 'Kauppa',
    [ITEM_BANANA]: 'Banaani',
    [ITEM_BOTTLE]: 'Pullo',
    [ITEM_CHOCOLATE]: 'Suklaa',
    [ITEM_MACARONI_CASSAROLE]: 'Makaronilaatikko'
  },
};
