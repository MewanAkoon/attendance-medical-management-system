import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const MedicalNav = () => {
	const history = useHistory();

	return (
		<React.Fragment>
			<NavDropdown.Item onClick={() => history.push('/medical/records')}>
				<i className='fa fa-plus-square mr-2' aria-hidden='true' />
				Medical Reports
			</NavDropdown.Item>
			<hr className='my-1 mx-2' />
		</React.Fragment>
	);
};

export default MedicalNav;
