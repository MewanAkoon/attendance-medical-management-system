import React from 'react';
import { Redirect } from 'react-router-dom';
import AttendanceHead from './head/attendance';
import AttendanceLec from './lecturer/attendance';
import AttendanceStu from './student/attendance';

const Attendance = props => {
	switch (props.user.role) {
		case 'head':
			return <AttendanceHead {...props} />;
		case 'lecturer':
			return <AttendanceLec {...props} />;
		case 'student':
			return <AttendanceStu {...props} />;
		default:
			return <Redirect to='/login' />;
	}
};

export default Attendance;
