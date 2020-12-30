import React from 'react';
import ReactToPdf from 'react-to-pdf';
import { useHistory } from 'react-router-dom';
import Logo from '../../../images/logos/ruh-logo.jpg';

const totalPresent = students => students.filter(student => student[2]).length;

const renderPDF = ({ course, date, headers, items, lecture }) => (
	<React.Fragment>
		<div
			className='border border-black rounded p-4 mb-4'
			style={{ minHeight: 600 }}>
			<div className='mr-4'>
				<div className='mx-4'>
					<div style={{ position: 'relative', zIndex: 1 }}>
						<img
							src={Logo}
							className='mt-1'
							style={{
								position: 'absolute',
								zIndex: 2,
								width: 120,
								height: 150
							}}
							alt='logo'
						/>
						<div
							className='text-center'
							style={{ position: 'relative', zIndex: 3 }}>
							<h1 className='display-5'>Attendance Sheet</h1>
							<p className='mb-0'>University of Ruhuna, Wellamadama, Matara</p>
							<p className='mb-0'>Faculty of Science, DCS</p>
							<p className='mb-0'>
								{course.code} - {course.name}
							</p>
							<p className='mb-0'>{lecture}</p>
						</div>
					</div>

					<div className='row mt-4'>
						<div className='col'>Date: {date}</div>
						<div className='col text-right'>
							Lecturer: {course.lecturer.firstName} {course.lecturer.username}
						</div>
					</div>

					<div className='row'>
						<div className='col'>
							Total Present: {totalPresent(items)}/{items.length}
						</div>
						<div className='col text-right'>_ _ _ _ _ _ _ _ _ _ _</div>
					</div>

					<table className='table table-sm mt-4'>
						<thead className='thead-dark'>
							<tr>
								<th>{headers[0]}</th>
								<th>{headers[1]}</th>
								<th>{headers[2]}</th>
							</tr>
						</thead>
						<tbody>
							{items.map(i => (
								<tr key={i[0]}>
									<td>{i[0]}</td>
									<td>{i[1]}</td>
									<td>{i[2] ? 'Present' : 'Absent'}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</React.Fragment>
);

const AttendancePDF = props => {
	const history = useHistory();
	const ref = React.createRef();

	return (
		<React.Fragment>
			<button
				className='btn btn-block btn-primary'
				onClick={() => history.replace('/attendance')}>
				Go Back <i className='fa fa-arrow-left ml-1' aria-hidden='true' />
			</button>

			<ReactToPdf
				targetRef={ref}
				scale={0.98}
				filename='attendance.pdf'
				onComplete={() => history.replace('/attendance')}>
				{({ toPdf }) => (
					<button className='btn btn-block btn-success' onClick={toPdf}>
						Download <i className='fa fa-download ml-1' aria-hidden='true' />
					</button>
				)}
			</ReactToPdf>

			<div ref={ref} className='my-2'>
				{renderPDF(props)}
			</div>
		</React.Fragment>
	);
};

export default AttendancePDF;
