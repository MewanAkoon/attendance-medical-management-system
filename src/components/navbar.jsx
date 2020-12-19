import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { userLoggedOut } from '../store/login';
import { useDispatch } from 'react-redux';
import logo from '../images/logos/3.svg';
import MedicalNav from './medical/navItem';
import LecturerNav from './lecturer/navItem';
import StudentNav from './student/navItem';

const tempNotificationMenu = () => {
	return (
		<div className='px-4 py-1' style={{ width: 400, height: 300 }}>
			<p className='text-dark m-0'>Notifications</p>
			<hr className='my-2' />
		</div>
	);
};

const Navbar = props => {
	const { id, firstName, username, role } = props;
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<span className='navbar-brand'>
				<img
					src={logo}
					style={{ width: '1.5em', height: '1.5em' }}
					alt='logo'
				/>
			</span>
			<ul className='navbar-nav'>
				{id && (
					<NavDropdown
						title={<i className='fa fa-bell-o' aria-hidden='true' />}
						id='dropdown-navbar'>
						{tempNotificationMenu()}
					</NavDropdown>
				)}
				<li className='nav-item nav-link text-light'>
					{id ? `${firstName} ${username}` : 'You are not logged in.'}
				</li>
				{id && (
					<NavDropdown
						title={<i className='fa fa-cog' aria-hidden='true' />}
						id='dropdown-navbar'>
						{role === 'medical' && <MedicalNav {...props} />}
						{role === 'lecturer' && <LecturerNav {...props} />}
						{role === 'student' && <StudentNav {...props} />}

						<NavDropdown.Item onClick={() => dispatch(userLoggedOut())}>
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
