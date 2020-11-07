import React, { Component } from 'react';

class Login extends Component {
	state = {};

	handleSubmit = e => {
		e.preventDefault();
		console.log('Submitted');
	};

	handleCancel = () => {
		console.log('Cancel');
	};

	render() {
		const { firstName, username } = this.props;

		return (
			<React.Fragment>
				<div className='jumbotron w-50 mx-auto pt-4 pb-5'>
					<h1 className='text-center display-4'>Login</h1>
					<hr className='mb-4' />
					{firstName ? (
						<div>
							<p>
								You are already logged in as {firstName} {username}, you need to
								log out before logging in as different user.
							</p>
							<hr />
							<button
								onClick={this.handleCancel}
								className='btn btn-secondary btn-block w-25 ml-auto'>
								Cancel
							</button>
						</div>
					) : (
						<form onSubmit={this.handleSubmit} className='mx-auto'>
							<div className='form-group'>
								<label htmlFor='username'>Username</label>
								<input
									type='text'
									name='username'
									className='form-control'
									autoFocus
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Password</label>
								<input
									type='password'
									name='password'
									className='form-control'
								/>
							</div>
							<button className='btn btn-primary btn-block mt-4'>Login</button>
						</form>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default Login;
