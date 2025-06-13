const sql = require('mssql/msnodesqlv8');

// Database configuration object for connecting to SQL Server
const config = {
    // Connection string specifying driver, server, database, and authentication details
    connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-*******;Database=URL;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
    options: {
        // Option to trust the server certificate (useful for development or self-signed certs)
        trustServerCertificate: true
    }
};

/**
 * Asynchronously connects to the database using the provided configuration.
 * Logs a success message upon successful connection, or logs an error if the connection fails.
 * Intended as an entry point for performing database queries after establishing a connection.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the connection attempt is complete.
 */
// async function connectToDatabase() {
//     try {
//         await sql.connect(config);
//         console.log('Connected to database');
//         // Perform queries here
//     } catch (err) {
//         console.error('Error connecting to database:', err);
//     }
// }

// connectToDatabase();

async function insertRows() {
  try {
    // Connect to DB
    await sql.connect(config);
    
    for (let i = 1; i <= 1000; i++) {
      const originalUrl = `https://example.com/page${i}`;
      const shortCode = `code${i}`;
      
      await sql.query`
        INSERT INTO url_shortener (original_url, short_code)
        VALUES (${originalUrl}, ${shortCode})
      `;
      
      if (i % 100 === 0) {
        console.log(`${i} rows inserted...`);
      }
    }
    
    console.log('Finished inserting 1000 rows.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sql.close();
  }
}

insertRows();
