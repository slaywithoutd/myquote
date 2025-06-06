const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async getAll() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    let client;
    try {
      client = await db.connect();
      await client.query('BEGIN');

      if (!data || !data.username || !data.email || !data.password) {
        throw new Error('Dados inválidos');
      }

      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);

      // Check if email exists
      const existingUser = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [data.email]
      );
      if (existingUser.rows.length > 0) {
        throw new Error('Email já cadastrado');
      }

      // Check if username exists
      const existingUsername = await client.query(
        'SELECT * FROM users WHERE username = $1',
        [data.username]
      );
      if (existingUsername.rows.length > 0) {
        throw new Error('Nome de usuário já existe');
      }

      // Create user
      const result = await client.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [data.username, data.email, data.password]
      );

      await client.query('COMMIT');
      return result.rows[0];

    } catch (error) {
      if (client) await client.query('ROLLBACK');
      throw error;
    } finally {
      if (client) client.release();
    }
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
      [data.username, data.email, id]
    );
    return result.rows[0];
  }

  static async deleteUser(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  static async getByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }
}

module.exports = User;
