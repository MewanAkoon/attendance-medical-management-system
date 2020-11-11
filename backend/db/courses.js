const courses = [
  {
    code: 'CSC2213',
    name: 'Rapid Application Development'
  },
  {
    code: 'CSC2222',
    name: 'Computer Systems 2'
  },
  {
    code: 'CSC2233',
    name: 'Internet Programming'
  },
  {
    code: 'CSC2242',
    name: 'Advanced Database Management'
  },
  {
    code: 'CSC2252',
    name: 'Project Management'
  },
  {
    code: 'CSC2263',
    name: 'Multimedia and Video Production'
  },
  {
    code: 'CSC2272',
    name: 'Data and Network Security'
  }
];

const getCourses = () => courses;

const getCourse = code => courses.find(c => c.code === code);

module.exports = { getCourses, getCourse };