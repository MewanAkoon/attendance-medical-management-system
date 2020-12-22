import React from 'react';
import moment from 'moment';

const getDate = date => {
	return moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
};

const getClasses = (date, selectedDate) =>
	date === selectedDate ? 'list-group-item active' : 'list-group-item';

const Date = ({ course, date, selectedDate, onChange }) => {
	return (
		<small
			onClick={() => onChange(course, date)}
			className={getClasses(date, selectedDate)}>
			{getDate(date)}
		</small>
	);
};

export default Date;
