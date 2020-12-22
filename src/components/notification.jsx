import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { default as NotificationStudent } from './student/notification';

const NotificationMenu = ({ user }) => {
	let navCount = 0;

	const setNavCount = count => (navCount = count);

	const getBadgeIcon = () => {
		return (
			<React.Fragment>
				<i className='text-white fa fa-bell' aria-hidden='true' />
				{navCount > 0 && <span className='icon-badge' />}
			</React.Fragment>
		);
	};

	return (
		<NavDropdown title={getBadgeIcon()} id='dropdown-navbar'>
			<div className='px-4 py-1' style={{ width: 400, height: 300 }}>
				<p className='text-dark m-0'>Notifications</p>
				<hr className='my-2' />
				<NotificationStudent setNavCount={setNavCount} user={user} />
			</div>
		</NavDropdown>
	);
};

export default NotificationMenu;
