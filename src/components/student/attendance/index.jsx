import React, { Component } from 'react';
import Course from './course';
import AttendanceTable from './table';
import axios from 'axios';
import moment from 'moment';
import { Breadcrumb } from 'react-bootstrap';

class AttendanceStu extends Component {
	state = { currentCourse: '', course: {}, presentDates: [] };

	handleCourseSelect = async code => {
		try {
			const { data } = await axios.get(`/api/courses/${code}`);

			const course = {
				id: data._id,
				code: data.code,
				dates: data.dates
			};

			const { data: dates } = await axios.post(
				`/api/attendance/${this.props.user.id}/${course.id}`
			);

			const presentDates =
				dates && dates.length > 0
					? dates.map(d =>
							moment(d.timestamp, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD')
					  )
					: [];

			this.setState({ currentCourse: code, course, presentDates });
		} catch (err) {
			console.error(err.message);
		}
	};

	renderList(courses) {
		return (
			<div className='btn-group-vertical btn-group-sm w-100 text-center'>
				{courses.map(c => (
					<Course key={c} onCourseSelect={this.handleCourseSelect} course={c} />
				))}
			</div>
		);
	}

	renderAlert = () => {
		return (
			<div className='alert alert-secondary text-center'>
				<small>Select a course</small>
			</div>
		);
	};

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Attendance</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	render() {
		const { courses } = this.props.user;
		const { course, presentDates } = this.state;

		return (
			<React.Fragment>
				{this.renderBreadCrumbs()}
				<div className='jumbotron p-1 py-2 my-0 mb-3 text-center display-4 text-dark'>
					Attendance Report
				</div>
				<div className='row'>
					<div className='col-3'>{this.renderList(courses)}</div>
					<div className='col'>
						{course.code ? (
							<AttendanceTable course={course} dates={presentDates} />
						) : (
							this.renderAlert()
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default AttendanceStu;
