import React from 'react';
import { Redirect } from 'react-router-dom';
import AttendanceLec from './lecturer/attendance/index';
import AttendanceStu from './student/attendance';

const Attendance = props => {
	switch (props.user.role) {
		case 'lecturer':
			return <AttendanceLec {...props} />;
		case 'student':
			return <AttendanceStu {...props} />;
		default:
			return <Redirect to='/login' />;
	}
};

export default Attendance;
