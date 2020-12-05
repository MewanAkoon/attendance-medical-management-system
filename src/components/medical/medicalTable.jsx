import React from 'react';
import moment from 'moment';

const noRecordsFound = () => (
	<div className='alert alert-danger text-center'>
		<h1 className='display-5'>No Records Found</h1>
	</div>
);

const getDate = data => moment(data).format('MM-DD-YYYY');

const getTime = data => moment(data).format('hh:mm:ss');

const renderMedicalTable = records => (
	<div className='jumbotron pt-4'>
		<h1 className='text-center mb-4 display-4'>Medical Records</h1>

		<table className='table table-hover'>
			<thead className='thead-dark'>
				<tr>
					<th>Index</th>
					<th>Reason</th>
					<th>Date</th>
					<th>Time</th>
				</tr>
			</thead>
			<tbody>
				{records.map(r => (
					<tr key={r._id}>
						<td>{r.index}</td>
						<td>{r.reason}</td>
						<td>{getDate(r.date)}</td>
						<td>{getTime(r.date)}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const MedicalTable = ({ records }) => {
	return records.length > 0 ? renderMedicalTable(records) : noRecordsFound();
};

export default MedicalTable;
