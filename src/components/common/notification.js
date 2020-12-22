import moment from 'moment';

class Notification {

  state = { course: {}, totalDates: [], presentDays: [] }

  constructor(course, totalDates, presentDays) {
    this.state.course = course;
    this.state.totalDates = totalDates;
    this.state.presentDays = presentDays;
  }

  notify() {
    return notification = {
      code: this.state.course.code
    }
  }

  upcoming() {
    const now = moment().format('YYYY:MM:DD HH:mm:ss');


  }

  printState() {
    console.log(this.state.course);
  }
}

// const notification = new Notification('CSC2263', [], []);
// notification.printState();

// export default Notification;