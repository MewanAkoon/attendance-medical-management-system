const medicalRecords = [
  {
    id: 1,
    index: 'sc10266',
    reason: 'Hypertension'
  },
  {
    id: 2,
    index: 'sc10262',
    reason: 'Anxiety'
  },
  {
    id: 3,
    index: 'sc10264',
    reason: 'Back pain'
  },
];

const getMedicalRecords = () => medicalRecords;

const getMedicalRecord = index => medicalRecords.find(m => m.index === index);

module.exports = { getMedicalRecords, getMedicalRecord };
