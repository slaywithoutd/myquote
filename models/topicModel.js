const db = require('../config/db');

class Topic {
  static async getAll() {
    const result = await db.query('SELECT * FROM topics');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM topics WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO topics (name) VALUES ($1) RETURNING *',
      [data.name]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE topics SET name = $1 WHERE id = $2 RETURNING *',
      [data.name, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM topics WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Topic;
