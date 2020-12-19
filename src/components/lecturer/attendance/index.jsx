import React, { Component } from 'react';
import { Accordion, Breadcrumb, Card } from 'react-bootstrap';
import Course from './course';
import AttendanceTable from './table';

class AttendanceLec extends Component {
	state = { currentCourse: '', date: '' };

	handleCourseSelect = course => {
		this.setState({ currentCourse: course });
	};

	handleDateSelect = date => {
		this.setState({ date });
	};

	componentDidUpdate(prevProps, prevState) {
		const { currentCourse } = this.state;
		if (prevState !== this.state && prevState.currentCourse !== currentCourse)
			this.setState({ date: '' });
	}

	renderList(courses, date) {
		return (
			<Accordion>
				{courses.map(c => (
					<Card key={c} style={{ cursor: 'pointer' }}>
						<Course
							onCourseSelect={this.handleCourseSelect}
							onDateSelect={this.handleDateSelect}
							course={c}
							selectedDate={date}
						/>
					</Card>
				))}
			</Accordion>
		);
	}

	renderAlert = () => {
		const { currentCourse, date } = this.state;
		return (
			<div className='alert alert-secondary text-center'>
				{!(currentCourse && date) ? (
					<small>Select a course and a date</small>
				) : (
					<small>Select a date</small>
				)}
			</div>
		);
	};

	renderAttendance = (course, date) => {
		return <AttendanceTable code={course} date={date} />;
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
		const { currentCourse, date } = this.state;

		return (
			<React.Fragment>
				{this.renderBreadCrumbs()}
				<div className='jumbotron p-1 py-2 my-0 mb-3 text-center display-4 text-dark'>
					Attendance Report
				</div>
				<div className='row'>
					<div className='col-3'>{this.renderList(courses, date)}</div>
					<div className='col'>
						{!(currentCourse && date) && this.renderAlert()}
						{currentCourse &&
							date &&
							this.renderAttendance(currentCourse, date)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default AttendanceLec;
