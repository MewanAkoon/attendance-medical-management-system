import React from 'react';
import { ProgressBar } from 'react-bootstrap';

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
	const variant = average >= 80 ? 'success' : average >= 60 ? 'info' : 'danger';
	return average > 0 ? (
		<ProgressBar
			style={{ height: 15, fontSize: 12 }}
			className='mt-1'
			variant={variant}
			now={average}
			label={`${average.toFixed(0)}%`}
		/>
	) : null;
};

export default renderData;
