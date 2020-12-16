import React from 'react';
import { Redirect } from 'react-router-dom';
import AttendanceLec from './lecturer/attendance/index';

const Attendance = props => {
	switch (props.user.role) {
		case 'lecturer':
			return <AttendanceLec {...props} />;
		case 'student':
			return <h1>Stu</h1>;
		default:
			return <Redirect to='/login' />;
	}
};

export default Attendance;
