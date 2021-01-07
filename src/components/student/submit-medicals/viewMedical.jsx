import React from 'react';

const renderAlert = () => {
	return (
		<div className='alert text-center mb-0'>
			<p className='mb-0'>Select a Date</p>
		</div>
	);
};

const renderTable = record => {
	const { absentLectures, mcNumber } = record;
	return (
		<table className='table table-secondary table-sm' style={{ fontSize: 12 }}>
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
						<td>{mcNumber}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const renderMedicalForm = (records, date) => {
	const record = records.filter(record => record.timestamp === date)[0];

	return (
		<div>
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

			<div className='w-75 mx-auto'>
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
				<div className='mt-2'>{renderTable(record)}</div>
			</div>
		</div>
	);
};

const ViewMedical = ({ records, date }) => {
	return (
		<React.Fragment>
			<div className='jumbotron py-2'>
				{!date ? renderAlert() : renderMedicalForm(records, date)}
			</div>
		</React.Fragment>
	);
};

export default ViewMedical;
