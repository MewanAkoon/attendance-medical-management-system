import React from 'react';
import moment from 'moment';

const noRecordsFound = () => (
	// displays a message if there are no records
	<div className='alert alert-danger text-center w-50 mx-auto'>
		<p className='lead mb-0'>No Records Found</p>
	</div>
);

// gets the date in a specific format given a moment object
const getDate = data => moment(data).format('MM-DD-YYYY');

// gets the time in a specific format given a moment object
const getTime = data => moment(data).format('hh:mm:ss');

const renderMedicalTable = records => (
	<table className='table table-hover'>
		<thead className='thead-dark'>
			<tr>
				<th>MC Number</th>
				<th>Index</th>
				<th>Name</th>
				<th>Reason</th>
				<th>Date</th>
				<th>Time</th>
			</tr>
		</thead>
		<tbody>
			{records.map(r => (
				<tr key={r._id}>
					<td>{r._id}</td>
					<td>{r.index._id}</td>
					<td>{r.index.username}</td>
					<td>{r.reason}</td>
					<td>{getDate(r.date)}</td>
					<td>{getTime(r.date)}</td>
				</tr>
			))}
		</tbody>
	</table>
);

const MedicalTable = ({ records }) => {
	// displays medical records if there are any or displays alert
	return records.length > 0 ? renderMedicalTable(records) : noRecordsFound();
};

export default MedicalTable;
