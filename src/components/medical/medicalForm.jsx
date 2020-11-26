import React from 'react';
import Form from '../common/form';
import Joi from 'joi';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

class MedicalForm extends Form {
	state = {
		data: { index: '', reason: '' },
		errors: {}
	};

	schema = Joi.object({
		index: Joi.string()
			.required()
			.regex(/^sc[0-9]{5}$/)
			.message('*Invalid User.')
			.label('Index Number'),
		firstName: Joi.string().required(),
		username: Joi.string().required(),
		reason: Joi.string()
			.required()
			.label('Reason')
			.min(10)
			.regex(/^[a-zA-Z .]+$/)
			.message('*Invalid Input.')
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
		try {
			const { data: user } = await axios.get(
				`http://localhost:9000/users/${index}`
			);

			const { firstName, username } = user;
			const data = { ...this.state.data, firstName, username };

			const errors = { ...this.state.errors };
			delete errors.user;

			this.setState({ data, errors });
		} catch (err) {
			const errors = { ...this.state.errors };
			errors.index = '*User not found.';
			this.setState({ errors });
			console.log(err.message);
		}
	};

	displayUserDetails = () => {
		return (
			<div className='d-flex mb-3'>
				<div className='form-control form-control-sm bg-secondary text-white mr-1'>
					{this.state.data.firstName}
				</div>
				<div className='form-control form-control-sm bg-secondary text-white ml-1'>
					{this.state.data.username}
				</div>
			</div>
		);
	};

	doSubmit = () => {
		console.log('Success');
	};

	render() {
		return (
			<React.Fragment>
				<div className='jumbotron w-50 mx-auto pt-4 pb-5'>
					<h1 className='text-center display-4 mb-4'>Medical Form</h1>
					<form onSubmit={this.handleSubmit} className='mx-auto'>
						{this.renderInput('index', 'Index Number')(true)}
						{this.state.data.username && (
							<Dropdown>
								{this.displayUserDetails()}
								{this.renderInput('reason', 'Reason')(false)}
								{this.renderSubmitButton('Submit')}
							</Dropdown>
						)}
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default MedicalForm;
