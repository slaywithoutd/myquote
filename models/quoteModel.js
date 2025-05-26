const db = require("../config/db");

class Quote {
  static async getAll() {
    const result = await db.query("SELECT * FROM quotes");
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query("SELECT * FROM quotes WHERE id = $1", [id]);
    return result.rows[0];
  }

  /*
CREATE TABLE quotes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      text TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id UUID NOT NULL REFERENCES users(id),
      author_id UUID NOT NULL REFERENCES authors(id)
  
*/

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
}

module.exports = Quote;
