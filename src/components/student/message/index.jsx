import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';
import Message from '../../common/message';
import { NavDropdown } from 'react-bootstrap';
import { isActive } from '../../common/isActive';

class Messages extends Component {
	state = { messages: [], courses: [], count: 0, watched: false };

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
		const { data } = await axios.get(`/api/users/${id}`);
		this.setState({ courses: data.courses });
	};

	loadMessages = () => {
		const { courses, messages } = { ...this.state };
		let count = 0;

		if (courses && courses.length > 0) {
			courses.forEach(async c => {
				const { data } = await axios.get(`/api/courses/${c}`);
				const course = {
					id: data._id,
					code: data.code,
					name: data.name,
					schedule: data.schedule,
					dates:
						data.dates && data.dates.length > 0
							? data.dates.map(d => d.date)
							: [],
					active: isActive(data.schedule)
				};

				// get present dates
				const { data: dates } = await axios.post(
					`/api/attendance/${this.props.user.id}/${course.id}`
				);

				const presentDates =
					dates && dates.length > 0
						? dates.map(d =>
								// moment(d.timestamp, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD')
								moment(d.timestamp, 'YYYY:MM:DD HH:mm:ss')
						  )
						: [];

				// get messages for the current course
				const message = new Message(course, presentDates).notify();

				if (message) {
					count++;
					messages.push(message);
				}

				this.setState({ messages, count });
			});
		}
	};

	getMessageIcon = () => {
		const { count, watched } = this.state;
		return (
			<React.Fragment>
				<i className='text-white fa fa-envelope' aria-hidden='true' />
				{count > 0 && !watched && <span className='icon-badge'>{count}</span>}
			</React.Fragment>
		);
	};

	getDuration = (day, schedule) =>
		moment(day, 'YYYY:MM:DD')
			.hour(schedule.startTime + schedule.duration)
			.fromNow();

	isAfter = (day1, day2) => {
		day1 = moment(day1, 'YYYY:MM:DD');
		day2 = moment(day2, 'YYYY:MM:DD');

		return moment(day1).isAfter(day2) ? -1 : 1;
	};

	getAbsentDays = ({ absentDays, schedule }) => {
		absentDays.sort((a, b) => this.isAfter(a, b));

		let string = '';
		absentDays.forEach(day => {
			string += !string ? day : `, ${day}`;
			string += ` (${this.getDuration(day, schedule)})`;
		});
		return string;
	};

	renderMessage = () => {
		const { messages } = { ...this.state };

		messages.sort((a, b) =>
			this.isAfter(
				a.absentDays[a.absentDays.length - 1],
				b.absentDays[b.absentDays.length - 1]
			)
		);

		return messages.map(m => (
			<div key={m.code} className='alert alert-danger mb-2'>
				<small>
					<strong>
						{m.name} ({m.code})
					</strong>{' '}
					missed {m.absentDays.length > 1 ? 'lectures' : 'lecture'} on{' '}
					{this.getAbsentDays(m)}
				</small>
			</div>
		));
	};

	render() {
		return (
			<NavDropdown
				onClick={() => this.setState({ watched: true })}
				title={this.getMessageIcon()}
				id='dropdown-navbar'>
				<div className='px-4 py-1' style={{ width: 400, minHeight: 150 }}>
					<p className='text-dark m-0'>Messages</p>
					<hr className='my-2' />
					{this.state.count > 0 && this.renderMessage()}
				</div>
			</NavDropdown>
		);
	}
}

export default Messages;
