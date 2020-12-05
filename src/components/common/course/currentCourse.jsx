import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { default as Lecturer } from '../../lecturer/currentCourse';

class CurrentCourse extends Component {
	state = {
		course: {}
	};

	async componentDidMount() {
		try {
			const { data: course } = await axios.get(
				`http://localhost:9000/api/courses/${this.props.match.params.code}`
			);
			this.setState({ course });
		} catch (err) {
			console.log('Error', err);
		}
	}

	render() {
		const { user } = this.props;
		return (
			<React.Fragment>
				{!user.id && <Redirect to='/login' />}
				{user.role === 'lecturer' ? (
					<Lecturer {...this.props} />
				) : (
					<h1>Hello {this.props.match.params.code}</h1>
				)}
			</React.Fragment>
		);
	}
}

export default CurrentCourse;
