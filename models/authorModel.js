const db = require("../config/db");

class Author {
  static async getAll() {
    try {
      console.log('Starting to fetch authors...');

      // First check if database is healthy
      const isHealthy = await db.healthCheck();
      if (!isHealthy) {
        throw new Error("Database connection is not healthy");
      }

      // Use a simpler query first to get authors, then get quotes separately if needed
      const result = await db.query(`
        SELECT
          a.id,
          a.name,
          a.nationality,
          a.bio,
          COUNT(q.id) as quote_count
        FROM authors a
        LEFT JOIN quotes q ON a.id = q.author_id
        GROUP BY a.id, a.name, a.nationality, a.bio
        ORDER BY a.name ASC
      `);

      console.log(`Successfully fetched ${result.rows.length} authors`);
      return result.rows;
    } catch (error) {
      console.error('Error in Author.getAll():', error);

      // If it's a timeout error, provide more specific message
      if (error.message.includes('timeout') || error.message.includes('connection')) {
        throw new Error("Database connection timeout - please try again");
      }

      throw new Error("Error fetching authors: " + error.message);
    }
  }

  // Method to get authors with their quotes (for detailed view)
  static async getAllWithQuotes() {
    try {
      console.log('Fetching authors with quotes...');

      const result = await db.query(`SELECT
        a.*,
        COALESCE(json_agg(
            json_build_object(
              'id', q.id,
              'text', q.text,
              'author', a.name
            )
          ) FILTER (WHERE q.id IS NOT NULL), '[]') as quotes
        FROM authors a
        LEFT JOIN quotes q ON a.id = q.author_id
        GROUP BY a.id
        ORDER BY a.name ASC`);

      return result.rows;
    } catch (error) {
      console.error('Error in Author.getAllWithQuotes():', error);
      throw new Error("Error fetching authors with quotes: " + error.message);
    }
  }

  static async getById(id) {
    try {
      const result = await db.query("SELECT * FROM authors WHERE id = $1", [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error fetching author: " + error.message);
    }
  }

  static async create(data) {
    try {
      const result = await db.query(
        "INSERT INTO authors (name, nationality, bio) VALUES ($1, $2, $3) RETURNING *",
        [data.name, data.nationality || null, data.bio || null]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Error creating author: " + error.message);
    }
  }

  static async update(id, data) {
    try {
      const result = await db.query(
        "UPDATE authors SET name = $1, nationality = $2, bio = $3 WHERE id = $4 RETURNING *",
        [data.name, data.nationality || null, data.bio || null, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Error updating author: " + error.message);
    }
  }

  static async delete(id) {
    try {
      const result = await db.query(
        "DELETE FROM authors WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Error deleting author: " + error.message);
    }
  }
}

module.exports = Author;
