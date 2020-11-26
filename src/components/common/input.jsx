import React from 'react';

const Input = ({ type, name, label, value, onChange, autoFocus, error }) => {
	return (
		<div className='form-group'>
			<input
				type={type}
				placeholder={label}
				onChange={onChange}
				name={name}
				value={value}
				className='form-control'
				autoFocus={autoFocus}
			/>
			{error && (
				<small className='alert alert-danger mt-2 py-2 d-block'>{error}</small>
			)}
		</div>
	);
};

export default Input;
