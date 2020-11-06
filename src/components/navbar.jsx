import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<React.Fragment>
			<span className='navbar-brand'>
				<i className='fa fa-bug' aria-hidden='true'></i>
			</span>
			<ul className='navbar-nav'>
				<li className='nav-item'>
					<Link className='nav-link' to='/'>
						Home
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link' to='/about'>
						About
					</Link>
				</li>
			</ul>
		</React.Fragment>
	);
};

export default Navbar;
