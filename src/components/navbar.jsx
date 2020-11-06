import React from 'react';

const Navbar = ({ firstName, surname }) => {
	return (
		<React.Fragment>
			<span className='navbar-brand'>
				<i className='fa fa-bug' aria-hidden='true'></i>
			</span>
			<ul className='navbar-nav'>
				<li className='nav-item nav-link text-light'>
					{firstName ? `${firstName} ${surname}` : 'You are not logged in.'}
				</li>
			</ul>
		</React.Fragment>
	);
};

export default Navbar;
