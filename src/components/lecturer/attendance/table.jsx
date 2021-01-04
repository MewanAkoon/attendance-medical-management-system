import React, { Component } from 'react';
import axios from 'axios';
import renderData from '../../common/progressBar';
import AttendancePDF from './attendancePDF';

class AttendanceTable extends Component {
	state = {
		present: [],
		total: [],
		students: [],
		lecture: '',
		date: '',
		course: {},
		pdfData: {}
	};

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) this.loadData();
	}

	loadData = async () => {
		const { code, date } = this.props;

		try {
			const { data: course } = await axios.get(`/api/courses/${code}`);

			const { data: total } = await axios.get(
				`/api/users?role=student&code=${code}`
			);

			const { data: present } = await axios.post(`/api/attendance/${code}`, {
				date
			});

			// lecture name for the current date
			const lecture = course.dates.filter(d => d.date === date)[0].lecture;

			const students = present.map(p => p.student._id);

			this.setState({
				present,
				total,
				students,
				lecture,
				date,
				course,
				pdfData: {}
			});
		} catch (err) {
			console.error(err.message);
		}
	};

	generatePdf = async () => {
		const {
			total: records,
			course: { code, name, lecturer },
			date,
			lecture
		} = this.state;

		const items = records.map(r => [
			r.firstName,
			r.username,
			this.isPresent(r._id)
		]);

		const data = {
			headers: ['Index Number', 'Name', 'Status'],
			items,
			course: { code, name, lecturer },
			date,
			lecture
		};

		this.setState({ pdfData: data });
	};

	renderDownloadPdfButton = () => (
		<button className='btn btn-primary w-100' onClick={this.generatePdf}>
			<small>
				GENERATE PDF <i className='fa fa-download ml-1' aria-hidden='true' />
			</small>
		</button>
	);

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
		const { present, total: records, pdfData } = this.state;

		return !pdfData.items ? (
			<div className='jumbotron py-4'>
				{renderData(present.length, records.length)}

				<div className='row justify-content-between'>
					<div className='col-9'>{this.renderLectureDetails()}</div>
					<div className='col'>{this.renderDownloadPdfButton()}</div>
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
		) : (
			<AttendancePDF {...pdfData} />
		);
	}
}

export default AttendanceTable;
