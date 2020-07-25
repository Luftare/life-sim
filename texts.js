const getTranslations = (language) => (key) => translations[language][key];

const translations = {
  fi: {
    [ACTION_COLLECT_BOTTLES]: 'Kerää pulloja',
    [ACTION_SLEEP]: 'Nuku',
    [PLACE_PARK]: 'Puisto',
    [PLACE_SHOP]: 'Kauppa',
  },
};
