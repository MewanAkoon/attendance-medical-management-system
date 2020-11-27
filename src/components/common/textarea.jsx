import React from 'react';

const TextArea = ({ name, label, value, onChange, error }) => {
	return (
		<div className='form-group'>
			<textarea
				name={name}
				cols='30'
				rows='3'
				onChange={onChange}
				placeholder={label}
				value={value}
				className='form-control mb-3'
			/>
			{error && (
				<small className='alert alert-danger mt-2 py-2 d-block'>{error}</small>
			)}
		</div>
	);
};

export default TextArea;
