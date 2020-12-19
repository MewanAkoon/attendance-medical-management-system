import React, { Component } from 'react';
import axios from 'axios';
import renderData from '../../common/progressBar';

class AttendanceTable extends Component {
	state = { present: [], total: [], students: [], lecture: '' };

	async componentDidMount() {
		const { code, date } = this.props;

		try {
			const { data: course } = await axios.get(
				`http://localhost:9000/api/courses/${code}`
			);

			const { data: total } = await axios.get(
				`http://localhost:9000/api/users?role=student&code=${code}`
			);

			const { data: present } = await axios.post(
				`http://localhost:9000/api/attendance/${code}`,
				{
					date
				}
			);

			// lecture name for the current date
			const lecture = course.dates.filter(d => d.date === date)[0].lecture;

			const students = present.map(p => p.student._id);

			this.setState({ present, total, students, lecture });
		} catch (err) {
			console.error(err.message);
		}
	}

	isPresent = student => {
		return this.state.students.includes(student);
	};

	renderLectureDetails = () => {
		return (
			<p className='lead text-dark' style={{ cursor: 'default' }}>
				<i className='fa fa-pencil-square-o mr-2' aria-hidden='true' />
				{this.state.lecture}
			</p>
		);
	};

	render() {
		const { present, total: records } = this.state;

		return (
			<div className='jumbotron py-4'>
				{renderData(present.length, records.length)}
				{this.renderLectureDetails()}

				<table className='table table-hover table-sm'>
					<thead className='thead-dark'>
						<tr>
							<th>Index</th>
							<th>Name</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{records.map(r => (
							<tr key={r._id}>
								<td>{r.firstName}</td>
								<td>{r.username}</td>
								<td>
									{this.isPresent(r._id) ? (
										<i className='fa fa-check-square-o' aria-hidden='true'></i>
									) : (
										<i className='fa fa-square-o' aria-hidden='true'></i>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default AttendanceTable;
