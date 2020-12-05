const medicalRecords = [];

const getMedicalRecords = () => medicalRecords;

const getMedicalRecord = index => medicalRecords.find(m => m.index === index);

const addMedicalRecord = record => medicalRecords.push(record);

module.exports = { getMedicalRecords, getMedicalRecord, addMedicalRecord };
