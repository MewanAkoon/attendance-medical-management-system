import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Breadcrumb } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ViewSelectedMedical from './viewSelectedMedical';

class ViewAllRequests extends Component {
	state = { requests: [], count: 0, selectedRequestId: '' };

	async componentDidMount() {
		try {
			const selectedRequestId = queryString.parse(this.props.location.search)
				.selectedReqId;

			const { data: requests } = await axios.get('/api/submitMedical');

			this.setState({
				requests,
				count: requests.length || 0,
				selectedRequestId
			});
		} catch (err) {
			console.log(err);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			if (!this.props.user.id) this.redirectToHome();
			if (prevProps.location.search !== this.props.location.search) {
				const selectedRequestId = queryString.parse(this.props.location.search)
					.selectedReqId;
				this.setState({ selectedRequestId });
			}
		}
	}

	renderBreadCrumbs = () => {
		const { selectedRequestId } = this.state;
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item
					href='/view/medicalRequests/'
					active={!selectedRequestId}>
					All Medicals Requests
				</Breadcrumb.Item>
				<Breadcrumb.Item
					active={selectedRequestId}
					disabled={!selectedRequestId}>
					{selectedRequestId}
				</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	renderNoRequests = () => {
		return (
			<div className='jumbotron text-center'>
				No Medical Requests to display...
			</div>
		);
	};

	renderRecords = () => {
		const { requests, selectedRequestId } = this.state;

		return selectedRequestId ? (
			<ViewSelectedMedical records={requests} selectedId={selectedRequestId} />
		) : (
			this.renderRecordsTable()
		);
	};

	renderRecordsTable = () => {
		const { requests } = this.state;

		return (
			<React.Fragment>
				<table className='table'>
					<thead>
						<tr>
							<th>Index Number</th>
							<th>Full Name</th>
							<th>Academic Year</th>
							<th>Medical Certificate Number</th>
							<th>Date Sent</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{requests.map(r => (
							<tr key={r._id}>
								<td>{r.registeredNumber}</td>
								<td>{r.name}</td>
								<td>{r.academicYear}</td>
								<td>{r.mcNumber._id}</td>
								<td>{moment(r.timestamp).format('YYYY:MM:DD HH:mm:ss a')}</td>
								<td>
									<Link to={`/view/medicalRequests/?selectedReqId=${r._id}`}>
										View
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</React.Fragment>
		);
	};

	redirectToHome = () => this.props.history.push('/home');

	render() {
		const { count } = this.state;

		return (
			<React.Fragment>
				{this.renderBreadCrumbs()}
				{count === 0 ? this.renderNoRequests() : this.renderRecords()}
			</React.Fragment>
		);
	}
}

export default ViewAllRequests;
