import React, { Component } from 'react';
import axios from 'axios';

class CurrentCourse extends Component {
	state = { course: {}, isActive: true, marked: false };

	async componentDidMount() {
		try {
			const code = this.props.match.params.code;
			const { data } = await axios.get(
				`http://localhost:9000/api/courses/${code}`
			);

			const course = {
				_id: data._id,
				code: data.code,
				name: data.name,
				schedule: data.schedule,
				password: data.password
			};

			this.setState({ course });
		} catch (err) {
			console.error(err);
		}
	}

	markAttendance = async password => {
		if (password === this.state.course.password && !this.state.marked) {
			const obj = {
				student: this.props.user.id,
				course: this.state.course._id
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
		return (
			<React.Fragment>
				<h1>{this.state.course.code}</h1>
				{this.state.course.password && !this.state.marked && (
					<button
						className='btn btn-primary'
						onClick={() => this.markAttendance('CSC2233154955')}>
						Scan QR
					</button>
				)}
			</React.Fragment>
		);
	}
}

export default CurrentCourse;
