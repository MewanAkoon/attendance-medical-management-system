import React from 'react';
import getIcon from '../images';

const Course = ({ course }) => {
	return (
		<div className='card my-2'>
			<div className='row mx-0'>
				<div className='col-1'>
					<img src={getIcon()} alt='logo' className='w-100 h-100' />
				</div>
				<div className='col'>
					<div className='card-body'>
						<p className='my-0'>{course.code}</p>
						<p className='my-0'>{course.name}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Course;
