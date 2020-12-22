import React, { Component } from 'react';
import { Accordion, Breadcrumb, Card } from 'react-bootstrap';
import Course from './course';
import AttendanceTable from './table';

class AttendanceLec extends Component {
	state = { currentCourse: '', date: '' };

	handleChange = (course, date) => {
		this.setState({ currentCourse: course, date });
	};

	handleCourseSelect = () => {
		this.setState({ currentCourse: '', date: '' });
	};

	renderList() {
		const { courses } = this.props.user;
		const { date } = this.state;

		return (
			<Accordion>
				{courses.map(c => (
					<Card key={c} style={{ cursor: 'pointer' }}>
						<Course
							onChange={this.handleChange}
							onCourseSelect={this.handleCourseSelect}
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

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Attendance</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	render() {
		const { currentCourse, date } = this.state;
		return (
			<React.Fragment>
				{this.renderBreadCrumbs()}
				<div className='jumbotron p-1 py-2 my-0 mb-3 text-center display-4 text-dark'>
					Attendance Report
				</div>
				<div className='row'>
					<div className='col-3'>{this.renderList()}</div>
					<div className='col'>
						{currentCourse && date ? (
							<AttendanceTable code={currentCourse} date={date} />
						) : (
							this.renderAlert()
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default AttendanceLec;
