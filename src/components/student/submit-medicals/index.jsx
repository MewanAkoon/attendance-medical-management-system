import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { isActive } from '../../common/isActive';
import Message from '../../common/message';
import { Breadcrumb } from 'react-bootstrap';
import MedicalForm from './medicalForm';

class SubmitMedicalPage extends Component {
	state = { courses: [], messages: [], count: 0 };

	async componentDidMount() {
		try {
			await this.renderData();
			this.loadMessages();
		} catch (err) {
			console.error(err.message);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			if (!this.props.user.id) this.redirectToHome();
		}
	}

	renderData = async () => {
		const { id } = this.props.user;
		const { data } = await axios.get(`/api/users/${id}`);
		this.setState({ courses: data.courses });
	};

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Submit Medical Report</Breadcrumb.Item>
			</Breadcrumb>
		);
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

	redirectToHome = () => this.props.history.push('/home');

	render() {
		const { messages, count } = this.state;
		const { id, role } = this.props.user;

		return (
			<React.Fragment>
				{this.renderBreadCrumbs()}

				<div className='jumbotron py-4'>
					<Link to={`/view/medicals/${id}`}>View Submitted Medicals</Link>
					<hr className='mb-0' />
					<MedicalForm user={{ id, role }} messages={messages} count={count} />
				</div>
			</React.Fragment>
		);
	}
}

export default SubmitMedicalPage;
