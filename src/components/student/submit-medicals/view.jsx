import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';

class ViewSubmittedMedicals extends Component {
	state = {};

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>View Submitted Medicals</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	render() {
		return this.renderBreadCrumbs();
	}
}

export default ViewSubmittedMedicals;
