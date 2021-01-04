import React from 'react';
import Form from '../common/form';
import Joi from 'joi';
import axios from 'axios';
import { Breadcrumb, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

class MedicalForm extends Form {
	state = {
		data: {
			index: '',
			reason: '',
			year: '',
			semester: '',
			livingPlace: 'hostel'
		},
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
		year: Joi.number().min(1).max(4).required().label('Year'),
		semester: Joi.number().min(1).max(2).required().label('Semester'),
		livingPlace: Joi.string()
			.regex(/^(hostel|boarding)$/)
			.required('Living Place'),
		reason: Joi.string()
			.required()
			.label('Reason')
			.min(5)
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
				`/api/users/${index}?role=student`
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

	renderRadioButtons = () => {
		const {
			data: { livingPlace }
		} = this.state;

		return (
			<div className='row px-2 pb-2 border-dark'>
				<label className='col-5' htmlFor='living'>
					Living Place
				</label>
				<div className='col'>
					<label className='radio-inline mr-4'>
						<input
							type='radio'
							className='mr-2'
							name='livingPlace'
							value='hostel'
							checked={livingPlace === 'hostel'}
							onChange={this.handleRadioButtonClick}
						/>
						Hostel
					</label>
					<label className='radio-inline'>
						<input
							type='radio'
							className='mr-2'
							name='livingPlace'
							value='boarding'
							checked={livingPlace === 'boarding'}
							onChange={this.handleRadioButtonClick}
						/>
						Boarding
					</label>
				</div>
			</div>
		);
	};

	handleRadioButtonClick = ({ currentTarget: { value } }) => {
		const { data } = this.state;
		data.livingPlace = value;
		this.setState({ data });
	};

	doSubmit = async () => {
		const { index, reason, year, semester, livingPlace } = this.state.data;

		try {
			await axios.post(`/api/medicals`, {
				index,
				reason,
				year: parseInt(year),
				semester: parseInt(semester),
				livingPlace
			});
			toast.success('Medical Submitted.');
			this.setState({
				data: {
					index: '',
					reason: '',
					year: '',
					semester: '',
					livingPlace: 'hostel'
				},
				errors: {}
			});
		} catch (err) {
			console.log(err);
		}
	};

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item active>Home</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	render() {
		return (
			<React.Fragment>
				<ToastContainer
					position='top-center'
					autoClose={2000}
					pauseOnHover={false}
					hideProgressBar={true}
					className='text-center'
				/>

				{this.renderBreadCrumbs()}

				<div className='jumbotron mx-auto pt-4 pb-5'>
					<h1 className='text-center display-4 mb-4'>Medical Form</h1>
					<form onSubmit={this.handleSubmit} className='mx-auto w-50'>
						{this.renderInput('index', 'Index Number')(true)}
						{this.state.data.username && (
							<Dropdown>
								{this.displayUserDetails()}

								<div className='row'>
									<div className='col'>
										{this.renderInput('year', 'Year')(false)}
									</div>
									<div className='col'>
										{this.renderInput('semester', 'Semester')(false)}
									</div>
								</div>

								{this.renderRadioButtons()}

								{this.renderTextArea('reason', 'Reason')}
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
