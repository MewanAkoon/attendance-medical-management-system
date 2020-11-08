import React from 'react';
import LoginForm from './loginForm';
import { useDispatch } from 'react-redux';

const Login = props => {
	const { id, firstName, username } = props.user;
	const dispatch = useDispatch();

	const handleCancel = () => {
		console.log('Cancel');
		props.history.push('/home');
	};

	return (
		<React.Fragment>
			<div className='jumbotron w-50 mx-auto pt-4 pb-5'>
				<h1 className='text-center display-4'>Login</h1>
				<hr className='mb-4' />
				{id ? (
					<div>
						<p>
							You are already logged in as {firstName} {username}, you need to
							log out before logging in as different user.
						</p>
						<hr />
						<button
							onClick={handleCancel}
							className='btn btn-secondary btn-block w-25 ml-auto text-center'>
							Cancel
						</button>
					</div>
				) : (
					<LoginForm dispatch={dispatch} {...props} />
				)}
			</div>
		</React.Fragment>
	);
};

export default Login;
