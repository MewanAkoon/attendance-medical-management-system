import React from 'react';
import moment from 'moment';

const getDate = date => {
	return moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
};

const getClasses = (date, selectedDate) =>
	date === selectedDate ? 'list-group-item active' : 'list-group-item';

const Date = ({ date, selectedDate, onDateSelect }) => {
	return (
		<small
			onClick={() => onDateSelect(date)}
			className={getClasses(date, selectedDate)}>
			{getDate(date)}
		</small>
	);
};

export default Date;
