import React from 'react';
import { Redirect } from 'react-router-dom';
import Courses from './courses';

const Home = props => {
	return (
		<React.Fragment>
			{!props.user.id && <Redirect to='/login' />}
			<h1>
				Hello {props.user.firstName} {props.user.username}
			</h1>
			<Courses {...props} />
		</React.Fragment>
	);
};

export default Home;
