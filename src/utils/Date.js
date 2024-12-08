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
