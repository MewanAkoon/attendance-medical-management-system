import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Loading from '../common/loading';
import MedicalTable from './medicalTable';

class MedicalRecords extends Component {
	state = { records: [], loading: true };

	async componentDidMount() {
		const { data: records } = await axios.get(
			'http://localhost:9000/api/medicals'
		);
		this.setState({ records, loading: false });
	}

	componentWillUnmount() {}

	render() {
		const { records, loading } = this.state;

		return (
			<React.Fragment>
				{!this.props.user.id && <Redirect to='/login' />}
				{loading ? <Loading /> : <MedicalTable records={records} />}
			</React.Fragment>
		);
	}
}

export default MedicalRecords;
