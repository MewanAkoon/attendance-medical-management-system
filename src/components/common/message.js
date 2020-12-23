import moment from 'moment';

class Message {

  state = { course: {}, presentDays: [], absentDays: [] }

  constructor(course, presentDays) {
    this.state.course = course;
    this.state.presentDays = presentDays.map(date => this.getDate(date));
  }

  notify() {
    const { code, name } = this.state.course;
    this.getAbsentDays();

    return this.state.absentDays.length > 0 ? {
      code,
      name,
      absentDays: this.state.absentDays
    } : null;
  }

  getAbsentDays = () => {
    let arr = [];
    const { presentDays } = this.state;
    const { dates: totalDays } = this.state.course;

    if (totalDays.length > 0)
      arr = totalDays
        .filter(date => !presentDays.includes(this.getDate(date)))
        .map(date => this.getDate(date));

    this.state.absentDays = arr;
  }

  getDate = (date) => moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
}

export default Message;