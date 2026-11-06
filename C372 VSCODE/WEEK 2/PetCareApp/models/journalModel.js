const connection = require('../config/db');

function getJournalsForSelectedPet(userId, selectedPetId, callback) {
  const sql = `
    SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image 
    FROM journal 
    JOIN pets ON journal.pet_id = pets.id 
    WHERE pets.owner_id = ? AND pets.id = ?
  `;
  connection.query(sql, [userId, selectedPetId], callback);
}

function getJournalsForOwner(userId, callback) {
  const sql = `
    SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image 
    FROM journal 
    JOIN pets ON journal.pet_id = pets.id 
    WHERE pets.owner_id = ?
  `;
  connection.query(sql, [userId], callback);
}

function getAdminUserJournalDetails(userId, callback) {
  const sql = `
    SELECT journal.*, pets.id AS pet_id
    FROM journal
    JOIN pets ON journal.pet_id = pets.id
    WHERE pets.owner_id = ?
  `;
  connection.query(sql, [userId], callback);
}

function createJournal({ pet_id, activity, notes, entry_date }, callback) {
  const sql = 'INSERT INTO journal (pet_id, activity, notes, entry_date) VALUES (?, ?, ?, ?)';
  connection.query(sql, [pet_id, activity, notes, entry_date], callback);
}

function getJournalById(journalId, callback) {
  const sql = 'SELECT * FROM journal WHERE id = ?';
  connection.query(sql, [journalId], callback);
}

function updateJournal({ entry_date, activity, notes, pet_id, journalId }, callback) {
  const sql = 'UPDATE journal SET entry_date = ?, activity = ?, notes = ?, pet_id = ? WHERE id = ?';
  connection.query(sql, [entry_date, activity, notes, pet_id, journalId], callback);
}

function getPetIdForJournal(journalId, callback) {
  const sql = 'SELECT pet_id FROM journal WHERE id = ?';
  connection.query(sql, [journalId], callback);
}

function deleteJournalById(journalId, callback) {
  const sql = 'DELETE FROM journal WHERE id = ?';
  connection.query(sql, [journalId], callback);
}

function searchJournals(userId, searchQuery, selectedPetId, callback) {
  let sql = `
    SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image 
    FROM journal 
    JOIN pets ON journal.pet_id = pets.id 
    WHERE pets.owner_id = ? AND (journal.activity LIKE ? OR journal.notes LIKE ?)`;

  const params = [userId, searchQuery, searchQuery];

  if (selectedPetId) {
    sql += ' AND pets.id = ?';
    params.push(selectedPetId);
  }

  connection.query(sql, params, callback);
}

module.exports = {
  getJournalsForSelectedPet,
  getJournalsForOwner,
  getAdminUserJournalDetails,
  createJournal,
  getJournalById,
  updateJournal,
  getPetIdForJournal,
  deleteJournalById,
  searchJournals
};
