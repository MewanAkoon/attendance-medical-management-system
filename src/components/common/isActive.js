import moment from 'moment';

export const getDayAndTime = () => {
  const m = moment();
  return { day: m.day(), time: m.hour() };
};

export const isActive = schedule => {
  const { day, time } = getDayAndTime();

  return schedule.day === day &&
    time >= schedule.startTime &&
    time < schedule.startTime + schedule.duration;
};