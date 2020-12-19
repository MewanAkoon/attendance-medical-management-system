import React from 'react';
import Date from './date';

const Dates = ({ dates, selectedDate, onDateSelect }) => {
	return (
		<div className='list-group list-group-flush text-center'>
			{dates.map(d => (
				<Date
					selectedDate={selectedDate}
					onDateSelect={onDateSelect}
					key={d._id}
					date={d.date}
				/>
			))}
		</div>
	);
};

export default Dates;
