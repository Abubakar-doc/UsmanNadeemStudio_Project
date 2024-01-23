const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const util = require('util');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();


// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

// Router
const router = express.Router();
app.use(express.json());

// MySQL Connection
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

    console.log('Database Login ' + connection.state);
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await query('SELECT id, email, password FROM users WHERE email = ?', [email]);

        if (existingUser.length === 0) {
            const message = "Email doesn't exist!";
            return res.render('login', { message });
        }

        const user = existingUser[0];

        // Check if passwords match
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
            // Generate JWT token
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email
                },
                secret,
                { expiresIn: '1w' }
            );

            // Set the token in a cookie (you might need to install the cookie-parser middleware)
            res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            // console.log('Generated Token:', token);

            return res.redirect('/adminPanel');
        } else {
            const message = "Password didn't match!";
            return res.render('login', { message });
        }

    } catch (error) {
        console.error(error);
        const message = "Server error!";
        return res.render('login', { message });
    }
});

router.get('/logout', (req, res) => {
    try {
        // Log cookie data
        console.log('Cookie data before logout:', req.cookies);

        // Clear the token from the cookie
        res.clearCookie('token');

        // Redirect to the login page or perform other actions as needed
        return res.redirect('/login');
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).send('Internal Server Error');
    }
});


/////
//  Meeting link crud
router.post('/meetingLink', async (req, res) => {
    const { meetingLink } = req.body;

    try {
        // Check the number of existing records in the 'meeting' table
        const existingMeetingCount = await query('SELECT COUNT(*) as count FROM meeting');

        if (existingMeetingCount[0].count > 0) {
            // If a record exists, return an error
            return res.status(400).json({ message: 'Meeting link already exists! Use a different link.' });
        }

        // If no record exists, insert the new meeting link into the 'meeting' table
        await query('INSERT INTO meeting (meetingLink) VALUES (?)', [meetingLink]);

        console.log('Meeting link successfully inserted!');
        return res.status(200).json({ message: 'Meeting link successfully inserted!' });
    } catch (error) {
        console.error('Error during meeting link insertion:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});




router.patch('/meetingLink', async (req, res) => {
    const { originalMeetingLink, newMeetingLink } = req.body;

    try {
        // Check if the original meeting link exists
        const existingMeeting = await query('SELECT id FROM meeting WHERE meetingLink = ?', [originalMeetingLink]);

        if (existingMeeting.length > 0) {
            // If the original link exists, update the existing record with the new link
            await query('UPDATE meeting SET meetingLink = ? WHERE id = ?', [newMeetingLink, existingMeeting[0].id]);
            console.log('Meeting link successfully updated!');
            return res.status(200).json({ message: 'Meeting link successfully updated!' });
        } else {
            // If the original link doesn't exist, return an error since PATCH typically updates an existing resource
            return res.status(404).json({ message: 'Original meeting link not found for update!' });
        }
    } catch (error) {
        console.error('Error during meeting link update:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/meetingLink', async (req, res) => {
    try {
        // Fetch the meeting link from the database or any other source
        // For now, let's assume you have a 'meeting' table in your database
        const result = await query('SELECT meetingLink FROM meeting LIMIT 1');

        if (result.length > 0) {
            const meetingLink = result[0].meetingLink;
            return res.status(200).json({ meetingLink });
        } else {
            return res.status(404).json({ message: 'Meeting link not found' });
        }
    } catch (error) {
        console.error('Error during meeting link retrieval:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
