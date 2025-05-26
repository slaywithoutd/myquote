const db = require('../config/db');

class Author {
  static async getAll() {
    const result = await db.query('SELECT * FROM authors');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO authors (name, nationality, bio) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.nationality, data.bio]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE authors SET name = $1, nationality = $2, bio = $3 WHERE id = $4 RETURNING *',
      [data.name, data.nationality, data.bio, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Author;
