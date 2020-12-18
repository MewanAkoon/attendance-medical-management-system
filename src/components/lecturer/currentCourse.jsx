import React from 'react';
import axios from 'axios';
import Joi from 'joi';
import Form from '../common/form';
import { isActive } from '../common/isActive';

class CurrentCourse extends Form {
	state = {
		course: {},
		active: false,
		password: '',
		url: '',
		data: { lecture: '' },
		errors: { lecture: '' }
	};

	schema = Joi.object({
		lecture: Joi.string().required().min(5).max(50).label('Lecture Title')
	});

	async componentDidMount() {
		try {
			const code = this.props.match.params.code;
			const { data } = await axios.get(
				`http://localhost:9000/api/courses/${code}`
			);

			const course = {
				code: data.code,
				name: data.name,
				schedule: data.schedule
			};

			const active = isActive(data.schedule);

			const password = data.password ? data.password : '';

			this.setState({ course, active, password });
			if (password) this.generateQR();
		} catch (err) {
			console.error(err);
		}
	}

	async componentDidUpdate(prevProps, prevState) {
		if (
			prevState !== this.state &&
			prevState.password !== this.state.password &&
			this.state.url
		) {
			try {
				const { course, password, data } = this.state;
				await axios.patch(
					`http://localhost:9000/api/courses/${course.code}/${password}`,
					{ lecture: data.lecture }
				);
			} catch (err) {
				console.error(err);
			}
		}
	}

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

	renderForm = () => {
		const { active, password, data } = this.state;

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
						disabled={active && password}
						value={data.lecture}
						name='lecture'
						placeholder='Lecture Title'
						onChange={this.handleChange}
						autoFocus
					/>
				</div>

				<button
					type='submit'
					className='btn btn-primary ml-1'
					disabled={this.state.errors.lecture || !this.state.data.lecture}
					onClick={this.handleSubmit}>
					Generate QR
				</button>
			</form>
		);
	};

	doSubmit = () => {
		this.generateQR();
		this.setState({ data: { lecture: '' }, errors: { lecture: '' } });
	};

	render() {
		return (
			<div className='jumbotron p-2 py-4 text-center'>
				{this.getHeader()}
				<div className='mt-4'>
					{this.renderForm()}
					{this.state.url && (
						<a
							href={this.state.url}
							className='qrbox mt-2'
							target='_blank'
							rel='noreferrer'>
							<img src={this.state.url} className='w-100' alt='qr-code' />
						</a>
					)}
				</div>
			</div>
		);
	}
}

export default CurrentCourse;
