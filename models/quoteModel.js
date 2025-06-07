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

      console.log('Query result:', result.rows);

      // Log each quote's data
      result.rows.forEach(quote => {
        console.log('Quote:', {
          id: quote.id,
          text: quote.text,
          author_id: quote.author_id,
          author_name: quote.author_name
        });
      });

      return result.rows;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw new Error('Error fetching quotes: ' + error.message);
    }
  }

  static async getById(id) {
    const result = await db.query("SELECT * FROM quotes WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(data) {
    console.log('Creating quote with data:', data); // Debug log
    const client = await db.connect();
    
    try {
      await client.query('BEGIN');

      // Validate required data
      if (!data.text || !data.author_name || !data.username) {
        console.log('Missing fields:', { 
          text: !!data.text, 
          author_name: !!data.author_name, 
          username: !!data.username 
        }); // Debug log
        throw new Error('Missing required fields');
      }

      // Get user id
      const userResult = await client.query(
        "SELECT id FROM users WHERE username = $1",
        [data.username]
      );

      if (!userResult.rows.length) {
        throw new Error("User not found");
      }
      const user_id = userResult.rows[0].id;

      // Find or create author
      let authorResult = await client.query(
        "SELECT id FROM authors WHERE name ILIKE $1",
        [data.author_name]
      );

      let author_id;
      if (authorResult.rows.length) {
        author_id = authorResult.rows[0].id;
      } else {
        // Create new author
        authorResult = await client.query(
          "INSERT INTO authors (name) VALUES ($1) RETURNING id",
          [data.author_name]
        );
        author_id = authorResult.rows[0].id;
      }

      // Create quote
      const quoteResult = await client.query(
        "INSERT INTO quotes (text, description, user_id, author_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.text, data.description || null, user_id, author_id]
      );

      const quote_id = quoteResult.rows[0].id;

      if (data.topics && data.topics.length > 0) {
        const topicValues = data.topics.map(topic_id => 
          `('${quote_id}', '${topic_id}')`
        ).join(', ');

        if (topicValues) {
          console.log(topicValues); // Debug log
          await client.query(`
            INSERT INTO quote_topic (quote_id, topic_id) 
            VALUES ${topicValues}
          `);
        }
      }

      // Get complete quote data
      const completeQuote = await client.query(`
        SELECT 
          q.*,
          a.name as author_name,
          json_agg(DISTINCT jsonb_build_object('id', t.id, 'name', t.name)) as topics
        FROM quotes q
        JOIN authors a ON q.author_id = a.id
        LEFT JOIN quote_topic qt ON q.id = qt.quote_id
        LEFT JOIN topics t ON qt.topic_id = t.id
        WHERE q.id = $1
        GROUP BY q.id, a.name
      `, [quote_id]);

      await client.query('COMMIT');
      return completeQuote.rows[0];

    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error in quote creation:', error);
      throw error; // Pass the original error
    } finally {
      client.release();
    }
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
        `SELECT 
          a.id as author_id,
          a.name as author_name,
          json_agg(
            DISTINCT jsonb_build_object(
              'id', q.id,
              'text', q.text,
              'created_at', q.created_at,
              'topics', (
                SELECT json_agg(
                  jsonb_build_object(
                    'id', t.id,
                    'name', t.name
                  )
                )
                FROM quote_topic qt
                JOIN topics t ON qt.topic_id = t.id
                WHERE qt.quote_id = q.id
              )
            )
          ) as quotes
        FROM authors a
        LEFT JOIN quotes q ON q.author_id = a.id
        WHERE a.id = $1
        GROUP BY a.id, a.name`,
        [authorId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error fetching quotes by author: ' + error.message);
    }
  }

  static async getByTopic(topicId) {
    try {
      const result = await db.query(
        `SELECT 
          t.id as topic_id,
          t.name as topic_name,
          json_agg(
            DISTINCT jsonb_build_object(
              'id', q.id,
              'text', q.text,
              'created_at', q.created_at,
              'author', jsonb_build_object(
                'id', a.id,
                'name', a.name
              )
            )
          ) as quotes
        FROM topics t
        LEFT JOIN quote_topic qt ON qt.topic_id = t.id
        LEFT JOIN quotes q ON qt.quote_id = q.id
        LEFT JOIN authors a ON q.author_id = a.id
        WHERE t.id = $1
        GROUP BY t.id, t.name`,
        [topicId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error fetching quotes by topic: ' + error.message);
    }
  }
}

module.exports = Quote;
