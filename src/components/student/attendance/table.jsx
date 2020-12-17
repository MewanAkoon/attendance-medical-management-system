import React from 'react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { ProgressBar } from 'react-bootstrap';

const getFullDate = date => {
	return moment(date, 'YYYY:MM:DD HH:mm:ss').format(
		'dddd, MMMM Do YYYY, h:mm:ss a'
	);
};

const getDate = date => {
	return moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
};

// const getTime = date => {
// 	return moment(date, 'YYYY:MM:DD HH:mm:ss').format('hh:mm a');
// };

const isPresent = (date, presentDates) => {
	return presentDates.includes(getDate(date));
};

const renderAlert = () => {
	return (
		<div className='alert alert-secondary text-center'>
			<small>No existing records available</small>
		</div>
	);
};

const renderData = (present, total) => {
	const average = (present / total) * 100;

	return (
		<div className='alert alert-primary'>
			<small>
				Total Present: {present}/{total}
			</small>
			{average > 0 && renderProgressBar(average)}
		</div>
	);
};

const renderProgressBar = average => {
	const variant = average >= 80 ? 'success' : 'danger';
	return average > 0 ? (
		<ProgressBar
			style={{ height: 15, fontSize: 12 }}
			className='mt-1'
			variant={variant}
			now={average}
			label={`${average}%`}
		/>
	) : null;
};

const AttendanceTable = ({ course, dates }) => {
	const { dates: records } = course;

	return (
		<div>
			{records && records.length > 0 ? (
				<div className='jumbotron pt-4'>
					{renderData(dates.length, records.length)}

					<table className='table table-hover table-sm'>
						<thead className='thead-dark'>
							<tr>
								<th>Day</th>
								<th>Lecture</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody style={{ cursor: 'pointer' }}>
							{records.map(r => (
								<tr key={r} data-tip data-for={r}>
									<td>{getDate(r)}</td>
									<td>Lecture name comes here</td>
									<td>
										{isPresent(r, dates) ? (
											<i
												className='fa fa-check-square-o'
												aria-hidden='true'></i>
										) : (
											<i className='fa fa-square-o' aria-hidden='true'></i>
										)}
									</td>
									<ReactTooltip id={r} type='light' effect='solid'>
										{getFullDate(r)}
									</ReactTooltip>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				renderAlert()
			)}
		</div>
	);
};

export default AttendanceTable;
