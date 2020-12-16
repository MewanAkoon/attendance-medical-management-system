import React from 'react';
import Date from './date';

const Dates = ({ dates, onDateSelect }) => {
	return (
		<div className='btn-group-vertical btn-group-sm w-100 text-center'>
			{dates.map(d => (
				<Date onDateSelect={onDateSelect} key={d} date={d} />
			))}
		</div>
	);
};

export default Dates;
