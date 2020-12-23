import React from 'react';

import { default as MessageStudent } from './student/message';

const MessageMenu = ({ user }) => {
	switch (user.role) {
		case 'student':
			return <MessageStudent user={user} />;
		default:
			return null;
	}
};

export default MessageMenu;
