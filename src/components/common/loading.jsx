import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
	return (
		<div className='container d-flex justify-content-center mt-4'>
			<Spinner size='sm' animation='grow' />
			<Spinner className='ml-1' size='sm' animation='grow' />
			<Spinner className='ml-1' size='sm' animation='grow' />
		</div>
	);
};

export default Loading;
