import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../../common/loading';
import Course from './course';
import { baseURL } from '../../../baseURL';
import { Breadcrumb } from 'react-bootstrap';

class Courses extends Component {
	state = {
		courses: [],
		loading: true
	};

	async componentDidMount() {
		const { courses: userCourses } = this.props.user;

		const courses = [];

		if (userCourses)
			for (let i = 0; i < userCourses.length; i++) {
				const { data } = await axios.get(
					`${baseURL}/courses/${userCourses[i]}`
				);
				courses.push(data);
			}

		this.setState({ courses, loading: false });
	}

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item active>Home</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	render() {
		const { courses, loading } = this.state;
		return loading ? (
			<Loading />
		) : (
			courses.length > 0 && (
				<div>
					{this.renderBreadCrumbs()}
					<div className='card'>
						<div className='card-header'>Course Overview</div>
						<div className='card-body'>
							{courses.map(c => (
								<Course key={c.code} course={c} />
							))}
						</div>
					</div>
				</div>
			)
		);
	}
}

export default Courses;
