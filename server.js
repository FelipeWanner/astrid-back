require('dotenv').config(); // this is to use ".env" here 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());


// Enable CORS, it´s a security thing, google it
app.use(cors({ origin: 'http://localhost:3000' }));


// Database connection with our .env information!
// the connection will not work if you dont create the .env i´ve sent you on whatsapp!
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the application if the connection fails
  }
  console.log('Connected YEEEEEEEEY.');
});

// Route to get activities for a user
app.get('/api/activities/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM activities WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// Start the server
const PORT = 4000; // Backend server port to 4000, IT MUST MATCH THE ONE IN THE REACT APLICATION! 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
