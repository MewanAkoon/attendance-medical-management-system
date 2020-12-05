import React from 'react';
import getIcon from '../../../images';
import moment from 'moment';
import { Link } from 'react-router-dom';

const getDayAndTime = () => {
	const m = moment();
	return { day: m.day(), time: m.hour() };
};

const isActive = schedule => {
	let classes = 'text-success small';
	const { day, time } = getDayAndTime();

	const active =
		schedule.day === day &&
		time >= schedule.startTime &&
		time < schedule.startTime + schedule.duration;

	if (!active) classes += ' d-none';

	return classes;
};

const Course = ({ course }) => {
	return (
		<div className='card my-2'>
			<div className='row mx-0'>
				<div className='col-1'>
					<img src={getIcon()} alt='logo' className='w-100 h-100' />
				</div>
				<div className='col'>
					<div className='card-body'>
						<p className='my-0 font-weight-bold'>
							<Link to={{ pathname: `/courses/${course.code}` }}>
								{course.code}
							</Link>
						</p>
						<p className='my-0'>{course.name}</p>
						<span className={isActive(course.schedule)}>Active now</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Course;
