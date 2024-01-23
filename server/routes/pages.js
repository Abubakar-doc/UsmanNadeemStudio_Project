// const express = require('express');
// const path = require('path');
// const router = express.Router();

// // Middleware to check if the user is authenticated
// const authenticateUser = (req, res, next) => {
//     if (req.session && req.session.userId) {
//         // User is authenticated
//         next();
//     } else {
//         // User is not authenticated, redirect to login page or handle accordingly
//         res.redirect('/admin'); // Redirect to the admin login page
//     }
// };

// // Middleware to check if the user is an admin
// const checkAdminRole = (req, res, next) => {
//     // Implement your logic to check if the user has admin role
//     // For example, you can have a user role in your database and check if it's 'admin'
//     // In this example, assume there's a variable in the session indicating admin role
//     if (req.session && req.session.isAdmin) {
//         next();
//     } else {
//         res.status(403).send('Access forbidden');
//     }
// };

// router.get('/register', authenticateUser, checkAdminRole, (req, res) => {
//     res.render('register');
// });

// router.get('/admin', (req, res) => {
//     res.render('login');
// });

// // Route to serve the admin panel page (protected by authentication middleware)
// router.get('/adminPanel', authenticateUser, (req, res) => {
//     const adminPanelPath = path.join(__dirname, '../public/admin_panel.html');
//     res.sendFile(adminPanelPath);
// });

// module.exports = router;


const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token; // Assuming the token is stored in a cookie

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
            req.userId = decoded.userId; // Attach the user ID to the request object
            next();
        } catch (error) {
            // Token verification failed
            res.redirect('/admin'); // Redirect to the admin login page
        }
    } else {
        // No token found
        res.redirect('/admin'); // Redirect to the admin login page
    }
};


// Middleware to check if the user is an admin
const checkAdminRole = (req, res, next) => {
    // Implement your logic to check if the user has admin role
    // For example, you can have a user role in your database and check if it's 'admin'
    // In this example, assume there's a variable in the session indicating admin role
    if (req.session && req.session.isAdmin) {
        next();
    } else {
        res.status(403).send('Access forbidden');
    }
};

router.get('/register', authenticateUser, (req, res) => {
    res.render('register');
});


router.get('/register/users', authenticateUser, (req, res) => {
    res.render('registered_users');
});

router.get('/admin', (req, res) => {
    res.render('login');
});

router.get('/adminPanel', authenticateUser, (req, res) => {
    const adminPanelPath = path.join(__dirname, '../public/admin_panel.html');
    res.sendFile(adminPanelPath);
});

// router.get('/register_user', authenticateUser, (req, res) => {
//     const adminPanelPath = path.join(__dirname, '../public/register.html');
//     res.sendFile(adminPanelPath);
// });


module.exports = router;
