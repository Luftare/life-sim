const units = {
  seconds: (seconds) => seconds * 1000,
  minutes: (minutes) => units.seconds(60) * minutes,
  hours: (hours) => units.minutes(60) * hours,
  days: (days) => units.hours(24) * days,
  meters: (value) => value,
  kilometers: (value) => value * units.meters(1000),
  calories: (value) => value,
  caloriesPerHour: value => units.calories(value) / units.hours(1),
  toHours: (value) => value / (1000 * 60 * 60),
};
