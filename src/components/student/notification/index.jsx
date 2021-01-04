import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';
import Notification from '../../common/notification';
import { NavDropdown } from 'react-bootstrap';

class Notifications extends Component {
	state = { notifications: [], courses: [], count: 0, watched: false };

	async componentDidMount() {
		try {
			await this.renderData();
			this.loadNotifications();
		} catch (err) {
			console.error(err.message);
		}
	}

	renderData = async () => {
		const { id } = this.props.user;
		const { data } = await axios.get(`/api/users/${id}`);
		this.setState({ courses: data.courses });
	};

	loadNotifications = () => {
		const { courses, notifications } = { ...this.state };
		let count = 0;

		if (courses && courses.length > 0) {
			courses.forEach(async c => {
				const { data } = await axios.get(`/api/courses/${c}`);
				const course = {
					id: data._id,
					code: data.code,
					name: data.name,
					schedule: data.schedule
				};

				// get notifications for the current course
				const notification = new Notification(course).notify();

				if (notification) {
					count++;
					notifications.push(notification);
				}

				this.setState({ notifications, count });
			});
		}
	};

	getBellIcon = () => {
		const { count, watched } = this.state;
		return (
			<React.Fragment>
				<i className='text-white fa fa-bell' aria-hidden='true' />
				{count > 0 && !watched && <span className='icon-badge'>{count}</span>}
			</React.Fragment>
		);
	};

	renderUpcoming = n => {
		return (
			<div key={n.code} className='alert alert-success mb-2'>
				<small>
					<strong>
						{n.name} {n.code}
					</strong>{' '}
					lecture {moment.duration(n.time, 'minutes').humanize(true)}
				</small>
			</div>
		);
	};

	renderOngoing = n => {
		return (
			<div key={n.code} className='alert alert-primary mb-2'>
				<small>
					<strong>
						{n.name} {n.code}
					</strong>{' '}
					lecture ongoing.
				</small>
			</div>
		);
	};

	renderNotification = () => {
		const { notifications } = { ...this.state };

		notifications.sort((a, b) => a.time - b.time);

		return notifications.map(n =>
			n.time > 0 ? this.renderUpcoming(n) : this.renderOngoing(n)
		);
	};

	render() {
		return (
			<NavDropdown
				onClick={() => this.setState({ watched: true })}
				title={this.getBellIcon()}
				id='dropdown-navbar'>
				<div className='px-4 py-1' style={{ width: 400, minHeight: 150 }}>
					<p className='text-dark m-0'>Notifications</p>
					<hr className='my-2' />
					{this.state.count > 0 && this.renderNotification()}
				</div>
			</NavDropdown>
		);
	}
}

export default Notifications;
