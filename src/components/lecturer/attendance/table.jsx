import React, { Component } from 'react';
import axios from 'axios';
import renderData from '../../common/progressBar';
import { baseURL } from '../../../baseURL';

class AttendanceTable extends Component {
	state = { present: [], total: [], students: [], lecture: '' };

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) this.loadData();
	}

	loadData = async () => {
		const { code, date } = this.props;

		try {
			const { data: course } = await axios.get(`${baseURL}/courses/${code}`);

			const { data: total } = await axios.get(
				`${baseURL}/users?role=student&code=${code}`
			);

			const { data: present } = await axios.post(
				`${baseURL}/attendance/${code}`,
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
	};

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
