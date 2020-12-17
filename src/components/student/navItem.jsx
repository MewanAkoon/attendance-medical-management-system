import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const StudentNav = () => {
	const history = useHistory();

	return (
		<React.Fragment>
			<NavDropdown.Item onClick={() => history.push('/attendance')}>
				<i className='fa fa-industry mr-2' aria-hidden='true' />
				View Attendance
			</NavDropdown.Item>
			<hr className='my-1 mx-2' />
		</React.Fragment>
	);
};

export default StudentNav;
