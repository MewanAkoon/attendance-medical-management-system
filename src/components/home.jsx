import React from 'react';
import { useSelector } from 'react-redux';
import { getLoggedInUserDetails } from '../store/login';

const Home = () => {
	const { surname } = useSelector(getLoggedInUserDetails);

	return (
		<React.Fragment>
			<h1>Home</h1>
			<p>Welcome {surname}</p>
		</React.Fragment>
	);
};

export default Home;
