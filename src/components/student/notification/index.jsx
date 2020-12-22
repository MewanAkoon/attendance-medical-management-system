import axios from 'axios';
import React, { Component } from 'react';
import { baseURL } from '../../../baseURL';

class Notifications extends Component {
	state = { notifications: [], courses: [] };

	componentDidMount() {
		this.renderData();
	}

	renderData = async () => {
		const { id } = this.props.user;
		const { data } = await axios.get(`${baseURL}/users/${id}`);
		this.setState({ courses: data.courses });
	};

	render() {
		return (
			<div>
				<p>First Ever Notification</p>
				<p>{this.props.user.username}</p>
			</div>
		);
	}
}

export default Notifications;
