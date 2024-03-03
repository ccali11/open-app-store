const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});

const keywords = require('./keywords.json');
module.exports = keywords;

console.log('KEYWORDS: ', keywords)

// SETTING UP MYSQL SERVER
const mysql = require('mysql');

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "password",
    insecureAuth : true,
    database: 'open_app_store_database'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL server:', err);
      return;
    }
    
    console.log('Connected to MySQL server');

    
    // Create Database open_app_store_database
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`, (err, result) => {
      if (err) {
        console.error('Error creating database:', err);
      } else {
        console.log('Database created successfully');



        // Create Keywords table
        const createTableQuery = `
            CREATE TABLE keywords (
                id INT AUTO_INCREMENT PRIMARY KEY,
                keywords JSON 
            )
        `;

        // Checks if table exsits: if not create one
        connection.query(`SELECT 1 FROM keywords LIMIT 1`, (err, result) => {
            if (err) {
                // Table does not exist, create it
                connection.query(createTableQuery, (error, results, fields) => {
                    if (error) {
                        console.error('Error creating table:', error);
                    } else {
                        console.log('Table created successfully');
                    }            
                });
            } else {
                console.log('Table already exists');
            }

                // Empty the Keywords table
                const emptyTableQuery = `
                TRUNCATE TABLE keywords
                `;

                connection.query(emptyTableQuery, (error, results, fields) => {
                if (error) {
                    console.error('Error emptying table:', error);
                } else {
                    console.log('Table emptied successfully');
                }

                // Insert values for Keywords table
                const insertDataQuery = `
                    INSERT INTO keywords (keywords)
                    VALUES ('${JSON.stringify(keywords)}')
                `;

                connection.query(insertDataQuery, (error, results, fields) => {
                    if (error) {
                        console.error('Error inserting data:', error);
                    } else {
                        console.log('Data inserted successfully');
                    }
                });
                });
        });
      }
    });
});



app.get('/api/keywords', (req, res) => {
    // Query the database to fetch keywords
    connection.query('SELECT * FROM keywords', (error, results, fields) => {
        if (error) {
            console.error('Error fetching keywords:', error);
            res.status(500).json({ error: 'An error occurred while fetching keywords' });
            return;
        }

        // Send the fetched keywords as JSON response
        console.log(results);
        res.json(results);
    });
});



// Listen for the SIGINT signal (Ctrl+C) and gracefully shut down the server
process.on('SIGINT', () => {
    console.log('Shutting down server');
    
    // Close the database connection
    connection.end((err) => {
        if (err) {
            console.error('Error closing database connection:', err);
        }
        console.log('Database connection closed');
        
        // Exit the process
        process.exit();
    });
});