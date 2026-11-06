const connection = require('../config/db');

function createUser({ username, password, name, role }, callback) {
  const sql = 'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)';
  connection.query(sql, [username, password, name, role], callback);
}

function getUserByCredentials(username, hashedPassword, callback) {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, hashedPassword], callback);
}

function getAllUsers(callback) {
  const sql = 'SELECT id, name, username, role FROM users';
  connection.query(sql, callback);
}

function getUserById(userId, callback) {
  const sql = 'SELECT id, name, username, role FROM users WHERE id = ?';
  connection.query(sql, [userId], callback);
}

function deleteUserById(userId, callback) {
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [userId], callback);
}

module.exports = {
  createUser,
  getUserByCredentials,
  getAllUsers,
  getUserById,
  deleteUserById
};
