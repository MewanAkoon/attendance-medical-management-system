import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../../common/loading';
import Course from './course';
import { Breadcrumb } from 'react-bootstrap';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import { isActive } from '../isActive';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

class Courses extends Component {
	state = {
		courses: [],
		loading: true
	};

	async componentDidMount() {
		const { courses: userCourses } = this.props.user;

		const courses = [];

		if (userCourses)
			for (let i = 0; i < userCourses.length; i++) {
				const { data } = await axios.get(`/api/courses/${userCourses[i]}`);
				courses.push(data);
			}

		this.setState({ courses, loading: false });
	}

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item active>Home</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	getCourseDates = () => {
		const { courses } = this.state;
		const schedule = [];
		const now = moment();

		courses.forEach(c => {
			// this week
			let m = moment().day(c.schedule.day, 'e').hour(c.schedule.startTime);

			if (m.isSameOrAfter(now)) {
				schedule.push({
					code: c.code,
					name: c.name,
					year: m.year(),
					month: (m.month() + 1) % 13,
					day: m.date(),
					startTime: c.schedule.startTime
				});
			}

			const currentWeek = m.week();

			// Next Week
			m = m.week(currentWeek + 1, 'W');

			schedule.push({
				code: c.code,
				name: c.name,
				year: m.year(),
				month: (m.month() + 1) % 13,
				day: m.date(),
				startTime: c.schedule.startTime
			});
		});

		schedule.sort((a, b) => this.isAfter(a, b));
		return schedule;
	};

	// sorts the schedule
	isAfter = (day1, day2) => {
		day1 = moment()
			.date(day1.day)
			.month((day1.month - 1) % 13)
			.year(day1.year)
			.hour(0)
			.minute(0)
			.second(0);
		day2 = moment()
			.date(day2.day)
			.month((day2.month - 1) % 13)
			.year(day2.year)
			.hour(0)
			.minute(0)
			.second(0);

		return moment(day1).isAfter(day2) ? 1 : -1;
	};

	getSelectedDay = (days, schedule) => {
		let dates = '';
		if (days.length < schedule.length) {
			dates = schedule.filter(d => !days.includes(d));

			dates.forEach(date => {
				const dateString = moment()
					.date(date.day)
					.month((date.month - 1) % 12)
					.year(date.year)
					.format('dddd, MMMM Do');

				const timeString = moment()
					.hour(date.startTime, 'H')
					.minute(0)
					.format('hA');

				const str = `${date.name} - ${date.code} on ${dateString} at ${timeString}`;
				toast.info(str);
			});
		}
	};

	render() {
		const { courses, loading } = this.state;
		const schedule = this.getCourseDates();
		courses.sort((a, b) => (isActive(a.schedule) ? -1 : 1));

		return loading ? (
			<Loading />
		) : (
			courses.length > 0 && (
				<React.Fragment>
					<ToastContainer
						position='top-center'
						autoClose={3000}
						pauseOnHover={true}
						hideProgressBar={true}
						// className='text-center'
					/>
					<div>
						{this.renderBreadCrumbs()}

						<div className='card'>
							<div className='card-header'>Course Overview</div>
							<div className='row'>
								<div className='col-8 pr-0'>
									<div className='card-body pr-0'>
										{courses.map(c => (
											<Course key={c.code} course={c} />
										))}
									</div>
								</div>
								<div className='col'>
									<div className='mt-4'>
										<Calendar
											className='w-100 h-100'
											value={schedule}
											colorPrimary='#0fbcf9'
											onChange={days => this.getSelectedDay(days, schedule)}
											minimumDate={utils().getToday()}
											maximumDate={schedule[schedule.length - 1]}
											shouldHighlightWeekends
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			)
		);
	}
}

export default Courses;
