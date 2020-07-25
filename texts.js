const getTranslations = (language) => (key) => translations[language][key];

const translations = {
  fi: {
    consume: 'Nautiskele',
    travel: 'Matkusta',
    buy: 'Osta',
    use: 'Käytä',
    sell: 'Myy',
    inventory: 'Omistukset',
    actions: 'Toiminnot',
    [ACTION_COLLECT_BOTTLES]: 'Kerää pulloja',
    [ACTION_SLEEP]: 'Nuku',
    [PLACE_PARK]: 'Puisto',
    [PLACE_SHOP]: 'Kauppa',
    [ITEM_BANANA]: 'Banaani',
    [ITEM_BOTTLE]: 'Pullo',
  },
};
