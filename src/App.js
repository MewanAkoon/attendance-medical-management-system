import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home';
import Navbar from './components/navbar';

const App = () => {
	return (
		<React.Fragment>
			<div className='navbar navbar-expand-sm navbar-dark bg-primary'>
				<div className='container'>
					<Navbar />
				</div>
			</div>
			<div className='container mt-3'>
				<Switch>
					<Route path='/' exact component={Home} />
				</Switch>
			</div>
		</React.Fragment>
	);
};

export default App;
