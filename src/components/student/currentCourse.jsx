import React, { Component } from 'react';
import { isActive } from '../common/isActive';
import axios from 'axios';

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

	render() {
		const { active, course, marked, password } = this.state;

		return (
			<React.Fragment>
				<h1>{course.code}</h1>
				{active && password && !marked && (
					<button
						className='btn btn-primary'
						onClick={() => this.markAttendance(password)}>
						Scan QR
					</button>
				)}
			</React.Fragment>
		);
	}
}

export default CurrentCourse;
