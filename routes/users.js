const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// router.get('/login', (req, res)=> res.render('login'));
//
// router.get('/register', (req, res)=> res.render('register'));

router.post('/register', urlencodedParser, (req, res) => {
  const { name, email, password, password2 } = req.body;
  console.log(name);
  let errors = [];

    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    // if (password.length < 6) {
    //   errors.push({ msg: 'Password must be at least 6 characters' });
    // }

    if (errors.length > 0) {
      console.log(req.body);
      // res.render('register', {
      //   errors,
      //   name,
      //   email,
      //   password,
      //   password2
      // });
    }else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.send('Email exist');
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                console.log(name);
                // req.flash(
                //   'success_msg',
                //   'You are now registered and can log in'
                // );
                // res.redirect('login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local')(req, res, next);
});
router.get('/logout', (req, res) => {
  req.logout();
  // req.flash('success_msg', 'You are logged out');
  // res.redirect('login');
});

module.exports = router;
