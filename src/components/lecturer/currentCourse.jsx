import React, { Component } from 'react';
import axios from 'axios';

class CurrentCourse extends Component {
	state = { course: {}, password: '', url: '' };

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

			this.setState({ course });
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
		if (!this.state.password) {
			const size = '1000x1000';
			const code = this.props.match.params.code;

			const password = `${code}${this.getTime()}`;

			const baseURL = 'http://api.qrserver.com/v1/create-qr-code/';
			const url = `${baseURL}?data=${password}&size=${size}`;

			this.setState({ url, password });
		}
	};

	render() {
		return (
			<React.Fragment>
				<h1>{this.state.course.code}</h1>
				<div>
					<button className='btn btn-primary' onClick={this.generateQR}>
						Generate QR
					</button>
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
