import React from 'react';
import { Redirect } from 'react-router-dom';
import MedicalForm from './medical/medicalForm';
import Courses from './common/course/courses';

const sayHello = ({ firstName, username }) => (
	<h1>
		Hello {firstName} {username}
	</h1>
);

const Home = props => {
	switch (props.user.role) {
		case 'admin':
			return sayHello(props.user);
		case 'lecturer':
		case 'student':
			return <Courses {...props} />;
		case 'medical':
			return <MedicalForm {...props} />;
		default:
			return <Redirect to='/login' />;
	}
};

export default Home;
