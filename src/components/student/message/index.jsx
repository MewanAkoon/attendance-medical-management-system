import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';
import Message from '../../common/message';
import { baseURL } from '../../../baseURL';
import { NavDropdown } from 'react-bootstrap';

class Messages extends Component {
	state = { messages: [], courses: [], count: 0 };

	async componentDidMount() {
		try {
			await this.renderData();
			this.loadMessages();
		} catch (err) {
			console.error(err.message);
		}
	}

	renderData = async () => {
		const { id } = this.props.user;
		const { data } = await axios.get(`${baseURL}/users/${id}`);
		this.setState({ courses: data.courses });
	};

	loadMessages = () => {
		const { courses, messages } = { ...this.state };
		let count = 0;

		if (courses && courses.length > 0) {
			courses.forEach(async c => {
				const { data } = await axios.get(`${baseURL}/courses/${c}`);
				const course = {
					id: data._id,
					code: data.code,
					name: data.name,
					schedule: data.schedule,
					dates:
						data.dates && data.dates.length > 0
							? data.dates.map(d => d.date)
							: []
				};

				// get present dates
				const { data: dates } = await axios.post(
					`${baseURL}/attendance/${this.props.user.id}/${course.id}`
				);

				const presentDates =
					dates && dates.length > 0
						? dates.map(d =>
								moment(d.timestamp, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD')
						  )
						: [];

				// get notifications for the current course
				const message = new Message(course, presentDates).notify();

				if (message) {
					count++;
					messages.push(message);
				}

				this.setState({ messages, count });
			});
		}
	};

	getBellIcon = () => {
		const { count } = this.state;
		return (
			<React.Fragment>
				<i className='text-white fa fa-envelope' aria-hidden='true' />
				{count > 0 && <span className='icon-badge'>{count}</span>}
			</React.Fragment>
		);
	};

	getAbsentDays = absentDays => {
		let string = '';
		absentDays.forEach(day => {
			string += !string ? day : `, ${day}`;
		});
		return string;
	};

	renderMessage = () => {
		const { messages } = this.state;

		return messages.map(m => (
			<div key={m.code} className='alert alert-danger mb-2'>
				<small>
					<strong>
						{m.name} ({m.code})
					</strong>{' '}
					missed {m.absentDays.length > 1 ? 'lectures' : 'lecture'} on{' '}
					{this.getAbsentDays(m.absentDays)}
				</small>
			</div>
		));
	};

	render() {
		return (
			<NavDropdown title={this.getBellIcon()} id='dropdown-navbar'>
				<div className='px-4 py-1' style={{ width: 400 }}>
					<p className='text-dark m-0'>Messages</p>
					<hr className='my-2' />
					{this.state.count > 0 && this.renderMessage()}
				</div>
			</NavDropdown>
		);
	}
}

export default Messages;
