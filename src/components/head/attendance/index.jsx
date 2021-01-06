import React, { Component } from 'react';
import { Accordion, Breadcrumb, Card } from 'react-bootstrap';
import axios from 'axios';
import Course from '../../lecturer/attendance/course';
import AttendanceTable from '../../lecturer/attendance/table';

class AttendanceHead extends Component {
	state = {
		courses: [],
		allCourses: [],
		currentCourse: '',
		date: '',
		displayAll: false
	};

	async componentDidMount() {
		try {
			const allCourses = [];
			const { data } = await axios.get('/api/courses');

			if (data.length > 0) data.forEach(course => allCourses.push(course.code));

			this.setState({ courses: this.props.user.courses, allCourses });
		} catch (err) {}
	}

	handleChange = (course, date) => {
		this.setState({ currentCourse: course, date });
	};

	handleCourseSelect = () => {
		this.setState({ currentCourse: '', date: '' });
	};

	renderList() {
		const { date, courses, allCourses, displayAll } = this.state;

		const items = displayAll ? allCourses : courses;

		return (
			<Accordion className='mb-4'>
				{items.map(course => (
					<Card key={course} style={{ cursor: 'pointer' }}>
						<Course
							onChange={this.handleChange}
							onCourseSelect={this.handleCourseSelect}
							course={course}
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

	renderRadioButtons = () => {
		const { displayAll } = this.state;

		return (
			<div className='row px-2 pb-2 border-dark mx-auto'>
				<div className='col'>
					<label className='radio-inline mr-4'>
						<input
							type='radio'
							className='mr-2'
							name='catagory'
							value='notAll'
							checked={!displayAll}
							onChange={this.handleRadioButtonClick}
						/>
						Your Courses
					</label>
					<label className='radio-inline'>
						<input
							type='radio'
							className='mr-2'
							name='catagory'
							value='all'
							checked={displayAll}
							onChange={this.handleRadioButtonClick}
						/>
						All
					</label>
				</div>
			</div>
		);
	};

	handleRadioButtonClick = ({ currentTarget: { value } }) => {
		const displayAll = value === 'all';
		this.setState({ displayAll });
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
					<div className='col-3'>
						{this.renderRadioButtons()}
						{this.renderList()}
					</div>
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

export default AttendanceHead;
