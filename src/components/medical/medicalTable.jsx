import React from 'react';
import moment from 'moment';
import { Breadcrumb } from 'react-bootstrap';

const noRecordsFound = () => (
	<div className='alert alert-danger text-center w-50 mx-auto'>
		<p className='lead mb-0'>No Records Found</p>
	</div>
);

const getDate = data => moment(data).format('MM-DD-YYYY');

const getTime = data => moment(data).format('hh:mm:ss');

const renderBreadCrumbs = () => {
	return (
		<Breadcrumb>
			<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
			<Breadcrumb.Item active>Medical Records</Breadcrumb.Item>
		</Breadcrumb>
	);
};

const renderMedicalTable = records => (
	<React.Fragment>
		{renderBreadCrumbs()}
		<div>
			<div className='jumbotron pt-4'>
				<h1 className='text-center mb-4 display-4'>Medical Records</h1>

				<table className='table table-hover'>
					<thead className='thead-dark'>
						<tr>
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
								<td>{r.index._id}</td>
								<td>{r.index.username}</td>
								<td>{r.reason}</td>
								<td>{getDate(r.date)}</td>
								<td>{getTime(r.date)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	</React.Fragment>
);

const MedicalTable = ({ records }) => {
	return records.length > 0 ? renderMedicalTable(records) : noRecordsFound();
};

export default MedicalTable;
