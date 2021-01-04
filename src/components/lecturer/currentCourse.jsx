import React from 'react';
import axios from 'axios';
import Joi from 'joi';
import moment from 'moment';
import Loading from '../common/loading';
import Form from '../common/form';
import { isActive } from '../common/isActive';
import { Breadcrumb } from 'react-bootstrap';

class CurrentCourse extends Form {
	state = {
		course: {},
		active: false,
		password: '',
		url: '',
		qrGenerated: false,
		loading: true,
		data: { lecture: '' },
		errors: { lecture: '' }
	};

	schema = Joi.object({
		lecture: Joi.string().required().min(5).max(50).label('Lecture Title')
	});

	async componentDidMount() {
		try {
			const code = this.props.match.params.code;
			const { data } = await axios.get(`/api/courses/${code}`);

			const course = {
				code: data.code,
				name: data.name,
				schedule: data.schedule,
				dates: data.dates
			};

			const active = isActive(data.schedule);

			const password = data.password ? data.password : '';

			const qrGenerated = this.isQRGenerated(data.schedule, data.dates);

			this.setState({ course, active, password, qrGenerated, loading: false });
			if (password) this.generateQR();
		} catch (err) {
			console.error(err);
		}
	}

	async componentDidUpdate(prevProps, prevState) {
		const { course, password, data, url } = this.state;
		if (
			prevState !== this.state &&
			prevState.password !== password &&
			url &&
			data.lecture
		) {
			try {
				await axios.patch(`/api/courses/${course.code}/${password}`, {
					lecture: data.lecture
				});
				this.setState({ data: { lecture: '' }, errors: { lecture: '' } });
			} catch (err) {
				console.error(err);
			}
		}
	}

	isQRGenerated = (schedule, dates) => {
		const item = dates.filter(d => {
			const timestamp = moment(d.date, 'YYYY:MM:DD HH:mm:ss');
			return (
				timestamp.day() === schedule.day &&
				timestamp.hour() >= schedule.startTime &&
				timestamp.hour() < schedule.startTime + schedule.duration
			);
		});

		return item && item.length === 1;
	};

	getTime = () => {
		const date = new Date();
		return `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
	};

	generateQR = () => {
		const size = '1000x1000';
		const baseURL = 'http://api.qrserver.com/v1/create-qr-code/';

		if (!this.state.password) {
			const code = this.props.match.params.code;
			const password = `${code}${this.getTime()}`;
			const url = `${baseURL}?data=${password}&size=${size}`;
			this.setState({ url, password });
		} else {
			const url = `${baseURL}?data=${this.state.password}&size=${size}`;
			this.setState({ url });
		}
	};

	getHeader = () => {
		const { code, name } = this.state.course;

		return (
			<h1 className='display-4 text-dark'>
				{code} - {name}
			</h1>
		);
	};

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>{this.state.course.code}</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	renderForm = () => {
		const { active, password, data, qrGenerated } = this.state;

		return (
			<form className='form-inline px-2 justify-content-center'>
				<div className='input-group w-50'>
					<div className='input-group-prepend'>
						<div className='input-group-text'>
							<i className='fa fa-clone' aria-hidden='true' />
						</div>
					</div>
					<input
						type='text'
						className='form-control'
						disabled={!active || password || qrGenerated}
						value={data.lecture}
						name='lecture'
						placeholder='Lecture Title'
						onChange={this.handleChange}
						autoFocus
					/>
					<div className='input-group-append'>
						<button
							type='submit'
							className='btn btn-primary ml-1'
							disabled={this.state.errors.lecture || !this.state.data.lecture}
							onClick={this.handleSubmit}>
							Generate QR
						</button>
					</div>
				</div>
			</form>
		);
	};

	doSubmit = () => {
		this.generateQR();
	};

	render() {
		return this.state.loading ? (
			<Loading />
		) : (
			<React.Fragment>
				{this.renderBreadCrumbs()}
				<div className='jumbotron p-2 py-4 text-center'>
					{this.getHeader()}
					<div className='mt-4'>
						{this.renderForm()}
						{this.state.url && (
							<a
								href={this.state.url}
								className='qrbox mt-4 mx-auto'
								target='_blank'
								rel='noreferrer'>
								<img src={this.state.url} className='w-100' alt='qr-code' />
							</a>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CurrentCourse;
