import React from 'react';
import ReactToPdf from 'react-to-pdf';
import { useHistory } from 'react-router-dom';

const renderTable = record => {
	const { absentLectures, mcNumber } = record;
	return (
		<table className='table table-bordered table-sm' style={{ fontSize: 12 }}>
			<thead>
				<tr>
					<th>Name of Subject</th>
					<th>Subject Code</th>
					<th>Date</th>
					<th>Medical Certificate Number</th>
				</tr>
			</thead>
			<tbody>
				{absentLectures.map(l => (
					<tr key={l.code}>
						<td>{l.name}</td>
						<td>{l.code}</td>
						<td>{l.day}</td>
						<td>{mcNumber._id}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const renderMedicalForm = (records, selectedId, ref) => {
	const record = records.filter(record => record._id === selectedId)[0];

	return (
		<div ref={ref} className='border border-dark p-4'>
			<div className='mb-3'>
				<p className='text-center font-weight-bold mb-0'>
					Biological Science/Physical Science/Computer Science/Special Degree
				</p>
				<p className='text-center font-italic mb-0'>
					<small>
						Submission of Medical Certificates for Lecturers and Practical
						Classes
					</small>
				</p>
			</div>

			<div className='mx-auto mt-4'>
				<div className='row'>
					<div className='col-6'>01. Name</div>
					<div className='col'>: {record.name}</div>
				</div>
				<div className='row'>
					<div className='col-6'>02. Address</div>
					<div className='col'>: {record.address}</div>
				</div>
				<div className='row'>
					<div className='col-6'>03. Contact Number</div>
					<div className='col'>: {record.contactNumber}</div>
				</div>
				<div className='row'>
					<div className='col-6'>04. Registered No</div>
					<div className='col'>: {record.registeredNumber}</div>
				</div>
				<div className='row'>
					<div className='col-6'>05. Academic Year</div>
					<div className='col'>: {record.academicYear}</div>
				</div>
				<div className='row'>
					<div className='col-6'>06. Level</div>
					<div className='col'>: {record.level}</div>
				</div>
				<div className='row'>
					<div className='col-6'>07. Semester</div>
					<div className='col'>: {record.semester}</div>
				</div>
				<div className='mt-3' style={{ minHeight: 250 }}>
					{renderTable(record)}
				</div>

				<small className='mt-0'>
					I hereby certify that I am submitting a medical certificate according
					to the requirements listed overleaf.
				</small>

				<div className='row mt-4' style={{ fontSize: 13 }}>
					<div className='col'>
						<div>---------------------------------</div>
						<div>Signature of the Student</div>
					</div>
					<div className='col text-right'>
						<div className=''>---------------------------------</div>
						<div style={{ marginRight: 55 }}>Date</div>
					</div>
				</div>

				<div style={{ fontSize: 13 }} className='mt-4'>
					Mentor’s Observations:
				</div>

				<div style={{ fontSize: 13 }} className='mt-4'>
					Mentor’s Signature and Name :
				</div>

				<div style={{ fontSize: 13 }} className='mt-4'>
					Recommendation and signature of Medical committee member :
				</div>
			</div>
		</div>
	);
};

const ViewSelectedMedical = ({ records, selectedId }) => {
	const history = useHistory();
	const ref = React.createRef();

	return (
		<React.Fragment>
			<button
				className='btn btn-block btn-primary'
				onClick={() => history.replace('/view/medicalRequests/')}>
				Go Back <i className='fa fa-arrow-left ml-1' aria-hidden='true' />
			</button>

			<ReactToPdf
				targetRef={ref}
				filename='medical.pdf'
				onComplete={() => history.replace('/view/medicalRequests/')}>
				{({ toPdf }) => (
					<button className='btn btn-block btn-success' onClick={toPdf}>
						Download <i className='fa fa-download ml-1' aria-hidden='true' />
					</button>
				)}
			</ReactToPdf>

			<div className='jumbotron w-75 mx-auto mt-2 py-4'>
				{renderMedicalForm(records, selectedId, ref)}
			</div>
		</React.Fragment>
	);
};

export default ViewSelectedMedical;
