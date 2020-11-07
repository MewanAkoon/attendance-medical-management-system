import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import { userLoggedIn } from '../store/login';

class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {}
	};

	schema = Joi.object({
		username: Joi.string().required().label('Username'),
		password: Joi.string().min(8).required().label('Password')
	});

	doSubmit = () => {
		this.props.dispatch(
			userLoggedIn({
				id: 1,
				firstName: 'SC/2017/10265',
				username: 'Mewan',
				role: 'admin'
			})
		);
		console.log('Submitted');
		this.props.history.push('/home');
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className='mx-auto'>
				{this.renderInput('username', 'Username')(true)}
				{this.renderInput('password', 'Password', 'password')(false)}
				{this.renderSubmitButton('Login')}
			</form>
		);
	}
}

export default LoginForm;
