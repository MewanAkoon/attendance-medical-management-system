import React, { Component } from 'react';
import axios from 'axios';
import { isActive } from '../common/isActive';

class CurrentCourse extends Component {
	state = { course: {}, active: false, password: '', url: '' };

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
		} catch (err) {
			console.error(err);
		}
	}

	async componentDidUpdate(prevProps, prevState) {
		if (
			prevState !== this.state &&
			prevState.password !== this.state.password
		) {
			try {
				const { course, password } = this.state;
				await axios.patch(
					`http://localhost:9000/api/courses/${course.code}/${password}`
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

	render() {
		return (
			<React.Fragment>
				<h1>{this.state.course.code}</h1>
				<div>
					{this.state.active && (
						<button
							className='btn btn-primary'
							disabled={this.state.url}
							onClick={this.generateQR}>
							Generate QR
						</button>
					)}
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
			</React.Fragment>
		);
	}
}

export default CurrentCourse;
