const express = require('express');
const app = express();
const cors  = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.set('view engine' , 'hbs');
const publicDirectory = path.join('__dirname','./public');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// console.log(__dirname);
app.use(express.static(publicDirectory));




app.use('/', require('./routes/pages'));
app.use('/auth_register', require('./routes/rout_register'));
app.use('/auth_login', require('./routes/rout_login'));


app.listen(process.env.PORT, () => console.log('Login app is running'));