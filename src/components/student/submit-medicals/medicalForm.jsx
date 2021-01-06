import React from 'react';
import Form from '../../common/form';
import Joi from 'joi';
import axios from 'axios';
// import { Breadcrumb, Dropdown } from 'react-bootstrap';
// import { toast } from 'react-toastify';

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
		name: Joi.string().required().label('Name'),
		address: Joi.string().required().label('Address'),
		contactNumber: Joi.string().required().label('Contact Number'),
		registeredNumber: Joi.string().required().label('Registered Number'),
		academicYear: Joi.number().required().label('Academic Year'),
		level: Joi.number().required().min(1).max(4).label('Level'),
		semester: Joi.number().required().min(1).max(2).label('Semester')
	});

	doSubmit = async () => {
		// const { index, reason, year, semester, livingPlace } = this.state.data;
		// try {
		// 	await axios.post(`/api/medicals`, {
		// 		index,
		// 		reason,
		// 		year: parseInt(year),
		// 		semester: parseInt(semester),
		// 		livingPlace
		// 	});
		// 	toast.success('Medical Submitted.');
		// 	this.setState({
		// 		data: {
		// 			index: '',
		// 			reason: '',
		// 			year: '',
		// 			semester: '',
		// 			livingPlace: 'hostel'
		// 		},
		// 		errors: {}
		// 	});
		// } catch (err) {
		// 	console.log(err);
		// }
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

	render() {
		return (
			<React.Fragment>
				<div className='jumbotron mx-auto pt-4 pb-5'>
					<h1 className='text-center display-4 mb-4'>
						Medical Submission Form
					</h1>
					<form onSubmit={this.handleSubmit} className='mx-auto w-50'>
						{this.renderInput('name', 'Name')(true)}
						{this.renderInput('address', 'Address')(false)}
						{this.renderInput('contactNumber', 'Contact Number')(false)}
						{this.renderInput('registeredNumber', 'Registered Number')(false)}
						{this.renderInput('academicYear', 'Academic Year')(false)}
						{this.renderInput('level', 'Level')(false)}
						{this.renderInput('semester', 'Semester')(false)}
						{this.renderAbsentCourses()}
						{this.renderMedicalCertificateNumber()}
						{this.renderSubmitButton('Submit')}
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default MedicalForm;
