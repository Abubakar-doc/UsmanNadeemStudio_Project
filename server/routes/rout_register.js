const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const util = require('util');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

const router = express.Router();
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});


const query = util.promisify(connection.query).bind(connection);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }

  console.log('Database Register ' + connection.state);
});


router.get('/register', async (req, res) => {
  console.log('Received');
  try {
      return res.redirect('/register_user');
  } catch (error) {
      console.error('Error during redirect:', error);
      return res.status(500).send('Internal Server Error');
  }
});



router.post('/register', async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  try {
    const existingUser = await query('SELECT email FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'That email is already in use! Log in or use another email!' });
    }
    // Check if passwords match
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Passwords do not match!!!!!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Insert the new user into the database
    await query('INSERT INTO users SET ?', { name, email, password: hashedPassword });

    console.log('User successfully registered!');
    return res.status(200).json({ message: 'User successfully registered!' });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/register', async (req, res) => {
  console.log('Received1');

  try {
      const users = await new Promise((resolve, reject) => {
          const query = "SELECT email, name FROM users;";

          connection.query(query, (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results);
          });
      });
console.log(users);
      // Send the user data in JSON format
      return res.status(200).json(users);
  } catch (error) {
      // Send the error message in JSON format
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
});




module.exports = router;
