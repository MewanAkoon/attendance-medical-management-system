import React from 'react';
import moment from 'moment';

const getDate = date => {
	return moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
};

const Date = ({ date, onDateSelect }) => {
	return (
		<button
			onClick={() => onDateSelect(date)}
			className='btn btn-outline-secondary'>
			{getDate(date)}
		</button>
	);
};

export default Date;
