const users = [
  {
    id: 'sc10266',
    firstName: 'SC/2017/10266',
    username: 'Pabasara',
    cityOrTown: 'Galle',
    country: 'Sri lanka',
    role: 'student',
    password: '12345678',
    courses: ['CSC2233', 'CSC2263', 'CSC2272']
  },
  {
    id: 'sc10264',
    firstName: 'SC/2017/10264',
    username: 'Yapa',
    cityOrTown: 'Matara',
    country: 'Sri lanka',
    role: 'student',
    password: '12345678',
    courses: ['CSC2233', 'CSC2252', 'CSC2272']
  },
  {
    id: 'sc10262',
    firstName: 'SC/2017/10262',
    username: 'Hemathilaka',
    cityOrTown: 'Kurunagala',
    country: 'Sri lanka',
    role: 'student',
    password: '12345678',
    courses: ['CSC2233', 'CSC2263', 'CSC2272', 'CSC2213']
  },
  {
    id: 'admin1',
    firstName: 'Damitha',
    username: 'Amarakoon',
    cityOrTown: 'Welimada',
    country: 'Sri lanka',
    role: 'admin',
    password: '12345678'
  },
  {
    id: 'med1',
    firstName: 'John',
    username: 'Doe',
    cityOrTown: 'Matara',
    country: 'Sri lanka',
    role: 'medical',
    password: '12345678',
  }
];

const getUsers = () => users;

const getUser = (id, role) => {
  const user = users.find(user => user.id === id);
  if (role) return user.role === role ? user : undefined;
  return user;
}

module.exports = { getUsers, getUser };