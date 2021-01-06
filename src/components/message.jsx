import React from 'react';

import { default as MessageStudent } from './student/message';
import { default as MessageHead } from './head/message';

const MessageMenu = ({ user }) => {
	switch (user.role) {
		case 'student':
			return <MessageStudent user={user} />;
		case 'head':
			return <MessageHead user={user} />;
		default:
			return null;
	}
};

export default MessageMenu;
