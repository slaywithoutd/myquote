const db = require('../config/db');

class Author {
  static async getAll() {
    try {
      const result = await db.query('SELECT * FROM authors ORDER BY name ASC');
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching authors: ' + error.message);
    }
  }

  static async getById(id) {
    try {
      const result = await db.query('SELECT * FROM authors WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error fetching author: ' + error.message);
    }
  }

  static async create(data) {
    try {
      const result = await db.query(
        'INSERT INTO authors (name, nationality, bio) VALUES ($1, $2, $3) RETURNING *',
        [data.name, data.nationality || null, data.bio || null]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating author: ' + error.message);
    }
  }

  static async update(id, data) {
    try {
      const result = await db.query(
        'UPDATE authors SET name = $1, nationality = $2, bio = $3 WHERE id = $4 RETURNING *',
        [data.name, data.nationality || null, data.bio || null, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error updating author: ' + error.message);
    }
  }

  static async delete(id) {
    try {
      const result = await db.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error deleting author: ' + error.message);
    }
  }

  static async getAllWithQuotes() {
    try {
      const result = await db.query(`
            SELECT 
                a.id,
                a.name,
                a.nationality,
                a.bio,
                COALESCE(
                    ARRAY_AGG(
                        DISTINCT jsonb_build_object(
                            'id', q.id,
                            'text', q.text,
                            'created_at', q.created_at,
                            'topics', (
                                SELECT COALESCE(
                                    json_agg(
                                        jsonb_build_object(
                                            'id', t.id,
                                            'name', t.name
                                        )
                                    ),
                                    '[]'::json
                                )
                                FROM quote_topic qt
                                JOIN topics t ON qt.topic_id = t.id
                                WHERE qt.quote_id = q.id
                            )
                        )
                    ) FILTER (WHERE q.id IS NOT NULL),
                    '{}'::json[]
                ) as quotes
            FROM authors a
            LEFT JOIN quotes q ON q.author_id = a.id
            GROUP BY a.id, a.name, a.nationality, a.bio
            ORDER BY a.name ASC;
        `);
      
      console.log('Query result:', result.rows);
      return result.rows;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
}

module.exports = Author;
