import React from 'react';

const Login = ({ firstName, surname }) => {
	return (
		<React.Fragment>
			<h1>Login</h1>
			{firstName ? (
				<p>
					You are already logged in as {firstName} {surname}, you need to log
					out before logging in as different user.
				</p>
			) : null}
		</React.Fragment>
	);
};

export default Login;
