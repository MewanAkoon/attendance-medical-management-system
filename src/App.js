import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getLoggedInUserDetails } from './store/login';
import { useSelector } from 'react-redux';
import './css/index.css';

import Home from './components/home';
import Navbar from './components/navbar';
import Login from './components/login';
import NotFound from './components/notFound';
import CurrentCourse from './components/common/course/currentCourse';
import MedicalRecords from './components/medical/medicalRecords';
import Attendance from './components/attendance';
import SubmitMedicalPage from './components/student/submit-medicals';
import ViewSubmittedMedicals from './components/student/submit-medicals/view';
import ViewAllRequests from './components/head/message/viewAll';

const App = () => {
  const user = useSelector(getLoggedInUserDetails);

  let navClasses = 'navbar navbar-expand-sm navbar-dark bg-';
  navClasses += user.role === 'medical' ? 'success' : user.role === 'head' | 'admin' ? 'danger' : 'primary';

  return (
    <React.Fragment>
      <div className={ navClasses }>
        <div className='container'>
          <Navbar { ...user } />
        </div>
      </div>
      <div className='container mt-3'>
        <Switch>
          <Route path='/view/medicalRequests' render={ props => <ViewAllRequests user={ user } { ...props } /> } />
          <Route path='/view/medicals/:id' render={ props => <ViewSubmittedMedicals user={ user } { ...props } /> } />
          <Route path='/absent/' render={ props => <SubmitMedicalPage user={ user } { ...props } /> } />
          <Route path='/attendance' render={ props => <Attendance user={ user } { ...props } /> } />
          <Route path='/medical/records' render={ props => <MedicalRecords user={ user } { ...props } /> } />
          <Route path='/courses/:code' render={ props => <CurrentCourse user={ user } { ...props } /> } />
          <Route path='/not-found' component={ NotFound } />
          <Route
            path='/login'
            render={ props => <Login user={ user } { ...props } /> }
          />
          <Route
            path='/home'
            render={ props => <Home user={ user } { ...props } /> }
          />
          <Redirect from='/' exact to={ user.id ? '/home' : '/login' } />
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
