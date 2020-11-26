import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class CurrentCourse extends Component {
	state = {
		course: {}
	};

	async componentDidMount() {
		try {
			const { data: course } = await axios.get(
				`http://localhost:9000/courses/${this.props.match.params.code}`
			);
			this.setState({ course });
		} catch (err) {
			console.log('Error', err);
		}
	}

	render() {
		return (
			<React.Fragment>
				{!this.props.user.id && <Redirect to='/login' />}
				<h1>Hello {this.props.match.params.code}</h1>
			</React.Fragment>
		);
	}
}

export default CurrentCourse;
