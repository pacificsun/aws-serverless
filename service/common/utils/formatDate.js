import moment from 'moment';
import momentTZ from 'moment-timezone';

export const timezoneDate = async (params) => {
  const conv = momentTZ(params).tz('Europe/Amsterdam');

  const date = moment(conv).format('ll');
  const time = moment(conv).format('LT');

  return [date, time];
};
