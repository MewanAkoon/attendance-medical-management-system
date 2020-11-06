const users = [
  {
    id: 1,
    firstName: 'SC/2017/10265',
    surname: 'Mewan',
    cityOrTown: 'Welimada',
    country: 'Sri lanka',
    role: ['admin', 'student']
  },
  {
    id: 2,
    firstName: 'SC/2017/10266',
    surname: 'Pabasara',
    cityOrTown: 'Galle',
    country: 'Sri lanka',
    role: ['student']
  },
  {
    id: 3,
    firstName: 'SC/2017/10264',
    surname: 'Yapa',
    cityOrTown: 'Matara',
    country: 'Sri lanka',
    role: ['student']
  },
  {
    id: 4,
    firstName: 'SC/2017/10262',
    surname: 'Hemathilaka',
    cityOrTown: 'Kurunagala',
    country: 'Sri lanka',
    role: ['student']
  },
];

const getUsers = () => users;

module.exports = { getUsers };