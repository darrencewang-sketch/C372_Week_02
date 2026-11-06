const connection = require('../config/db');

function createPet({ ownerId, pet_name, species, breed, age, petImage }, callback) {
  const sql = 'INSERT INTO pets (owner_id, name, species, breed, age, image) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [ownerId, pet_name, species, breed, age, petImage], callback);
}

function getPetsByOwnerId(userId, callback) {
  const sql = 'SELECT * FROM pets WHERE owner_id = ?';
  connection.query(sql, [userId], callback);
}

function getPetDetailsForAdminUser(userId, callback) {
  const sql = 'SELECT * FROM pets WHERE owner_id = ?';
  connection.query(sql, [userId], callback);
}

module.exports = {
  createPet,
  getPetsByOwnerId,
  getPetDetailsForAdminUser
};
