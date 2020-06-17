const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const app = express();
require('./config/passport')(passport);



mongoose
  .connect(
    'mongodb+srv://shubhsaras:shubhsaras@test-bek24.gcp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

app.listen(PORT,  console.log(`Server started on port ${PORT}`));
