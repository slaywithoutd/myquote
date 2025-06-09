const db = require("../config/db");

class Topic {
  static async getAll() {
    try {
      console.log('Starting to fetch topics...');

      // First check if database is healthy
      const isHealthy = await db.healthCheck();
      if (!isHealthy) {
        throw new Error("Database connection is not healthy");
      }

      // Use a simpler query first to get topics, then get quotes separately if needed
      const result = await db.query(`
        SELECT
          t.id,
          t.name,
          COUNT(qt.quote_id) as quote_count
        FROM topics t
        LEFT JOIN quote_topic qt ON t.id = qt.topic_id
        GROUP BY t.id, t.name
        ORDER BY t.name ASC
      `);

      console.log(`Successfully fetched ${result.rows.length} topics`);
      return result.rows;
    } catch (error) {
      console.error('Error in Topic.getAll():', error);

      // If it's a timeout error, provide more specific message
      if (error.message.includes('timeout') || error.message.includes('connection')) {
        throw new Error("Database connection timeout - please try again");
      }

      throw new Error("Error fetching topics: " + error.message);
    }
  }

  // Method to get topics with their quotes (for detailed view)
  static async getAllWithQuotes() {
    try {
      console.log('Fetching topics with quotes...');

      const result = await db.query(`
        SELECT
          t.*,
          COALESCE(json_agg(
              json_build_object(
                  'id', q.id,
                  'text', q.text,
                  'author', a.name
              )
          ) FILTER (WHERE q.id IS NOT NULL), '[]') as quotes
        FROM topics t
        LEFT JOIN quote_topic qt ON t.id = qt.topic_id
        LEFT JOIN quotes q ON qt.quote_id = q.id
        LEFT JOIN authors a ON q.author_id = a.id
        GROUP BY t.id
        ORDER BY t.name ASC
      `);

      return result.rows;
    } catch (error) {
      console.error('Error in Topic.getAllWithQuotes():', error);
      throw new Error("Error fetching topics with quotes: " + error.message);
    }
  }

  static async getById(id) {
    try {
      const result = await db.query("SELECT * FROM topics WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error fetching topic: " + error.message);
    }
  }

  static async create(data) {
    try {
      const result = await db.query(
        "INSERT INTO topics (name) VALUES ($1) RETURNING *",
        [data.name]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Error creating topic: " + error.message);
    }
  }

  static async update(id, data) {
    try {
      // First check if topic exists
      const checkResult = await db.query(
        "SELECT id FROM topics WHERE id = $1",
        [id]
      );

      if (checkResult.rows.length === 0) {
        throw new Error("Tópico não encontrado");
      }

      // Then attempt update
      const result = await db.query(
        "UPDATE topics SET name = $1 WHERE id = $2 RETURNING *",
        [data.name, id]
      );

      return result.rows[0];
    } catch (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        throw new Error("Já existe um tópico com este nome");
      }
      if (error.code === "22P02") {
        // Invalid input syntax for type
        throw new Error("ID de tópico inválido");
      }
      throw new Error(`Erro ao atualizar tópico: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const result = await db.query(
        "DELETE FROM topics WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Error deleting topic: " + error.message);
    }
  }
}

module.exports = Topic;
