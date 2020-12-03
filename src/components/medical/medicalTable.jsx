import React from 'react';

const noRecordsFound = () => (
	<div className='alert alert-danger text-center'>
		<h1 className='display-5'>No Records Found</h1>
	</div>
);

const renderMedicalTable = records => (
	<div className='jumbotron pt-4'>
		<h1 className='text-center mb-4 display-4'>Medical Records</h1>

		<table className='table table-hover'>
			<thead className='thead-dark'>
				<tr>
					<th>Index</th>
					<th>Reason</th>
				</tr>
			</thead>
			<tbody>
				{records.map(r => (
					<tr key={r.id}>
						<td>{r.index}</td>
						<td>{r.reason}</td>
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
