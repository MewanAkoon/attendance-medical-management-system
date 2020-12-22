import React from 'react';
import Date from './date';

const Dates = ({ course, dates, selectedDate, onChange }) => {
	return (
		<div className='list-group list-group-flush text-center'>
			{dates.map(d => (
				<Date
					key={d._id}
					course={course}
					date={d.date}
					selectedDate={selectedDate}
					onChange={onChange}
				/>
			))}
		</div>
	);
};

export default Dates;
