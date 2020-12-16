import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import Course from './course';
import AttendanceTable from './table';

class AttendanceLec extends Component {
	state = { currentCourse: '', date: '' };

	handleCourseSelect = course => {
		this.setState({ currentCourse: course, date: '' });
	};

	handleDateSelect = date => {
		this.setState({ date });
	};

	renderList(courses) {
		return (
			<Accordion>
				{courses.map(c => (
					<Card key={c} style={{ cursor: 'pointer' }}>
						<Course
							onCourseSelect={this.handleCourseSelect}
							onDateSelect={this.handleDateSelect}
							course={c}
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

	render() {
		const { courses } = this.props.user;
		const { currentCourse, date } = this.state;

		return (
			<React.Fragment>
				<div className='text-center display-4 mb-4'>Attendance Report</div>
				<div className='row'>
					<div className='col-3'>{this.renderList(courses)}</div>
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
