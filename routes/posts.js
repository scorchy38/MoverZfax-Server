const express = require('express');
const router = express.Router();

var mongodb = require('mongodb');

var mongoClient = mongodb.MongoClient;
// var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://shubhsaras:shubhsaras38@moverzfax.2op18.mongodb.net/<dbname>?retryWrites=true&w=majority";
//Basic root route
router.get('/', (req, res) => {
  res.send('We are on posts');
});

//To create a document
router.post('/addSingle', (req, res) => {

  mongoClient.connect(url, { useUnifiedTopology: true },function(err, databases) {
    if (err) {
      throw err;
    }
    var nodetestDB = databases.db("moverzFax"); //here
    var postCollection = nodetestDB.collection("posts");

    var post = {
      userEmail:req.body.userEmail,
    fullName:req.body.fullName,
    currAdd:req.body.currAdd,
    currCountry:req.body.currCountry,
    currState:req.body.currState,
    currCity:req.body.currCity,
    currZip:req.body.currZip,
    destAdd:req.body.destAdd,
    destCountry:req.body.destCountry,
    destState:req.body.destState,
    destCity:req.body.destCity,
    destZip:req.body.destZip
    };


    postCollection.insertOne(post, function(error, response) {
      if (error) {
        throw error;
      }

      console.log("1 document inserted");
      res.send('! document inserted');
      databases.close();
    });
  });

});


//to find multiple documents of a particular userEmail
router.post('/findMultiple', (req, res) => {
  mongoClient.connect(url,{ useUnifiedTopology: true }, function(error, databases) {
    if (error) {
      throw error;

    }

    var nodtst = databases.db("moverzFax");
    nodtst.collection("posts").find({
      userEmail: req.body.userEmail
    }).toArray(function(err, totalposts) {
      if (err) throw err;

      for (i = 0; i < totalposts.length; i++) {
        let post = totalposts[i];
        console.log(post.userEmail);
      }
      res.send(totalposts);
    });
  });
});


module.exports = router;
