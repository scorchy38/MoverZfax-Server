const express = require ('express');
const mongoose = require('mongoose')
const router = express.Router();
const Post = require('../models/post');
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

const app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.post('/post', urlencodedParser, (req, res) => {
  const { id, fullName, currAdd, currDropdownValue, currDropdownValue1, currDropdownValue2, currZip, destDropdownValue, destDropdownValue1, destDropdownValue2, destZip} = req.body;
  console.log(fullName);
  mongoClient.connect('mongodb+srv://shubhsaras:shubhsaras38@moverzfax.2op18.mongodb.net/moverzFax?retryWrites=true&w=majority', { useUnifiedTopology: true },function(err, databases) {
    if (err) {
      throw err;
    }
    var nodetestDB = databases.db("moverzFax"); //here
    var postCollection = nodetestDB.collection("posts");
    const newPost = {
    'id':id,
    'fullName':fullName,
    'currAdd':currAdd,
    'currDropdownValue':currDropdownValue,
    'currDropdownValue1':currDropdownValue1,
    'currDropdownValue2':currDropdownValue2,
    'currZip':currZip,
    'destDropdownValue':destDropdownValue,
    'destDropdownValue1':destDropdownValue1,
    'destDropdownValue2':destDropdownValue2,
    'destZip':destZip
  };
  postCollection.insertOne(newPost, function(error, response) {
      if (error) {
        throw error;
      }


  console.log("1 document inserted");
  res.send('done');
  databases.close();
});
});

});

router.post('/getData', (req, res) => {
  mongoClient.connect('mongodb+srv://shubhsaras:shubhsaras38@moverzfax.2op18.mongodb.net/moverzFax?retryWrites=true&w=majority', { useUnifiedTopology: true },function(error, databases) {
    if (error) {
      throw error;

    }
    var nodtst = databases.db("moverzFax");

    nodtst.collection("posts").findOne({
        id : req.body.id
    }, function(err, result) {

      console.log("one record is found....." + result.fullName);
      res.send(result);
      databases.close();
    });
  });
});


module.exports = router;
