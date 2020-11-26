import React from 'react';
import { Redirect } from 'react-router-dom';
import MedicalForm from './medical/medicalForm';
import Courses from './student/courses';

const Home = props => {
	switch (props.user.role) {
		case 'student':
			return <Courses {...props} />;
		case 'medical':
			return <MedicalForm {...props} />;
		default:
			return <Redirect to='/login' />;
	}
};

export default Home;
