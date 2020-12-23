import moment from 'moment';

class Notification {

  state = { course: {} }

  constructor(course, presentDays) {
    this.state.course = course;
  }

  notify() {
    return null;
  }

  getDate = (date) => moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');

  upcoming() {
    const now = moment().format('YYYY:MM:DD HH:mm:ss');
    console.log(now);
  }
}

export default Notification;