import React from 'react';
import Form from '../../common/form';
import Joi from 'joi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

class MedicalForm extends Form {
	state = {
		index: '',
		absentLectures: [],
		count: 0,
		medicalRecord: {},
		data: {
			name: '',
			address: '',
			contactNumber: '',
			registeredNumber: '',
			academicYear: '',
			level: '',
			semester: ''
		},
		errors: {}
	};

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) this.loadData();
	}

	setStateToInitialState() {
		const { index, count, absentLectures } = this.state;

		const newState = {
			index,
			absentLectures,
			count,
			medicalRecord: '',
			data: {
				name: '',
				address: '',
				contactNumber: '',
				registeredNumber: '',
				academicYear: '',
				level: '',
				semester: ''
			},
			errors: {}
		};
		this.setState(newState);
	}

	async loadData() {
		const {
			user: { id },
			messages,
			count
		} = this.props;

		const { data } = await axios.get(`/api/medicals/${id}`);

		this.setState({
			index: id,
			absentLectures: this.getAbsentLectures(messages),
			count,
			medicalRecord: data._id
		});
	}

	getAbsentLectures(messages) {
		const absentLectures = [];

		messages.forEach(message => {
			message.absentDays.forEach(day =>
				absentLectures.push({ code: message.code, name: message.name, day })
			);
		});

		return absentLectures;
	}

	schema = Joi.object({
		name: Joi.string()
			.min(5)
			.required()
			.label('Name')
			.regex(/^[a-zA-Z ]+$/),
		address: Joi.string().min(5).max(50).required().label('Address'),
		contactNumber: Joi.string()
			.regex(/^[0-9]{10}$/)
			.required()
			.label('Contact Number'),
		registeredNumber: Joi.string().required().label('Registered Number'),
		academicYear: Joi.number().required().label('Academic Year'),
		level: Joi.number().required().min(1).max(4).label('Level'),
		semester: Joi.number().required().min(1).max(2).label('Semester')
	});

	doSubmit = async () => {
		const { index, absentLectures, medicalRecord: mcNumber, data } = this.state;

		const body = {
			index,
			absentLectures,
			mcNumber,
			name: data.name,
			address: data.address,
			contactNumber: data.contactNumber,
			registeredNumber: data.registeredNumber,
			academicYear: data.academicYear,
			level: data.level,
			semester: data.semester
		};

		try {
			await axios.post(`/api/submitMedical`, body);
			toast.success('Medical Submitted');
			this.setStateToInitialState();
		} catch (err) {
			console.log(err);
		}
	};

	renderAbsentCourses() {
		const { absentLectures } = this.state;

		return (
			<table className='table table-secondary'>
				<thead>
					<tr>
						<th>Name of Subject</th>
						<th>Subject Code</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{absentLectures.map(l => (
						<tr key={l.code}>
							<td>{l.name}</td>
							<td>{l.code}</td>
							<td>{l.day}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	renderMedicalCertificateNumber() {
		const { medicalRecord } = this.state;

		return (
			<div className='row my-4'>
				<div className='col font-weight-bold'>Medical Certificate Number :</div>
				<div className='col text-right'>{medicalRecord.toString()}</div>
			</div>
		);
	}

	renderMessages() {
		const { count, medicalRecord } = this.state;

		return (
			<div className='text-center'>
				{count > 0 && !medicalRecord && (
					<p className='mb-0'>You dont have available medical records.</p>
				)}
				{count === 0 && <p className='mb-0'>You don't have absent courses.</p>}
			</div>
		);
	}

	render() {
		const { count, medicalRecord } = this.state;

		return (
			<React.Fragment>
				<ToastContainer
					position='top-center'
					autoClose={2000}
					pauseOnHover={false}
					hideProgressBar={true}
					className='text-center'
				/>

				<div className='jumbotron mx-auto pt-4 pb-5'>
					{count > 0 && medicalRecord ? (
						<React.Fragment>
							<h1 className='text-center display-4 mb-4'>
								Medical Submission Form
							</h1>
							<form onSubmit={this.handleSubmit} className='mx-auto w-50'>
								{this.renderInput('name', 'Name')(true)}
								{this.renderTextArea('address', 'Address')}
								{this.renderInput('contactNumber', 'Contact Number')(false)}
								{this.renderInput(
									'registeredNumber',
									'Registered Number'
								)(false)}
								{this.renderInput('academicYear', 'Academic Year')(false)}
								{this.renderInput('level', 'Level')(false)}
								{this.renderInput('semester', 'Semester')(false)}
								{this.renderAbsentCourses()}
								{this.renderMedicalCertificateNumber()}
								{this.renderSubmitButton('Submit')}
							</form>
						</React.Fragment>
					) : (
						this.renderMessages()
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default MedicalForm;
