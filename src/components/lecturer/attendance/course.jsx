import axios from 'axios';
import React, { Component } from 'react';
import Dates from './dates';
import { Accordion, Card } from 'react-bootstrap';

class Course extends Component {
	state = { course: {} };

	async componentDidMount() {
		try {
			const { data } = await axios.get(`/api/courses/${this.props.course}`);

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
		const { onChange, onCourseSelect, selectedDate } = this.props;
		return (
			<React.Fragment>
				<Accordion.Toggle
					as={Card.Header}
					className='text-center text-primary'
					onClick={onCourseSelect}
					eventKey={code}>
					{`${name} (${code})`}
				</Accordion.Toggle>
				{dates && dates.length > 0 && (
					<Accordion.Collapse eventKey={code}>
						<Card.Body className='p-0'>
							<Dates
								course={code}
								dates={dates}
								onChange={onChange}
								selectedDate={selectedDate}
							/>
						</Card.Body>
					</Accordion.Collapse>
				)}
			</React.Fragment>
		);
	}
}

export default Course;
