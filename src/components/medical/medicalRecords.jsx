import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import Loading from '../common/loading';
import MedicalTable from './medicalTable';

import { Breadcrumb } from 'react-bootstrap';

class MedicalRecords extends Component {
	state = { records: [], filtered: [], loading: true };

	async componentDidMount() {
		const { data: records } = await axios.get(`/api/medicals`);
		records.sort((a, b) => (moment(a).isSameOrAfter(b) ? 1 : -1));
		this.setState({ records, loading: false });
	}

	renderBreadCrumbs() {
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Medical Records</Breadcrumb.Item>
			</Breadcrumb>
		);
	}

	handleSearchBox = ({ currentTarget: { value: index } }) => {
		const { records } = this.state;
		let filtered = [];
		if (index) {
			console.log(index);
			filtered = records.filter(record => record.index._id.includes(index));
		}
		this.setState({ filtered });
	};

	renderSearchBox() {
		return (
			<form className='form-inline justify-content-end d-flex md-form form-sm my-2'>
				<i className='fa fa-search' aria-hidden='true' />
				<input
					className='form-control form-control-sm ml-2'
					type='text'
					name='search'
					placeholder='Search Index'
					aria-label='Search Index'
					onChange={this.handleSearchBox}
				/>
			</form>
		);
	}

	getRecords() {
		const { records, filtered } = this.state;
		return filtered.length > 0 ? filtered : records;
	}

	render() {
		const { loading } = this.state;

		return (
			<React.Fragment>
				{!this.props.user.id && <Redirect to='/login' />}
				{loading ? (
					<Loading />
				) : (
					<React.Fragment>
						{this.renderBreadCrumbs()}
						<div>
							<div className='jumbotron pt-4'>
								<h1 className='text-center mb-2 dissplay-4'>Medical Records</h1>
								{this.renderSearchBox()}
								<MedicalTable records={this.getRecords()} />
							</div>
						</div>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

export default MedicalRecords;
