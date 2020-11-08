import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getLoggedInUserDetails } from './store/login';
import { useSelector } from 'react-redux';
import Home from './components/home';
import Navbar from './components/navbar';
import Login from './components/login';
import NotFound from './components/notFound';
import './css/index.css';

const App = () => {
	const user = useSelector(getLoggedInUserDetails);
	return (
		<React.Fragment>
			<div className='navbar navbar-expand-sm navbar-dark bg-primary'>
				<div className='container'>
					<Navbar {...user} />
				</div>
			</div>
			<div className='container mt-3'>
				<Switch>
					<Route path='/not-found' component={NotFound} />
					<Route
						path='/login'
						render={props => <Login user={user} {...props} />}
					/>
					<Route
						path='/home'
						render={props => <Home user={user} {...props} />}
					/>
					<Redirect from='/' exact to={user.id ? '/home' : '/login'} />
					<Redirect to='/not-found' />
				</Switch>
			</div>
		</React.Fragment>
	);
};

export default App;
