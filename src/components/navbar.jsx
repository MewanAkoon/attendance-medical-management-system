import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { userLoggedOut } from '../store/login';
import { useDispatch } from 'react-redux';
import logo from '../images/logos/3.svg';

const Navbar = props => {
	const { id, firstName, username } = props;
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(userLoggedOut());
		console.log('Logging Out');
	};
	return (
		<React.Fragment>
			<span className='navbar-brand'>
				<img
					src={logo}
					style={{ width: '1.5em', height: '1.5em' }}
					alt='logo'
				/>
				{/* <i className='fa fa-bug' aria-hidden='true'></i> */}
			</span>
			<ul className='navbar-nav'>
				<li className='nav-item nav-link text-light'>
					{id ? `${firstName} ${username}` : 'You are not logged in.'}
				</li>
				{id && (
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
