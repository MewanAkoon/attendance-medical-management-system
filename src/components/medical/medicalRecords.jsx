import React, { Component } from 'react';
import axios from 'axios';
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

	render() {
		const { records, loading } = this.state;
		return loading ? <Loading /> : <MedicalTable records={records} />;
	}
}

export default MedicalRecords;
