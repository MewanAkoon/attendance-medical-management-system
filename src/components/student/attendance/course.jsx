import React, { Component } from 'react';
import axios from 'axios';

class Course extends Component {
	state = { course: {} };

	async componentDidMount() {
		try {
			const { data } = await axios.get(`/api/courses/${this.props.course}`);

			const course = {
				code: data.code,
				name: data.name
			};

			this.setState({ course });
		} catch (err) {
			console.log(err.message);
		}
	}

	render() {
		const { code, name } = this.state.course;

		return (
			<React.Fragment>
				{code && name ? (
					<button
						className='btn btn-outline-primary'
						style={{ minHeight: 60 }}
						onClick={() => this.props.onCourseSelect(code)}>
						{`${name} (${code})`}
					</button>
				) : null}
			</React.Fragment>
		);
	}
}

export default Course;
