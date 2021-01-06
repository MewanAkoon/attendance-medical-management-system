import React from 'react';

import Notifications from './student/notification';

const NotificationMenu = ({ user }) => {
	switch (user.role) {
		case 'student':
		case 'lecturer':
		case 'head':
			return <Notifications user={user} />;
		default:
			return null;
	}
};

export default NotificationMenu;
