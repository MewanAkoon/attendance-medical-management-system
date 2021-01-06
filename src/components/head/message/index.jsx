import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';

class Messages extends Component {
	state = {};

	async componentDidMount() {
		try {
			await this.renderData();
			this.loadMessages();
		} catch (err) {
			console.error(err.message);
		}
	}

	renderData = async () => {};

	loadMessages = () => {};

	getMessageIcon = () => {
		const { count, watched } = this.state;
		return (
			<React.Fragment>
				<i className='text-white fa fa-envelope' aria-hidden='true' />
				{count > 0 && !watched && <span className='icon-badge'>{count}</span>}
			</React.Fragment>
		);
	};

	renderMessage = () => {};

	renderNoMessages = () => (
		<div className='text-muted text-center mt-4'>You have no messages.</div>
	);

	render() {
		return (
			<NavDropdown
				onClick={() => this.setState({ watched: true })}
				title={this.getMessageIcon()}
				id='dropdown-navbar'>
				<div className='px-4 py-1' style={{ width: 400, minHeight: 150 }}>
					<p className='text-dark m-0'>Messages</p>
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
