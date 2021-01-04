import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import axios from 'axios';
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

	doSubmit = async () => {
		const { username, password } = this.state.data;
		try {
			const { data } = await axios.post(`/api/users/${username}/${password}`);

			this.props.dispatch(
				userLoggedIn({
					id: data._id,
					firstName: data.firstName,
					username: data.username,
					role: data.role,
					courses: data.courses
				})
			);

			this.props.history.push('/home');
		} catch (err) {
			const errors = { ...this.state.errors };
			errors.login = 'Invalid login, please try again';
			this.setState({ errors });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className='mx-auto'>
				{this.state.errors.login && (
					<small className='alert alert-danger d-block mt-0'>
						{this.state.errors.login}
					</small>
				)}
				{this.renderInput('username', 'Username')(true)}
				{this.renderInput('password', 'Password', 'password')(false)}
				{this.renderSubmitButton('Login')}
			</form>
		);
	}
}

export default LoginForm;
