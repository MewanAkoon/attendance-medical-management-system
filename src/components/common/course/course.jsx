import React from 'react';
import getIcon from '../../../images';
import { Link } from 'react-router-dom';
import { isActive } from '../../common/isActive';

const getClasses = schedule => {
	const active = isActive(schedule);
	return active ? ' text-success small ' : 'd-none';
};

const Course = ({ course }) => {
	return (
		<div className='card my-2'>
			<div className='row mx-0'>
				<div className='col-1'>
					<img
						src={getIcon()}
						alt='logo'
						style={{ minWidth: 50, minHeight: 50 }}
						className='w-100 h-100'
					/>
				</div>
				<div className='col'>
					<div className='card-body'>
						<p className='my-0 font-weight-bold'>
							<Link to={{ pathname: `/courses/${course.code}` }}>
								{course.code}
							</Link>
						</p>
						<p className='my-0'>{course.name}</p>
						<span className={getClasses(course.schedule)}>Active now</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Course;
