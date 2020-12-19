import React from 'react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import renderData from '../../common/progressBar';

let index = 1;

const getIndex = () => {
	const number = index.toString();
	index++;
	return number.length === 1 ? '0' + number : number;
};

const getFullDate = date => {
	return moment(date, 'YYYY:MM:DD HH:mm:ss').format('dddd, MMMM Do YYYY');
};

const getDate = date => {
	return moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
};

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

const AttendanceTable = ({ course, dates }) => {
	const { dates: records } = course;
	index = 1;

	return (
		<div>
			{records && records.length > 0 ? (
				<div className='jumbotron py-4'>
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
								<tr key={r._id} data-tip data-for={r._id}>
									<td>{getDate(r.date)}</td>
									<td>
										{getIndex()}. {r.lecture}
									</td>
									<td>
										{isPresent(r.date, dates) ? (
											<i
												className='fa fa-check-square-o'
												aria-hidden='true'></i>
										) : (
											<i className='fa fa-square-o' aria-hidden='true'></i>
										)}
										<ReactTooltip id={r._id} type='light' effect='solid'>
											{getFullDate(r.date)}
										</ReactTooltip>
									</td>
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
