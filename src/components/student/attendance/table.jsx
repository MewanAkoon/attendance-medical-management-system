import React, { Component } from 'react';
import axios from 'axios';
// import moment from 'moment';

class AttendanceTable extends Component {
	state = { present: [], total: [], students: [] };

	async componentDidMount() {
		const { code, date } = this.props;

		try {
			const { data: total } = await axios.get(
				`http://localhost:9000/api/users?role=student&code=${code}`
			);

			const { data: present } = await axios.post(
				`http://localhost:9000/api/attendance/${code}`,
				{
					date
				}
			);

			const students = present.map(p => p.student._id);

			this.setState({ present, total, students });
		} catch (err) {
			console.error(err.message);
		}
	}

	isPresent = student => {
		return this.state.students.includes(student);
	};

	// getTime = data => moment(data, 'YYYY:MM:DD HH:mm:ss').format('hh:mm:ss');

	render() {
		const { present, total: records } = this.state;

		return (
			<div className='jumbotron pt-4'>
				<div className='alert alert-primary'>
					<small>
						Total Present: {present.length}/{records.length}
					</small>
				</div>

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
