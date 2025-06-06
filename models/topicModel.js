const db = require('../config/db');

class Topic {
  static async getAll() {
    try {
      const result = await db.query('SELECT * FROM topics ORDER BY name ASC');
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching topics: ' + error.message);
    }
  }

  static async getById(id) {
    try {
      const result = await db.query('SELECT * FROM topics WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error fetching topic: ' + error.message);
    }
  }

  static async create(data) {
    try {
      const result = await db.query(
        'INSERT INTO topics (name) VALUES ($1) RETURNING *',
        [data.name]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating topic: ' + error.message);
    }
  }

  static async update(id, data) {
    try {
      // First check if topic exists
      const checkResult = await db.query(
        'SELECT id FROM topics WHERE id = $1',
        [id]
      );

      if (checkResult.rows.length === 0) {
        throw new Error('Tópico não encontrado');
      }

      // Then attempt update
      const result = await db.query(
        'UPDATE topics SET name = $1 WHERE id = $2 RETURNING *',
        [data.name, id]
      );
      
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('Já existe um tópico com este nome');
      }
      if (error.code === '22P02') { // Invalid input syntax for type
        throw new Error('ID de tópico inválido');
      }
      throw new Error(`Erro ao atualizar tópico: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const result = await db.query('DELETE FROM topics WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error deleting topic: ' + error.message);
    }
  }
}

module.exports = Topic;
