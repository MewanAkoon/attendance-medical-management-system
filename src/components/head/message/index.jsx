import React, { Component } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Messages extends Component {
	state = { requests: [], count: 0, watched: false };

	async componentDidMount() {
		try {
			const { data: requests } = await axios.get('/api/submitMedical');
			const count = requests.length || 0;
			this.setState({ requests, count });
		} catch (err) {
			console.log(err);
		}
	}

	getMessageIcon = () => {
		const { count, watched } = this.state;
		return (
			<React.Fragment>
				<i className='text-white fa fa-heartbeat' aria-hidden='true' />
				{count > 0 && !watched && (
					<span className='icon-badge-head'>{count}</span>
				)}
			</React.Fragment>
		);
	};

	renderRequests = () => {
		const { requests } = { ...this.state };

		return requests.map(r => (
			<div key={r._id} className='alert alert-secondary mb-2 py-1'>
				<small>
					<span className='font-weight-bold'>Medical ID</span>: {r._id}
				</small>
				<div>
					<small>
						<span className='font-weight-bold'>Student ID</span>: {r.index._id}
					</small>
				</div>
				<Link
					to={`/view/medicalRequests/?selectedReqId=${r._id}`}
					className='ml-auto'>
					<small>View Request</small>
				</Link>
			</div>
		));
	};

	renderMessage = () => {
		return (
			<div>
				{this.renderRequests()}
				<div className='text-center'>
					<hr className='mb-1 w-75' />
					{this.renderViewAllButton()}
				</div>
			</div>
		);
	};

	renderNoMessages = () => (
		<div className='text-muted text-center mt-4'>
			You have no medical submission requests.
		</div>
	);

	renderViewAllButton = () => {
		return <Link to='/view/medicalRequests'>View all Requests</Link>;
	};

	render() {
		return (
			<NavDropdown
				onClick={() => this.setState({ watched: true })}
				title={this.getMessageIcon()}
				id='dropdown-navbar'>
				<div className='px-4 py-1' style={{ width: 400, minHeight: 150 }}>
					<p className='text-dark m-0'>Medical Requests</p>
					<hr className='my-2' />
					{this.state.count > 0
						? this.renderMessage()
						: this.renderNoMessages()}
				</div>
			</NavDropdown>
		);
	}
}

export default Messages;
