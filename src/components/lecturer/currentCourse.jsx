import React, { Component } from 'react';

class CurrentCourse extends Component {
	state = { isActive: false, url: '' };

	getTime = () => {
		const date = new Date();
		return `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
	};

	generateQR = () => {
		const size = '1000x1000';
		const code = this.props.match.params.code;

		const password = `${code}${this.getTime()}`;

		const baseURL = 'http://api.qrserver.com/v1/create-qr-code/';
		const url = `${baseURL}?data=${password}&size=${size}`;

		this.setState({ url });
	};

	render() {
		return (
			<React.Fragment>
				<h1>{this.props.match.params.code}</h1>
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
