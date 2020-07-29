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
    [ACTION_SLEEP]: 'Nuku',
    [ITEM_ACTION_CONSUME]: 'Nautiskele',
    [PLACE_PARK]: 'Puisto',
    [PLACE_SHOP]: 'Kauppa',
    [ITEM_BANANA]: 'Banaani',
    [ITEM_BOTTLE]: 'Pullo',
  },
};
