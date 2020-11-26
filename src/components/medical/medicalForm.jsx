import React from 'react';
import Form from '../common/form';
import Joi from 'joi';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

class MedicalForm extends Form {
	state = {
		data: { index: '' },
		errors: {}
	};

	schema = Joi.object({
		index: Joi.string()
			.required()
			.regex(/^sc[0-9]{5}$/)
			.message('*Invalid User.')
			.label('Index Number')
	});

	async componentDidUpdate(prevProps, prevState) {
		if (
			prevState.data.index !== this.state.data.index &&
			!this.state.errors.index
		)
			this.getUser(this.state.data.index);

		if (prevState.errors.index !== this.state.errors.index)
			this.setInvalidUser();
	}

	setInvalidUser = () => {
		const data = { ...this.state.data };
		delete data.firstName;
		delete data.username;

		this.setState({ data });
	};

	getUser = async index => {
		const { data: user } = await axios.get(
			`http://localhost:9000/users/${index}`
		);

		const { firstName, username } = user;
		const data = { ...this.state.data, firstName, username };

		this.setState({ data });
	};

	displayUserDetails = () => {
		return (
			<div className='d-flex'>
				<input
					className='form-control form-control-sm mr-1 disabled'
					value={this.state.data.firstName}
					readOnly
				/>
				<input
					className='form-control form-control-sm ml-1 disabled'
					value={this.state.data.username}
					readOnly
				/>
			</div>
		);
	};

	doSubmit = () => {};

	render() {
		return (
			<React.Fragment>
				<div className='jumbotron w-50 mx-auto pt-4 pb-5'>
					<h1 className='text-center display-4 mb-4'>Medical Form</h1>
					<form onSubmit={this.handleSubmit} className='mx-auto'>
						{this.renderInput('index', 'Index Number')(true)}
						{this.state.data.username && (
							<Dropdown>{this.displayUserDetails()}</Dropdown>
						)}
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default MedicalForm;
