import moment from 'moment';

class Message {

  state = { course: {}, presentDays: [], absentDays: [] }

  constructor(course, presentDays) {
    this.state.course = course;
    this.state.presentDays = presentDays.map(date => this.getDate(date));
  }

  notify() {
    const { code, name, schedule } = this.state.course;
    this.getAbsentDays();

    return this.state.absentDays.length > 0 ? {
      code,
      name,
      schedule,
      absentDays: this.state.absentDays
    } : null;
  }

  getAbsentDays = () => {
    let arr = [];
    const { presentDays } = this.state;
    const { dates: totalDays, active } = this.state.course;
    const currentDate = moment().format('YYYY:MM:DD');

    if (totalDays.length > 0)
      arr = totalDays
        .map(date => this.getDate(date))
        .filter(date => !presentDays.includes(date));

    if (active) arr = arr.filter(date => date !== currentDate);

    this.state.absentDays = arr;
  }

  getDate = (date) => moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
}

export default Message;