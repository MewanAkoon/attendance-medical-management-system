import React from 'react';
import { Redirect } from 'react-router-dom';

const Home = props => {
	return (
		<React.Fragment>
			{!props.id && <Redirect to='/login' />}
			<h1>Hello {props.username}</h1>
		</React.Fragment>
	);
};

export default Home;
