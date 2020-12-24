import moment from 'moment';

class Notification {

  state = { course: {} }

  constructor(course) {
    this.state.course = course;
  }

  notify() {
    return this.status();
  }

  status() {
    const { code, name, schedule } = this.state.course;

    const now = moment();
    const currentDay = now.day();

    if (schedule.day === currentDay) {
      const timestamp = moment().hour(schedule.startTime).minutes(0).seconds(0);
      const remaining = timestamp.diff(now, 'minutes');

      const upcoming = remaining > 0;
      const ongoing = remaining <= 0 && remaining > -(schedule.duration * 60);

      if (upcoming || ongoing)
        return {
          code, name, time: remaining
        }
    }
    return null;
  }
}

export default Notification;