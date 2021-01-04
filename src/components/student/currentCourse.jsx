import React, { Component } from 'react';
import { isActive } from '../common/isActive';
import axios from 'axios';
import { Breadcrumb } from 'react-bootstrap';

class CurrentCourse extends Component {
	state = { course: {}, active: false, marked: false, password: '' };

	async componentDidMount() {
		try {
			const code = this.props.match.params.code;
			const { data } = await axios.get(`/api/courses/${code}`);

			const course = {
				id: data._id,
				code: data.code,
				name: data.name
			};

			const active = isActive(data.schedule);
			const marked = await this.isMarked(this.props.user.id, course.id);

			this.setState({ course, active, password: data.password, marked });
		} catch (err) {
			console.error(err);
		}
	}

	isMarked = async (student, course) => {
		try {
			const { data } = await axios.get(`/api/attendance/${student}/${course}`);
			return data;
		} catch (err) {
			console.error(err.message);
			return false;
		}
	};

	markAttendance = async password => {
		if (password === this.state.password && !this.state.marked) {
			const obj = {
				student: this.props.user.id,
				course: this.state.course.id
			};

			try {
				await axios.post(`/api/attendance`, obj);
				this.setState({ marked: true });
			} catch (err) {
				console.error(err);
			}
		}
	};

	getHeader = () => {
		const { code, name } = this.state.course;

		return (
			<h1 className='display-4 text-dark'>
				{code} - {name}
			</h1>
		);
	};

	renderMessage = (password, marked) => {
		return marked ? (
			<div className='alert alert-success w-75 mx-auto mb-0'>
				<span>You already Marked Attendance for this course.</span>
			</div>
		) : password ? (
			<div className='alert alert-warning w-75 mx-auto mb-0'>
				<span>You can mark your attendance from the mobile app.</span>
			</div>
		) : (
			<div className='alert alert-primary w-75 mx-auto mb-0'>
				<span>Course is currently active.</span>
			</div>
		);
	};

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>{this.state.course.code}</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	render() {
		const { active, marked, password } = this.state;

		return (
			<React.Fragment>
				{this.renderBreadCrumbs()}
				<div className='jumbotron p-2 py-4 text-center'>
					{this.getHeader()}
					{active ? (
						this.renderMessage(password, marked)
					) : (
						<div className='alert alert-secondary w-75 mx-auto mb-0'>
							Course is not currently active
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default CurrentCourse;
