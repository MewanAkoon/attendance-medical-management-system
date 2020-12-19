import React, { Component } from 'react';
import { isActive } from '../common/isActive';
import axios from 'axios';
import { Breadcrumb } from 'react-bootstrap';

class CurrentCourse extends Component {
	state = { course: {}, active: false, marked: false, password: '' };

	async componentDidMount() {
		try {
			const code = this.props.match.params.code;
			const { data } = await axios.get(
				`http://localhost:9000/api/courses/${code}`
			);

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
			const { data } = await axios.get(
				`http://localhost:9000/api/attendance/${student}/${course}`
			);
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
				await axios.post('http://localhost:9000/api/attendance', obj);
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

	renderMessage = () => {};

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
					{active && password && !marked && (
						<div className='mt-4'>
							<button
								className='btn btn-primary btn-block'
								onClick={() => this.markAttendance(password)}>
								Scan QR
							</button>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default CurrentCourse;
