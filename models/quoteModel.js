const db = require("../config/db");

class Quote {
  static async getAll() {
    try {
      const result = await db.query(`
        SELECT 
          q.*,
          a.name as author_name
        FROM quotes q
        LEFT JOIN authors a ON q.author_id = a.id
        ORDER BY q.created_at DESC
      `);
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching quotes: ' + error.message);
    }
  }

  static async getById(id) {
    const result = await db.query("SELECT * FROM quotes WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(data) {
    const userId = await db.query("SELECT id FROM users WHERE username = $1", [
      data.username,
    ]);
    if (!userId.rows.length) {
      throw new Error("User not found");
    }

    const user_id = userId.rows[0].id;

    var authorId = 0;
    if (data.author_name) {
      const authorResult = await db.query(
        "SELECT id FROM authors WHERE name = $1",
        [data.author_name]
      );

      if (authorResult.rows.length) {
        authorId = authorResult.rows[0].id;
      }
    }

    var result = null;
    if (authorId == 0) {
      result = await db.query(
        "INSERT INTO quotes (text, description, user_id) VALUES ($1, $2, $3) RETURNING *",
        [data.text, data.description, user_id]
      );
    } else {
      result = await db.query(
        "INSERT INTO quotes (text, description, user_id, author_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.text, data.description, user_id, authorId]
      );
    }

    return result.rows[0];
  }

  static async update(id, data) {

    const result = await db.query(
      "UPDATE quotes SET text = $1, description = $2 WHERE id = $3 RETURNING *",
      [data.text, data.description, id]
    );
    
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      "DELETE FROM quotes WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rowCount > 0;
  }

  static async getByAuthor(authorId) {
    try {
      const result = await db.query(
        `SELECT q.*, a.name as author_name, 
          json_agg(json_build_object('id', t.id, 'name', t.name)) as topics
         FROM quotes q
         JOIN authors a ON q.author_id = a.id
         LEFT JOIN quote_topics qt ON q.id = qt.quote_id
         LEFT JOIN topics t ON qt.topic_id = t.id
         WHERE q.author_id = $1
         GROUP BY q.id, a.name
         ORDER BY q.created_at DESC`,
        [authorId]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching quotes by author: ' + error.message);
    }
  }

  static async getByTopic(topicId) {
    try {
      const result = await db.query(
        `SELECT q.*, a.name as author_name
         FROM quotes q
         JOIN authors a ON q.author_id = a.id
         JOIN quote_topics qt ON q.id = qt.quote_id
         WHERE qt.topic_id = $1
         ORDER BY q.created_at DESC`,
        [topicId]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching quotes by topic: ' + error.message);
    }
  }
}

module.exports = Quote;
