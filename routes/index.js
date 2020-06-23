const express = require('express');

const router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// router.get('/', (req, res)=> res.render('welcome'));
router.get('/dashboard', ensureAuthenticated, (req, res)=>{
  res.send({
    user: req.user
  });}
);
module.exports = router;
