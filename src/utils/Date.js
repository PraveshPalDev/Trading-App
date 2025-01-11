import moment from 'moment';

export const getThisWeekRange = () => {
  const today = moment();
  const endOfWeek = moment().add(5, 'days');

  const startDate = today.format('MM-DD-YYYY');
  const endDate = endOfWeek.format('MM-DD-YYYY');

  return {startDate, endDate};
};

export const getNextWeekRange = () => {
  const startOfNextWeek = moment().add(1, 'week').startOf('week');
  const endOfNextWeek = moment().add(1, 'week').endOf('week');

  return {
    startDate: startOfNextWeek.format('MM-DD-YYYY'),
    endDate: endOfNextWeek.format('MM-DD-YYYY'),
  };
};

export const getCurrentMonthRange = () => {
  const startOfMonth = moment().startOf('month');
  const endOfMonth = moment().endOf('month');

  return {
    startDate: startOfMonth.format('MM-DD-YYYY'),
    endDate: endOfMonth.format('MM-DD-YYYY'),
  };
};

export const getCurrentWeekRange = () => {
  const today = moment();
  const startDate = today.format('MM-DD-YYYY');
  const endDate = today.clone().add(5, 'days').format('MM-DD-YYYY');

  return {startDate, endDate};
};

export const getCurrentFullWeekRange = () => {
  const today = moment();
  const startDate = today.format('MM-DD-YYYY');
  const endDate = today.clone().add(6, 'days').format('MM-DD-YYYY');

  return {startDate, endDate};
};

// calculate percentages
export const calcData = (value, price) => {
  if (value === 0) {
    return 0;
  }
  return ((price - value) / value) * 100;
};

export const numberWithCommas = x => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
  return x;
};

export const addCommaEveryThree = num => {
  const [integerPart, decimalPart] = num?.toString().split('.');

  const formattedInteger = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return the formatted number
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const formatValue = value => {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
};

export const getMostFrequentSignal = (signalData, group) => {
  const filteredSignals = signalData
    .filter(item => item.group === group)
    .map(item => item.signal);

  const signalCounts = filteredSignals.reduce((acc, signal) => {
    acc[signal] = (acc[signal] || 0) + 1;
    return acc;
  }, {});

  let mostFrequentSignal = null;
  let maxCount = 0;
  let isTie = false;
  Object.keys(signalCounts).forEach(signal => {
    if (signalCounts[signal] > maxCount) {
      mostFrequentSignal = signal;
      maxCount = signalCounts[signal];
      isTie = false;
    } else if (signalCounts[signal] === maxCount) {
      isTie = true;
    }
  });
  return isTie ? 0 : mostFrequentSignal;
};

export const findScore = (b = 0, s = 0, h = 0, t) => {
  if (b > s && b > h) {
    return (b / t) * 100;
  }
  if (s > b && s > h) {
    return (s / t) * 100;
  }
  if (h > b && h > s) {
    return (h / t) * 100;
  }
  return (b / t) * 100;
};
