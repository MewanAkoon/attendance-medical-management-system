import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { default as Lecturer } from '../../lecturer/currentCourse';
import { default as Student } from '../../student/currentCourse';

class CurrentCourse extends Component {
	state = {
		course: {}
	};

	async componentDidMount() {
		try {
			const { data: course } = await axios.get(
				`/api/courses/${this.props.match.params.code}`
			);
			this.setState({ course });
		} catch (err) {
			console.log('Error', err);
		}
	}

	render() {
		const { user } = this.props;

		switch (user.role) {
			case 'lecturer':
				return <Lecturer {...this.props} />;
			case 'student':
				return <Student {...this.props} />;
			default:
				return <Redirect to='/login' />;
		}
	}
}

export default CurrentCourse;
