import React from 'react';
import { NavDropdown } from 'react-bootstrap';

const Navbar = props => {
	const { firstName, username } = props;
	const handleLogout = () => console.log('Logging Out');
	return (
		<React.Fragment>
			<span className='navbar-brand'>
				<i className='fa fa-bug' aria-hidden='true'></i>
			</span>
			<ul className='navbar-nav'>
				<li className='nav-item nav-link text-light'>
					{firstName ? `${firstName} ${username}` : 'You are not logged in.'}
				</li>
				{firstName && (
					<NavDropdown title={<i className='fa fa-cog' />} id='dropdown-navbar'>
						<NavDropdown.Item onClick={handleLogout}>
							<i className='fa fa-sign-out mr-2' aria-hidden='true' />
							Logout
						</NavDropdown.Item>
					</NavDropdown>
				)}
			</ul>
		</React.Fragment>
	);
};

export default Navbar;
