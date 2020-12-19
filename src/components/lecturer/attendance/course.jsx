import axios from 'axios';
import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import Dates from './dates';

class Course extends Component {
	state = { course: {} };

	async componentDidMount() {
		try {
			const { data } = await axios.get(
				`http://localhost:9000/api/courses/${this.props.course}`
			);

			const course = {
				code: data.code,
				name: data.name,
				dates: data.dates
			};

			this.setState({ course });
		} catch (err) {
			console.log(err.message);
		}
	}

	render() {
		const { code, name, dates } = this.state.course;
		return (
			<React.Fragment>
				<Accordion.Toggle
					as={Card.Header}
					className='text-center text-primary'
					onClick={() => this.props.onCourseSelect(code)}
					eventKey={code}>
					{`${name} (${code})`}
				</Accordion.Toggle>
				{dates && dates.length > 0 && (
					<Accordion.Collapse eventKey={code}>
						<Card.Body className='p-0'>
							<Dates
								onDateSelect={this.props.onDateSelect}
								selectedDate={this.props.selectedDate}
								dates={dates}
							/>
						</Card.Body>
					</Accordion.Collapse>
				)}
			</React.Fragment>
		);
	}
}

export default Course;
